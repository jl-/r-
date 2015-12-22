import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AUTH_STATUS from '../../modules/auth/auth-status';

const PUBLIC_INDEX = '/p';

const getPublicMainComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../public').default);
  });
};
const getPublicMainIndexComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../public/index/index').default);
  });
};
const getPublicAboutComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../public/about').default);
  });
};

const getIhomeComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../ihome').default);
  });
};
const getIhomeIndexComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../ihome/index/index').default);
  });
};
const getIhomeCoursesComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../ihome/courses').default);
  });
};
const getIhomeCommunitiesComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../ihome/communities').default);
  });
};
const getIhomeHomeComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../ihome/home').default);
  });
};
const getIhomeActivitiesComponent = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('../ihome/activities').default);
  });
};


export default function({dispatch, getState}) {
  function onRootEntered(nextState, replaceState) {
    let { auth } = getState();
    console.log(auth);
    if (auth.status !== AUTH_STATUS.AUTHED && nextState.location.pathname.indexOf(PUBLIC_INDEX) === -1) {
      replaceState(null, PUBLIC_INDEX);
    }
  }

  const routes = (
    <Route onEnter={onRootEntered}>
      {/* public routes*/}
      <Route>
        <Route path='/p' getComponent={getPublicMainComponent}>
          <IndexRoute getComponent={getPublicMainIndexComponent}></IndexRoute>
        </Route>
        <Route path='/p/about' getComponent={getPublicAboutComponent}></Route>
      </Route>

      {/* ihome routes*/}
      <Route path='/' getComponent={getIhomeComponent}>
        <IndexRoute getComponent={getIhomeIndexComponent}></IndexRoute>
        <Route path='courses' getComponent={getIhomeCoursesComponent}></Route>
        <Route path='communities' getComponent={getIhomeCommunitiesComponent}></Route>
        <Route path='home' getComponent={getIhomeHomeComponent}></Route>
        <Route path='activities' getComponent={getIhomeActivitiesComponent}></Route>
      </Route>
    </Route>
  );
  return routes;
};
