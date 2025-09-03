# @hebcal/locales
Translations for Hebcal events in multiple languages

Adds support for the following locales:

* `ashkenazi_litvish` - courtesy Andrey Rozenberg
* `ashkenazi_poylish` - courtesy Andrey Rozenberg
* `ashkenazi_standard` - courtesy Andrey Rozenberg
* `ashkenazi_romanian` - courtesy Florin-Ciprian Bodin
* `de` - courtesy Dr Oliver Maor
* `es` - courtesy Iosef Kebesh and Sebastian Thierer
* `fi` - courtesy Petteri Hjort
* `fr` - courtesy Marc Neiger
* `hu` - courtesy Oleh Korchytskyi
* `pl` - courtesy Filip Bialek
* `pt` - courtesy Zushe Ledovitch
* `ru` - courtesy David Leibovych
* `ro` - courtesy Florin-Ciprian Bodin
* `uk` - courtesy Lyubov Kuzmyn

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
};
const events = HebrewCalendar.calendar(options);
console.log(events[0].render('ru'));
```
