import test from 'ava';
import {Locale} from '@hebcal/hdate';
import '../src/index.js';

test('locale-ru', (t) => {
  t.is(Locale.gettext('Shabbat HaGadol', 'ru'), 'Большой Шаббат');
});

test('es', (t) => {
  t.is(Locale.gettext('Pesach I', 'es'), 'Pésaj I');
});

test('ro', (t) => {
  t.is(Locale.gettext('Pesach I', 'ro'), 'Pesaĥ I');
});

test('ashkenazi_romanian', (t) => {
  t.is(Locale.gettext('Pesach I', 'ashkenazi_romanian'), 'Peisaĥ I');
});

test('uk', (t) => {
  t.is(Locale.gettext('Yom Kippur', 'uk'), 'День Розкаяння');
});

test('pt', (t) => {
  t.is(Locale.gettext('Fast ends', 'pt'), 'O jejum termina');
});

test('nl', (t) => {
  t.is(Locale.gettext('Shabbat', 'nl'), 'Sjabbat');
  t.is(Locale.gettext('Yom Kippur', 'nl'), 'Jom Kippoer');
  t.is(Locale.gettext('Pesach I', 'nl'), 'Pesach I');
  t.is(Locale.gettext('Chanukah', 'nl'), 'Chanoeka');
  t.is(Locale.gettext('Sukkot', 'nl'), 'Soekot');
  t.is(Locale.gettext('Candle lighting', 'nl'), 'Kaarsen aansteken');
  t.is(Locale.gettext('Fast begins', 'nl'), 'Vasten begint');
  t.is(Locale.gettext('Rosh Hashana', 'nl'), 'Rosj Hasjana');
  t.is(Locale.gettext('Shavuot', 'nl'), 'Sjawoeot');
  t.is(Locale.gettext('Purim', 'nl'), 'Poeriem');
});

test('ashkenazi', (t) => {
  t.is(Locale.lookupTranslation('Tevet', 'ashkenazi'), 'Teves');
});

test('Hebrew', (t) => {
  t.is(Locale.lookupTranslation('Elul', 'he'), 'אֱלוּל');
  t.is(Locale.lookupTranslation('Elul', 'he-x-NoNikud'), 'אלול');
  t.is(Locale.lookupTranslation('Shabbat times for', 'he'), 'זמני שַׁבָּת');
  t.is(Locale.lookupTranslation('Shabbat times for', 'he-x-NoNikud'), 'זמני שבת');
});

test('getLocaleNames', (t) => {
  const names = Locale.getLocaleNames();
  t.true(names.includes('es'));
  t.true(names.includes('nl'));
  t.true(names.includes('ro'));
  t.true(names.includes('uk'));
  t.true(names.includes('fi'));
  t.true(names.includes('ashkenazi_poylish'));
  t.true(names.includes('he'));
  t.true(names.includes('he-x-nonikud'));
});
