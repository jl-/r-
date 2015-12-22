import { combineReducers } from 'redux';
import auth from '../../modules/auth/reducer';
import tweets from '../../modules/tweets/reducer';

const reducer = combineReducers({
  auth,
  tweets
});

export default reducer;
