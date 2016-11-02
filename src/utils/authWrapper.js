import { UserAuthWrapper } from 'redux-auth-wrapper';

export const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: auth => (auth.user !== null && auth.token !== null),
});
