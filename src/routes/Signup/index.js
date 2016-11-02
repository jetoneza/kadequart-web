export default (store) => ({
  path: 'signup',
  onEnter(nextState, replace) {
    const { auth } = store.getState();
    if (auth.user && auth.token) {
      const redirect = nextState.location.query.redirect || '/dashboard';
      replace(redirect);
    }
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Signup = require('./containers/SignupContainer').default

      cb(null, Signup)
    }, 'signup')
  },
})
