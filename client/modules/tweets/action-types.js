import { uid, ktv } from '../../../utils';

const ACTIONS = [
  'FETCH',
  'FETCH_OK',
  'FETCH_FAILED'
];
export default ktv(ACTIONS, uid);
