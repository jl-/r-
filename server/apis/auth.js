import axios from 'axios';
import { ACCOUNTS, SESSIONS } from '../configs/api';

export function login(account) {
  return axios.post(SESSIONS.ROOT, account);
}

export function signup(data) {
  return axios.post(ACCOUNTS.ROOT, data);
}

