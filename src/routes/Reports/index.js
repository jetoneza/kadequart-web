import { UserIsAuthenticated } from 'utils/authWrapper';
import ReportsContainer from './containers/ReportsContainer';

export default (store) => ({
  path: 'reports',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, UserIsAuthenticated(ReportsContainer));
    }, 'reports');
  },
})
