let domain = '//api.xixi.io';

const API = {};

const SESSION = API.SESSION = {};
const ACCOUONT = API.ACCOUNT = {};

API.ROOT = domain;

SESSION.ROOT = API.ROOT + '/sessions';

export {
  API
}
