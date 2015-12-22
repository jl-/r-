import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

const finalCreateStore = compose(
  applyMiddleware(reduxThunk)
)(createStore);

export default finalCreateStore;
