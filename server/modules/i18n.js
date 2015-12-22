import i18n from '../../i18n';
import resolveVal from '../../utils/resolve-val';
function __(field) {
  return LANG && resolveVal(LANG, field) || field;
}
function resolve(req) {
  const LANG = req.query.lang;
  global.LANG = i18n[LANG];
}

