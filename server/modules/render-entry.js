'use strict';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createMemoryHistory';
import serialize from 'serialize-javascript';

import fs from 'fs';
import path from 'path';

import reducer from '../../client/app/core/reducer';
import createStore from '../../client/app/core/create-store';
import createRoutes from '../../client/app/core/create-routes';

const HTML_PLACEHOLDER = '<!--__HTML__-->';
const INITIAL_STATE = '__INITIAL_STATE__';
const INIT_STATE_PLACEHOLDER = `<!--${INITIAL_STATE}-->`;
const history = createHistory();

function render(req, store, props) {
  const str = renderToString(
    <Provider store={store}>
      <RoutingContext history={history} {...props} />
    </Provider>
  );

  const initialState = store.getState();
  const html = fs.readFileSync(path.resolve(__dirname, `../../dist/${__I18N_LANG__}/index.html`), { encoding: 'utf-8' });
  const content = html.replace(HTML_PLACEHOLDER, str).replace(INIT_STATE_PLACEHOLDER, `window.${INITIAL_STATE}=${serialize(initialState)}`);
  return content;
}

function handleRender(req, res, store) {
  const routes = createRoutes(store);
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).send(render(req, store, renderProps));
    } else {
      res.status(404).send('NOT FOUND');
    }
  });
}

function needAuth(reqPath) {
  return false;
  return reqPath.indexOf('/p') !== 0;
}

export default (req, res) => {
  const store = createStore(reducer);
  if (needAuth(req.path)) {
    // dispatch auth action
    store.dispatch();
    store.subscribe(() => {
      handleRender(req, res, store);
    });
  } else {
    handleRender(req, res, store);
  }
}

