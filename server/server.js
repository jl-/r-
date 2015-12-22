'use strict';
import express from 'express';
import logger from './modules/logger';
import { SERVER } from './configs/common';
import applyMiddlewares from './middlewares';
import applyRouters from './routers';

const app = express();
applyMiddlewares(app);
applyRouters(app);

app.listen(SERVER.PORT);

app.on('error', function (err) {
  logger.info({ data: err }, 'err');
});

process.on('SIGINT', function() {
  process.exit(0);
});
process.on('uncaughtException', function(err) {
  console.log(err);
  logger.error({ data: err }, 'uncaughtException');
});
