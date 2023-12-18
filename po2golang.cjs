/* eslint-disable require-jsdoc */
const fs = require('fs');
const path = require('path');
const parser = require('ttag-cli/dist/src/lib/parser');
const utils = require('ttag-cli/dist/src/lib/utils');

const langs = new Set();
const parsedPoData = new Map();
for (const arg of process.argv.slice(2)) {
  const contents = fs.readFileSync(arg);
  const poData = parser.parse(
      contents.toString().normalize(),
  );
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

function writePoFile(poDatas, outpath, langName) {
  const outstream = fs.createWriteStream(outpath, {flags: 'w'});
  outstream.write('package locales\n\n');
  outstream.write(`var dict_${langName} = map[string]string{\n`);
  for (const poData of poDatas) {
    const messages = utils.iterateTranslations(poData.translations);
    for (const msg of messages) {
      const msgid = msg.msgid;
      const msgstr = msg.msgstr;
      if (typeof msgid === 'string' && msgid.length &&
        Array.isArray(msgstr) && typeof msgstr[0] === 'string' && msgstr[0].length) {
        const src = msgid.replace(/\"/g, '\\"');
        const dest = msgstr[0].replace(/\"/g, '\\"');
        if (dest !== '') {
          outstream.write(`\t"${src}": "${dest}",\n`);
        }
      }
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
