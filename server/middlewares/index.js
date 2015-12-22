import cookieParser from './cookie';
import session from './session';
import { urlEncodedBodyParser, jsonBodyParser } from './body';

const middlewares = [
  cookieParser,
  session,
  urlEncodedBodyParser,
  jsonBodyParser
];

export default function applyMiddlewares(app) {
  middlewares.forEach(middleware => app.use(middleware));
}
