import { UserIsAuthenticated } from 'utils/authWrapper';
import DashboardContainer from './containers/DashboardContainer';

export default (store) => ({
  path: 'dashboard',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, UserIsAuthenticated(DashboardContainer));
    }, 'dashboard');
  },
})
