import { uid, ktv } from '../../../utils';
import ACTION_TYPES from './action-types';

const STATUS = [
  'FETCHING',
];

//
//

export default Object.assign(ktv(STATUS, uid), ACTION_TYPES);
