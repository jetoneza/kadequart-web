export default (store) => ({
  path: 'dashboard',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default

      cb(null, Dashboard)
    }, 'dashboard')
  },
})
