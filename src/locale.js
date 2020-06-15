/* eslint-disable camelcase */
import {hebcal} from '@hebcal/core';
import po_fi from './fi.po.json';
import po_fr from './fr.po.json';
import po_hu from './hu.po.json';
import po_pl from './pl.po.json';
import po_ru from './ru.po.json';
import po_ashkenazi_litvish from './ashkenazi_litvish.po.json';
import po_ashkenazi_poylish from './ashkenazi_poylish.po.json';
import po_ashkenazi_standard from './ashkenazi_standard.po.json';

hebcal.registerLocale('fi', po_fi);
hebcal.registerLocale('fr', po_fr);
hebcal.registerLocale('hu', po_hu);
hebcal.registerLocale('pl', po_pl);
hebcal.registerLocale('ru', po_ru);
hebcal.registerLocale('ashkenazi_litvish', po_ashkenazi_litvish);
hebcal.registerLocale('ashkenazi_poylish', po_ashkenazi_poylish);
hebcal.registerLocale('ashkenazi_standard', po_ashkenazi_standard);
