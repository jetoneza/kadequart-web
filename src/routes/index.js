// We only need to import the modules necessary for initial render
import { LOGIN_SUCCESS } from 'store/modules/auth';
import Home from './Home'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import DashboardRoute from './Dashboard'
import ReportsRoute from './Reports'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  onEnter: async (nextState, replace, cb) => {
    const auth = JSON.parse(localStorage.getItem('reduxPersist:auth'));
    if (auth && auth.user) {
      await store.dispatch({
        type: LOGIN_SUCCESS,
        payload: auth,
      });
    }
    cb();
  },
  getComponent(nexState, cb) {
    require.ensure([], require => {
      const CoreLayout = require('layouts/CoreLayout/CoreLayout').default;
      cb(null, CoreLayout);
    }, 'core');
  },
  indexRoute: Home(store),
  childRoutes: [
    LoginRoute(store),
    SignupRoute(store),
    DashboardRoute(store),
    ReportsRoute(store),
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
