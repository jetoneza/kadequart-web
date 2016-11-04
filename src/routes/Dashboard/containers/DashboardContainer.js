import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'

import { getTransactionTypes, createTransaction, getTransactions, updateTransaction } from 'store/modules/transactions';

const mapActionCreators = {
  getTransactionTypes,
  createTransaction,
  getTransactions,
  updateTransaction,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
})

export default connect(mapStateToProps, mapActionCreators)(Dashboard)
