import session from 'express-session';
import connectRedis from 'connect-redis';
import redisClient from '../modules/redis';
import { SESSION } from '../configs/common';

const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION.SECRET,
  resave: false,
  saveUninitialized: false
});
