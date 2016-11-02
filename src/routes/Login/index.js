export default (store) => ({
  path: 'login',
  onEnter(nextState, replace) {
    const { auth } = store.getState();
    if (auth.user && auth.token) {
      const redirect = nextState.location.query.redirect || '/dashboard';
      replace(redirect);
    }
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers/LoginContainer').default

      cb(null, Login)
    }, 'login')
  },
})
