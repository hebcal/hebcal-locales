import {Locale} from '@hebcal/hdate';
import poHe from './he.po.js';

Locale.addTranslations('he', poHe);
Locale.addTranslations('h', poHe);

const poHeNoNikud = Locale.copyLocaleNoNikud(poHe);
Locale.addTranslations('he-x-NoNikud', poHeNoNikud);
