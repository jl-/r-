import path from 'path';

// app
export const APP = {
  NAME: 'xixi',
  SESSION_SECRET: 'xixi'
};

// server
export const SERVER = {
  PORT: 9876
};

export const SESSION = {
  SECRET: 'xixi'
};

export const REDIS = {
  host: 'redis',
  port: '6379'
};

// paths
const LOG_DIR = path.resolve(__dirname, '../logs');
export const PATHS = {
  LOG_DIR,
  ERR_LOG: path.resolve(LOG_DIR, 'error.log'),
  INFO_LOG: path.resolve(LOG_DIR, 'info.log')
};

