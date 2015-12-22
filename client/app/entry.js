import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import reducer from './core/reducer';
import createStore from './core/create-store';
import createRoutes from './core/create-routes';

import styles from './style.scss';

const initialState = window.__INITIAL_STATE__;
const store = createStore(reducer, initialState);
const routes = createRoutes(store);

const history = createHistory();

ReactDom.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
  ,document.querySelector('#react-app-container')
);
