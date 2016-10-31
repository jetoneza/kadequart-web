export default (store) => ({
  path: 'signup',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Signup = require('./containers/SignupContainer').default

      cb(null, Signup)
    }, 'signup')
  },
})
