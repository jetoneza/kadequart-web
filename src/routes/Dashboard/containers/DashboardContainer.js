import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'
const mapActionCreators = {}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, mapActionCreators)(Dashboard)
