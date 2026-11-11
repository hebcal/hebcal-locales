import {test} from 'node:test';
import assert from 'node:assert';
import {Locale} from '@hebcal/hdate';
import '../src/index.js';

test('locale-ru', () => {
  assert.strictEqual(Locale.gettext('Shabbat HaGadol', 'ru'), 'Большой Шаббат');
});

test('es', () => {
  assert.strictEqual(Locale.gettext('Pesach I', 'es'), 'Pésaj I');
});

test('ro', () => {
  assert.strictEqual(Locale.gettext('Pesach I', 'ro'), 'Pesaĥ I');
});

test('ashkenazi_litvish', () => {
  assert.strictEqual(Locale.gettext('Rosh Hashana', 'ashkenazi_litvish'), 'Reish Hashono');
});

test('ashkenazi_romanian', () => {
  assert.strictEqual(Locale.gettext('Pesach I', 'ashkenazi_romanian'), 'Peisaĥ I');
});

test('uk', () => {
  assert.strictEqual(Locale.gettext('Yom Kippur', 'uk'), 'День Розкаяння');
});

test('pt', () => {
  assert.strictEqual(Locale.gettext('Fast ends', 'pt'), 'O jejum termina');
});

test('nl', () => {
  assert.strictEqual(Locale.gettext('Shabbat', 'nl'), 'Sjabbat');
  assert.strictEqual(Locale.gettext('Yom Kippur', 'nl'), 'Jom Kipoer');
  assert.strictEqual(Locale.gettext('Pesach I', 'nl'), 'Pesach I');
  assert.strictEqual(Locale.gettext('Chanukah', 'nl'), 'Chanoeka');
  assert.strictEqual(Locale.gettext('Sukkot', 'nl'), 'Soekot');
  assert.strictEqual(Locale.gettext('Candle lighting', 'nl'), 'Kaarsen aansteken');
  assert.strictEqual(Locale.gettext('Fast begins', 'nl'), 'Vasten begint');
  assert.strictEqual(Locale.gettext('Rosh Hashana', 'nl'), 'Rosj Hasjana');
  assert.strictEqual(Locale.gettext('Shavuot', 'nl'), 'Sjavoeot');
  assert.strictEqual(Locale.gettext('Purim', 'nl'), 'Poeriem');
});

test('yi', () => {
  assert.strictEqual(Locale.gettext('Shabbat', 'yi'), 'שבת');
  assert.strictEqual(Locale.gettext('Yom Kippur', 'yi'), 'יום כיפור');
  assert.strictEqual(Locale.gettext('Pesach I', 'yi'),  "פּייסעך א׳");
  assert.strictEqual(Locale.gettext('Chanukah', 'yi'), 'חנוכה');
  assert.strictEqual(Locale.gettext('Sukkot', 'yi'), 'סוכות');
  assert.strictEqual(Locale.gettext('Candle lighting', 'yi'), 'ליכט צינדן');
  assert.strictEqual(Locale.gettext('Fast begins', 'yi'), 'תענית הויבט זיך אן');
  assert.strictEqual(Locale.gettext('Rosh Hashana', 'yi'), 'ראש השנה');
  assert.strictEqual(Locale.gettext('Shavuot', 'yi'), 'שבועות');
  assert.strictEqual(Locale.gettext('Purim', 'yi'), 'פורים');
});

test('ashkenazi', () => {
  assert.strictEqual(Locale.lookupTranslation('Tevet', 'ashkenazi'), 'Teves');
});

test('Hebrew', () => {
  assert.strictEqual(Locale.lookupTranslation('Elul', 'he'), 'אֱלוּל');
  assert.strictEqual(Locale.lookupTranslation('Elul', 'he-x-NoNikud'), 'אלול');
  assert.strictEqual(Locale.lookupTranslation('Israel', 'he'), 'יִשְׂרָאֵל');
  assert.strictEqual(Locale.lookupTranslation('Israel', 'he-x-NoNikud'), 'ישראל');
});

test('getLocaleNames', () => {
  const names = Locale.getLocaleNames();
  assert.ok(names.includes('es'));
  assert.ok(names.includes('nl'));
  assert.ok(names.includes('ro'));
  assert.ok(names.includes('uk'));
  assert.ok(names.includes('fi'));
  assert.ok(names.includes('ashkenazi_poylish'));
  assert.ok(names.includes('he'));
  assert.ok(names.includes('he-x-nonikud'));
  assert.ok(names.includes('yi'));
});

test('hebcal-web strings merged into existing locales', () => {
  assert.strictEqual(Locale.gettext('Shabbat Times for', 'es'), 'Horarios de Shabat para');
  assert.strictEqual(Locale.gettext('occurs on', 'fr'), 'a lieu le');
  assert.strictEqual(Locale.gettext('on', 'nl'), 'op');
  assert.strictEqual(Locale.gettext('This week’s Torah portion is', 'pt'), 'A porção da Torá desta semana é');
  // existing translations are untouched
  assert.strictEqual(Locale.gettext('Pesach I', 'es'), 'Pésaj I');
});

test('en adds to the built-in locale', () => {
  assert.strictEqual(Locale.gettext('TITLE:chatzotNight', 'en'), 'Chatzot HaLailah');
  assert.strictEqual(Locale.gettext('MEMO:alotHaShachar', 'en'), 'Sun is 16.1° below the horizon in the morning');
});

test('ashkenazi adds to the built-in locale', () => {
  assert.strictEqual(Locale.gettext('Shabbat Times for', 'ashkenazi'), 'Shabbos Times for');
  // built-in translations from @hebcal/hdate are preserved
  assert.strictEqual(Locale.gettext('Tevet', 'ashkenazi'), 'Teves');
});

test('he and he-x-NoNikud', () => {
  assert.strictEqual(Locale.gettext('Shabbat Times for', 'he'), 'זְמַנֵּי שַׁבָּת');
  assert.strictEqual(Locale.gettext('Shabbat Times for', 'he-x-NoNikud'), 'זמני שבת');
  // he-x-NoNikud.po override wins over the nikud-stripped he.po
  assert.strictEqual(Locale.gettext('Latest Kiddush Levana (15 days)', 'he-x-NoNikud'), 'סוף זמן קידוש לבנה (15 ימים)');
  // built-in translations from @hebcal/hdate are preserved
  assert.strictEqual(Locale.gettext('Elul', 'he'), 'אֱלוּל');
});

test('parsha-summary-memo', () => {
  assert.ok(Locale.lookupTranslation('MEMO:Bereshit', 'en').startsWith('Bereshit (“In the Beginning”) is the first parashah'));
  assert.ok(Locale.lookupTranslation('MEMO:Bereshit', 'he').startsWith('פרשת בראשית, הפרשה הראשונה בתורה'));
  assert.ok(Locale.lookupTranslation('MEMO:Bereshit', 'he-x-NoNikud').startsWith('פרשת בראשית'));
  assert.ok(Locale.lookupTranslation("MEMO:Beha'alotcha", 'en').length > 100);
  assert.strictEqual(Locale.lookupTranslation('MEMO:Vayakhel-Pekudei', 'en'), undefined);
});
