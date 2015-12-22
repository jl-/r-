import redis from 'redis';
import { REDIS } from '../configs/common';
import logger from './logger';

const client = redis.createClient(REDIS);

client.on('error', error => logger.error({ data: error }, 'REDIS ERROR'));

export default client;
