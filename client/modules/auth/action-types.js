import { uid, ktv } from '../../../utils';

const AUTH = [
  'SIGNUP',
  'SIGNUP_OK',
  'SIGNUP_FAILED',

  'LOGIN',
  'LOGIN_OK',
  'LOGIN_FAILED',

  'LOGOUT',
  'LOGOUT_OK',
  'LOGOUT_FAILED',

  'SESSION_EXPIRED'
];
export default ktv(AUTH, uid);
