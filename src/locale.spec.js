import test from 'ava';
import {HebrewCalendar, Location} from '@hebcal/core';
import './locale';

test('locale-ru', (t) => {
  const options = {year: 2020, month: 4, locale: 'ru'};
  const ev = HebrewCalendar.calendar(options)[0];
  t.is(ev.render(), 'Большой Шаббат');
});

test('locale-ru-ordinal', (t) => {
  // test numeraljs ordinal
  const options = {year: 2020, noHolidays: true, omer: true, locale: 'ru'};
  const ev = HebrewCalendar.calendar(options)[0];
  t.is(ev.render(), '1. day of the Omer');
});

test('locale-es', (t) => {
  const options = {year: 2020, month: 4, locale: 'es'};
  const events = HebrewCalendar.calendar(options);
  const ev = events.find((ev) => ev.getDesc() === 'Pesach I');
  t.is(ev.render(), 'Pésaj I');
});

test('addHebrewDates-locale', (t) => {
  const options = {
    year: 2017,
    month: 3,
    noHolidays: true,
    addHebrewDates: true,
    locale: 'fr',
  };
  const evFR = HebrewCalendar.calendar(options)[0];
  t.is(evFR.getDesc(), '3 Adar 5777');
  t.is(evFR.render(), '3. Adar, 5777');
  options.locale = 'ru';
  const evRU = HebrewCalendar.calendar(options)[0];
  t.is(evRU.getDesc(), '3 Adar 5777');
  t.is(evRU.render(), '3. Адар, 5777');
  options.locale = 'es';
  const evES = HebrewCalendar.calendar(options)[0];
  t.is(evES.getDesc(), '3 Adar 5777');
  t.is(evES.render(), '3º Adar, 5777');
  options.locale = 'de';
  const evDE = HebrewCalendar.calendar(options)[0];
  t.is(evDE.render(), '3. Adar, 5777');
});

test('havdalah', (t) => {
  const dt = new Date(2020, 10, 7);
  const havdalah = HebrewCalendar.calendar({
    start: dt,
    end: dt,
    location: Location.lookup('Budapest'),
    candlelighting: true,
    havdalahMins: 42,
  })[0];
  t.is(havdalah.getDesc(), 'Havdalah');
  t.is(havdalah.render('en'), 'Havdalah (42 min): 16:59');
  t.is(havdalah.render('fi'), 'Havdala (42 minuuttia): 16:59');
  t.is(havdalah.render('fr'), 'Havdalah (42 minutes): 16:59');
  t.is(havdalah.render('hu'), 'Hávdálá (42 perc): 16:59');
  t.is(havdalah.render('he'), 'הַבדָלָה (42 דקות): 16:59');
  t.is(havdalah.render('pl'), 'Hawdala (42 minut): 16:59');
  t.is(havdalah.render('ru'), 'Авдала (42 мин.): 16:59');
  t.is(havdalah.render('de'), 'Hawdalah (42 Min): 16:59');
});

test('locale-de', (t) => {
  const options = {year: 2020, month: 4, locale: 'de'};
  const events = HebrewCalendar.calendar(options);
  const ev = events.find((ev) => ev.getDesc() === 'Pesach I');
  t.is(ev.render(), 'Pessach I');
});

test('ro', (t) => {
  const options = {year: 2020, month: 4, locale: 'ro'};
  const events = HebrewCalendar.calendar(options);
  const ev = events.find((ev) => ev.getDesc() === 'Pesach I');
  t.is(ev.render(), 'Pesaĥ I');
});

test('ashkenazi_romanian', (t) => {
  const options = {year: 2020, month: 4, locale: 'ashkenazi_romanian'};
  const events = HebrewCalendar.calendar(options);
  const ev = events.find((ev) => ev.getDesc() === 'Pesach I');
  t.is(ev.render(), 'Peisaĥ I');
});
