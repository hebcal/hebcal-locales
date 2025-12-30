import fs from 'node:fs';
import path from 'node:path';
import {po} from 'gettext-parser';

const folderName = './src';
const locales = [];
for (const arg of process.argv.slice(2)) {
  const bn = path.basename(arg);
  const outpath = path.join(folderName, bn + '.js');
  console.log(`${arg} => ${outpath}`);
  writePoFile(arg, outpath);
  const locale = bn.substring(0, bn.indexOf('.'));
  const outpath2 = path.join(folderName, bn.substring(0, bn.indexOf('.')) + '.js');
  writeImportFile(locale, outpath2);
  locales.push(locale);
}

writeIndexJs(folderName, locales);

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
  const fn = locale === 'he' ? 'addTranslations' : 'addLocale';
  outstream.write(`import {Locale} from '@hebcal/hdate';
import poData from './${locale}.po.js';
Locale.${fn}('${locale}', poData);
`);
  if (locale === 'he') {
    outstream.write(`
const poHeNoNikud = Locale.copyLocaleNoNikud(poData);
Locale.addTranslations('he-x-NoNikud', poHeNoNikud);
`);
  }
  outstream.end();
}

function writeIndexJs(folderName, locales) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
  const outpath = path.join(folderName, 'index.js');
  const outstream = fs.createWriteStream(outpath, {flags: 'w'});
  for (const locale of locales) {
    outstream.write(`import './${locale}.js';\n`);
  }
  outstream.end();
}
