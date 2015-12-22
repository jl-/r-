import axios from 'axios';
import { SESSIONS, ACCOUNTS } from '../../configs/api';

export function signup(data) {
  return axios.post(ACCOUNTS.SIGNUP, data);
}
export function login(account) {
  return axios.post(SESSIONS.LOGIN, account);
}
export function logout(account) {
  return axios.delete(SESSIONS.LOGOUT);
}

export default {
  signup,
  login,
  logout
};

