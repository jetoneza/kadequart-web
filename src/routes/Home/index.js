import HomeView from './components/HomeView'

export default (store) => ({
  onEnter(nextState, replace) {
    const { auth } = store.getState();
    if (auth.user && auth.token) {
      const redirect = nextState.location.query.redirect || '/dashboard';
      replace(redirect);
    }
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HomeView = require('./components/HomeView').default

      cb(null, HomeView)
    }, 'home')
  },
})

