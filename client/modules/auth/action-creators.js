import ACTION_TYPES from './action-types';
import STATUS from './auth-status';
import Api from './api';

function signup (data) {
  return (dispatch, getState) => {
    dispatch({ type: ACTION_TYPES.SIGNUP });
    return Api.signup(data).then(res => {
      console.log(res);
      dispatch({
        type: ACTION_TYPES.SIGNUP_OK,
        payload: red
      });
    }, error => {
      console.log(error);
      dispatch({
        type: ACTION_TYPES.SIGNUP_OK,
        payload: error
      });
    });
  };
}
function login(account) {
  return dispatch => {
    dispatch({ type: ACTION_TYPES.LOGIN });
    return Api.login(account).then(res => {
      console.log(res);
      dispatch({
        type: ACTION_TYPES.LOGIN_OK,
        payload: res
      });
    }, error => {
      console.log(error);
      dispatch({
        type: ACTION_TYPES.LOGIN_OK,
        payload: error
      });
    });
  }
}

function logout(err) {
  return dispatch => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
    return Api.logout().then(res => {
    }, error => {
      console.log(error);
      dispatch({
        type: ACTION_TYPES.LOGOUT_OK
      })
    });
  }
}


export default {
  signup,
  login,
  logout
}
