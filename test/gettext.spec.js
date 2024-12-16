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

test('getLocaleNames', (t) => {
  const names = Locale.getLocaleNames();
  t.true(names.includes('es'));
  t.true(names.includes('ro'));
  t.true(names.includes('uk'));
  t.true(names.includes('fi'));
  t.true(names.includes('ashkenazi_poylish'));
});
