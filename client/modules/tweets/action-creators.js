import ACTION_TYPES from './action-types';
import STATUS from './status';
import Api from './api';

function fetch (query) {
  return (dispatch, getState) => {
    //dispatch({type: ACTION_TYPES.FETCH});
    return Api.fetch(query)
      .then(res => {
        dispatch({
          type: ACTION_TYPES.FETCH_OK,
          payload: res
        });
      }, err => {
        dispatch({
          type: ACTION_TYPES.FETCH_FAILED,
          payload: err
        });
      });
  };
}


export default {
  fetch
};
