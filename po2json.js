import fs from 'node:fs';
import path from 'node:path';
import {po} from 'gettext-parser';

const folderName = './src';

// Locales that @hebcal/hdate (and @hebcal/core) already register.
// For these we merge our strings into the existing dictionary with
// Locale.addTranslations() instead of replacing it with Locale.addLocale().
const builtinLocales = new Set(['en', 'he', 'ashkenazi']);

// `he-x-NoNikud` is not a standalone locale: it is derived from `he` by
// stripping nikud, and `po/he-x-NoNikud.po` is then applied on top as an
// override for words that would be ambiguous without vowel marks.
const noNikudOverride = 'he-x-NoNikud';

if (!fs.existsSync(folderName)) {
  fs.mkdirSync(folderName);
}

const args = process.argv.slice(2);
const hasNoNikudOverride = args.some(
    (arg) => localeName(path.basename(arg)) === noNikudOverride);
const locales = [];
for (const arg of args) {
  const bn = path.basename(arg);
  const outpath = path.join(folderName, bn + '.js');
  console.log(`${arg} => ${outpath}`);
  writePoFile(arg, outpath);
  const locale = localeName(bn);
  if (locale === noNikudOverride) {
    continue; // imported by he.js
  }
  const outpath2 = path.join(folderName, locale + '.js');
  writeImportFile(locale, outpath2);
  locales.push(locale);
}

writeIndexJs(folderName, locales);

function localeName(basename) {
  return basename.substring(0, basename.indexOf('.'));
}

function assertHeader(name, value) {
  if (!value) {
    throw new Error(`Bad .po file. "${name}" header is missing`);
  }
}

function writePoFile(inpath, outpath) {
  const input = fs.readFileSync(inpath).toString().normalize();
  const poData = po.parse(input);
  const pluralHeader =
    poData.headers['plural-forms'] || poData.headers['Plural-Forms'];
  const language = poData.headers.language || poData.headers.Language;
  assertHeader('Plural-Forms', pluralHeader);
  assertHeader('Language', language);
  const dict = {};
  for (const msg of Object.values(poData.translations[''])) {
    const msgid = msg.msgid;
    const msgstr = msg.msgstr;
    if (msgid?.length && msgstr?.length) {
      dict[msgid] = msgstr;
    }
  }
  const compactPo = {
    headers: {
      'plural-forms': pluralHeader,
      'language': language,
    },
    contexts: {'': dict},
  };
  const outstream = fs.createWriteStream(outpath, {flags: 'w'});
  outstream.write('export default ');
  outstream.write(JSON.stringify(compactPo, null, 0));
  outstream.end();
}

function writeImportFile(locale, outpath) {
  const outstream = fs.createWriteStream(outpath, {flags: 'w'});
  const fn = builtinLocales.has(locale) ? 'addTranslations' : 'addLocale';
  outstream.write(`import {Locale} from '@hebcal/hdate';
import poData from './${locale}.po.js';
`);
  if (locale === 'he' && hasNoNikudOverride) {
    outstream.write(`import noNikudOverride from './${noNikudOverride}.po.js';
`);
  }
  outstream.write(`
Locale.${fn}('${locale}', poData);
`);
  if (locale === 'he') {
    outstream.write(`
const poHeNoNikud = Locale.copyLocaleNoNikud(poData);
Locale.addTranslations('he-x-NoNikud', poHeNoNikud);
`);
    if (hasNoNikudOverride) {
      outstream.write(`Locale.addTranslations('he-x-NoNikud', noNikudOverride);
`);
    }
  }
  outstream.end();
}

function writeIndexJs(folderName, locales) {
  const outpath = path.join(folderName, 'index.js');
  const outstream = fs.createWriteStream(outpath, {flags: 'w'});
  for (const locale of locales) {
    outstream.write(`import './${locale}.js';\n`);
  }
  outstream.end();
}
