import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AUTH_STATUS from '../../modules/auth/auth-status';

const PUBLIC_INDEX = '/p';

import PublicMain from '../public';
import PublicMainIndex from '../public/index/index';
import PublicAbout from '../public/about';
import Ihome from '../ihome';
import IhomeIndex from '../ihome/index/index';
import IhomeCourses from '../ihome/courses';
import IhomeCommunities from '../ihome/communities';
import IhomeHome from '../ihome/home';
import IhomeActivities from '../ihome/activities';


export default function({dispatch, getState}) {
  function onRootEntered(nextState, replaceState) {
    let { auth } = getState();
    if (auth.status !== AUTH_STATUS.AUTHED && nextState.location.pathname.indexOf(PUBLIC_INDEX) === -1) {
      replaceState(null, PUBLIC_INDEX);
    }
  }

  const routes = (
    <Route onEnter={onRootEntered}>
      {/* public routes*/}
      <Route>
        <Route path='/p' component={PublicMain}>
          <IndexRoute component={PublicMainIndex}></IndexRoute>
        </Route>
        <Route path='/p/about' component={PublicAbout}></Route>
      </Route>

      {/* ihome routes*/}
      <Route path='/' component={Ihome}>
        <IndexRoute component={IhomeIndex}></IndexRoute>
        <Route path='courses' component={IhomeCourses}></Route>
        <Route path='communities' component={IhomeCommunities}></Route>
        <Route path='home' component={IhomeHome}></Route>
        <Route path='activities' component={IhomeActivities}></Route>
      </Route>
    </Route>
  );
  return routes;
};
