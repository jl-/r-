//import accounts from './accounts';
//import sessions from './sessions';
import render from './render';

export default function applyRouters(app) {
  //app.use('/accounts', accounts);
  //app.use('/sessions', sessions);
  app.use('*', render);
}
