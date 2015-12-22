import { uid, ktv } from '../../../utils';
import ACTION_TYPES from './action-types';

const STATUS = [
  'VOID',
  'AUTHED'
];

//
//

export default Object.assign({}, ACTION_TYPES, ktv(STATUS, uid));
