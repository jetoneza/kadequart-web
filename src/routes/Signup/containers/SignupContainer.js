import { connect } from 'react-redux'

import Signup from '../components/Signup'

import { signup } from 'store/modules/auth';

const mapActionCreators = {
  signup,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, mapActionCreators)(Signup)
