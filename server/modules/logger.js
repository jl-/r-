import bunyan from 'bunyan';
import { APP, PATHS } from '../configs/common';

const freeSerializer = (src) => src;

let logger = bunyan.createLogger({
  name: APP.NAME,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    data: freeSerializer
  },
  streams: [{
    level: bunyan.INFO,
    path: PATHS.INFO_LOG
  }, {
    level: bunyan.ERROR,
    path: PATHS.ERR_LOG
  }]
});

export default logger;
