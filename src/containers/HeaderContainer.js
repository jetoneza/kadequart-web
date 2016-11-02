import { connect } from 'react-redux'
import { logout } from 'store/modules/auth';

import Header from 'components/Header'

const mapActionCreators = {
  logout,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, mapActionCreators)(Header)
