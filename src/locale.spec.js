import test from 'ava';
import {HebrewCalendar} from '@hebcal/core';
import './locale';

test('locale-ru', (t) => {
  const options = {year: 2020, month: 4, locale: 'ru'};
  const ev = new HebrewCalendar(options).events()[0];
  t.is(ev.render(), 'Большой Шаббат');
});

test('locale-ru-ordinal', (t) => {
  // test numeraljs ordinal
  const options = {year: 2020, noHolidays: true, omer: true, locale: 'ru'};
  const ev = new HebrewCalendar(options).events()[0];
  t.is(ev.render(), '1. day of the Omer');
});

test('addHebrewDates-locale', (t) => {
  const options = {
    year: 2017,
    month: 3,
    noHolidays: true,
    addHebrewDates: true,
    locale: 'fr',
  };
  const evFR = new HebrewCalendar(options).events()[0];
  t.is(evFR.getDesc(), '3 Adar 5777');
  t.is(evFR.render(), '3ème Adar, 5777');
  options.locale = 'ru';
  const evRU = new HebrewCalendar(options).events()[0];
  t.is(evRU.getDesc(), '3 Adar 5777');
  t.is(evRU.render(), '3. Адар, 5777');
});
