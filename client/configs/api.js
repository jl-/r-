const WEB_SERVER = '//xixi.io';
const API_SERVER = '//api.xixi.io';

const ROOT = API_SERVER;
const SESSIONS = {};
const ACCOUNTS = {};


SESSIONS.ROOT = ROOT + '/sessions';

SESSIONS.LOGIN = WEB_SERVER + '/sessions';


ACCOUNTS.ROOT = ROOT + '/accounts';

ACCOUNTS.SIGNUP = WEB_SERVER + '/accounts';

export {
  ROOT,
  SESSIONS,
  ACCOUNTS
}
