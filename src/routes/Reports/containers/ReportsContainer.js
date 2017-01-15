import { connect } from 'react-redux'

import Reports from '../components/Reports'

import { getTransactions } from 'store/modules/transactions';

const mapActionCreators = {
  getTransactions,
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
})

export default connect(mapStateToProps, mapActionCreators)(Reports)
