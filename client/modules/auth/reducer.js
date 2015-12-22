import ACTION_TYPES from './action-types';
import STATUS from './auth-status';

const initSession = {
  status: STATUS.VOID,
  token: null
};

export default function auth(state = initSession, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_OK:
      console.log('login ok !!!');
      return {
        status: STATUS.AUTHED
      };
    case ACTION_TYPES.LOGOUT_OK:
      console.log('logout ok!!!');
      return {
        status: STATUS.LOGOUT_OK
      };
    default:
      return state;
  }
}

