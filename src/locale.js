/* eslint-disable camelcase */
import po_fi from './fi.po.json';
import po_fr from './fr.po.json';
import po_hu from './hu.po.json';
import po_pl from './pl.po.json';
import po_ru from './ru.po.json';
import po_ashkenazi_litvish from './ashkenazi_litvish.po.json';
import po_ashkenazi_poylish from './ashkenazi_poylish.po.json';
import po_ashkenazi_standard from './ashkenazi_standard.po.json';

export const emptyPoData = {
  headers: {'plural-forms': 'nplurals=2; plural=(n!=1);'},
  contexts: {'': {}},
};

/**
 * Hack for bundling instead of dynamic require
 * @param {string} locale
 * @return {Object}
 */
export function getTranslationObj(locale) {
  switch (locale) {
    case 'fi': return po_fi;
    case 'fr': return po_fr;
    // case 'he': return po_he;
    case 'hu': return po_hu;
    case 'pl': return po_pl;
    case 'ru': return po_ru;
    // case 'ashkenazi': return po_ashkenazi;
    case 'ashkenazi_litvish': return po_ashkenazi_litvish;
    case 'ashkenazi_poylish': return po_ashkenazi_poylish;
    case 'ashkenazi_standard': return po_ashkenazi_standard;
    default:
      return emptyPoData;
  }
}
