# @hebcal/locales
Translations for Hebcal events in multiple languages

Adds support for the following locales:

* `ashkenazi_litvish`
* `ashkenazi_poylish`
* `ashkenazi_standard`
* `de`
* `es`
* `fi`
* `fr`
* `hu`
* `pl`
* `ru`

Note that `@hebcal/core` has built-in support for `he` and `ashkenazi` locales.
This package is needed only if you need other locales.

## Installation
```bash
$ npm install @hebcal/locales
```

## Synopsis
```javascript
import {HebrewCalendar} from '@hebcal/core';
import '@hebcal/locales';

const options = {
  year: 2020,
  sedrot: true,
  locale: 'ru',
};
const events = HebrewCalendar.calendar(options);
console.log(events[0].render());
```
