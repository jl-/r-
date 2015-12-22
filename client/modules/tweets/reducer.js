import ACTION_TYPES from './action-types';
import STATUS from './status';

let initSession = {
  status: STATUS.FETCHING,
  data: null
};

export default function tweets(state = initSession, action) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_OK:
      console.log('fetch ok !!!');
      return {
        status: STATUS.FETCH_OK,
        data: action.payload
      };
    default:
      return state;
  }
}

