import _validator from 'validator';
const validator = _validator;

const USERNAME_REG = /^[A-Za-z][\w-]{1,31}$/;
const PASSWORD_REG = /^[\w-@*#]{6,32}$/;
const PHONE_LOCALES = ['zh-CN', 'zh-TW', 'en-ZA', 'en-AU', 'en-HK', 'pt-PT', 'fr-FR', 'el-GR', 'en-GB', 'en-US', 'en-ZM', 'ru-RU', 'nb-NO', 'nn-NO'];

function isUsername(str) {
  return USERNAME_REG.test(str);
}
function isAccount(str) {
  if (isEmail(str)) return true;
  if (USERNAME_REG.test(str)) return true;
  return PHONE_LOCALES.some(locale => isMobilePhone(str, locale));
}
function isPassword(str) {
  return PASSWORD_REG.test(str);
}

validator.isUsername = isUsername;
validator.isAccount = isAccount;
validator.isPassword = isPassword;

export default validator;
