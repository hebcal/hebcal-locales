import test from 'ava';
import {Locale} from '@hebcal/hdate';
import '../src/index.js';

test('nl-shabbat', (t) => {
  t.is(Locale.gettext('Shabbat', 'nl'), 'Sjabbat');
});

test('nl-holidays', (t) => {
  t.is(Locale.gettext('Rosh Hashana', 'nl'), 'Rosj Hasjana');
  t.is(Locale.gettext('Yom Kippur', 'nl'), 'Jom Kippoer');
  t.is(Locale.gettext('Chanukah', 'nl'), 'Chanoeka');
  t.is(Locale.gettext('Sukkot', 'nl'), 'Soekot');
  t.is(Locale.gettext('Pesach', 'nl'), 'Pesach');
});

test('nl-fasts', (t) => {
  t.is(Locale.gettext('Fast begins', 'nl'), 'Begin vasten');
  t.is(Locale.gettext('Fast ends', 'nl'), 'Einde vasten');
});

test('nl-dafyomi', (t) => {
  t.is(Locale.gettext('Berachot', 'nl'), 'Berachot');
  t.is(Locale.gettext('Pesachim', 'nl'), 'Pesachiem');
  t.is(Locale.gettext('Eruvin', 'nl'), 'Eroewien');
  t.is(Locale.gettext('Beitzah', 'nl'), 'Beitsa');
  t.is(Locale.gettext('Chagigah', 'nl'), 'Chagiega');
});

test('nl-months', (t) => {
  t.is(Locale.gettext('Nisan', 'nl'), 'Nisan');
  t.is(Locale.gettext('Av', 'nl'), 'Aw');
  t.is(Locale.gettext('Tamuz', 'nl'), 'Tammoez');
});
