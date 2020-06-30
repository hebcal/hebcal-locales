/* eslint-disable camelcase */
import {Locale} from '@hebcal/core';
import po_fi from './fi.po.json';
import po_fr from './fr.po.json';
import po_hu from './hu.po.json';
import po_pl from './pl.po.json';
import po_ru from './ru.po.json';
import po_ashkenazi_litvish from './ashkenazi_litvish.po.json';
import po_ashkenazi_poylish from './ashkenazi_poylish.po.json';
import po_ashkenazi_standard from './ashkenazi_standard.po.json';

Locale.addLocale('fi', po_fi);
Locale.addLocale('fr', po_fr);
Locale.addLocale('hu', po_hu);
Locale.addLocale('pl', po_pl);
Locale.addLocale('ru', po_ru);
Locale.addLocale('ashkenazi_litvish', po_ashkenazi_litvish);
Locale.addLocale('ashkenazi_poylish', po_ashkenazi_poylish);
Locale.addLocale('ashkenazi_standard', po_ashkenazi_standard);
