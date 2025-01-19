/* eslint-disable require-jsdoc */
import fs from 'fs';
import path from 'path';
import {po} from 'gettext-parser';

const langs = new Set();
const parsedPoData = new Map();
for (const arg of process.argv.slice(2)) {
  const contents = fs.readFileSync(arg);
  const input = contents.toString().normalize();
  const poData = po.parse(input);
  const langName = getLangFromBase(arg);
  const arr = parsedPoData.get(langName);
  if (arr) {
    arr.push(poData);
  } else {
    parsedPoData.set(langName, [poData]);
  }
  langs.add(langName);
}

for (const langName of langs.values()) {
  const outpath = `./go/strings_${langName}.go`;
  console.log(`${langName} => ${outpath}`);
  writePoFile(parsedPoData.get(langName), outpath, langName);
  langs.add(langName);
}

const outstream = fs.createWriteStream('./go/locales.go', {flags: 'w'});
outstream.write(`package locales

import "strings"

// AllLocales is an array of all supported locale names.
var AllLocales = []string{
\t"en",
\t"he-x-NoNikud",
`);
for (const langName of langs.values()) {
  outstream.write(`\t"${langName}",\n`);
}
outstream.write(`}

// LookupTranslation returns a message for the given key.
// It returns false for ok if such a message could not be found.
func LookupTranslation(key string, locale string) (string, bool) {
\tlang := strings.ToLower(locale)
\tswitch lang {
\tcase "", "en", "sephardic":
\t\treturn key, true
\tcase "he-x-nonikud":
\t\tv, ok := Lookup_he(key)
\t\tif ok {
\t\t\treturn HebrewStripNikkud(v), true
\t\t}
\t\treturn v, ok
`);
for (const langName of langs.values()) {
  outstream.write(`\tcase "${langName}":\n`);
  outstream.write(`\t\treturn Lookup_${langName}(key)\n`);
}

outstream.write(`\t}\n\treturn key, false\n}\n`);
outstream.end();

function getLangFromBase(arg) {
  return path.basename(arg).replace(/\.po$/, '').replace(/\./g, '_');
}

function assertHeader(name, value) {
  if (!value) {
    throw new Error(`Bad .po file. "${name}" header is missing`);
  }
}

function writePoFile(poDatas, outpath, langName) {
  const dict = new Map();
  for (const poData of poDatas) {
    const pluralHeader =
      poData.headers['plural-forms'] || poData.headers['Plural-Forms'];
    const language = poData.headers.language || poData.headers.Language;
    assertHeader('Plural-Forms', pluralHeader);
    assertHeader('Language', language);
    for (const msg of Object.values(poData.translations[''])) {
      const msgid = msg.msgid;
      const msgstr = msg.msgstr;
      if (typeof msgid === 'string' && msgid.length &&
        Array.isArray(msgstr) && typeof msgstr[0] === 'string' && msgstr[0].length) {
        const src = msgid.replace(/\"/g, '\\"');
        const dest = msgstr[0].replace(/\"/g, '\\"');
        if (dest !== '') {
          dict.set(src, dest);
        }
      }
    }
  }
  const outstream = fs.createWriteStream(outpath, {flags: 'w'});
  outstream.write('package locales\n\n');
  outstream.write(`var dict_${langName} = map[string]string{\n`);
  const keys = Array.from(dict.keys()).sort();
  for (const src of keys) {
    const dest = dict.get(src);
    if (src !== dest) {
      outstream.write(`\t"${src}": "${dest}",\n`);
    }
  }
  outstream.write(`}\n`);
  outstream.write(`
func Lookup_${langName}(s string) (string, bool) {
\tv, ok := dict_${langName}[s]
\tif ok {
\t\treturn v, true
\t}
\treturn s, false
}
`);
  outstream.end();
}
