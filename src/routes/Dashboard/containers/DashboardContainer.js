import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'

import {
  getTransactionTypes,
  createTransaction,
  getTransactions,
  updateTransaction,
  confirmTransaction,
  deleteTransaction
} from 'store/modules/transactions';

import { getUserKaha } from 'store/modules/auth';
import { getStatistics, getDataset } from 'store/modules/statistics';

const mapActionCreators = {
  getTransactionTypes,
  createTransaction,
  getTransactions,
  updateTransaction,
  confirmTransaction,
  deleteTransaction,
  getUserKaha,
  getStatistics,
  getDataset,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  transactions: state.transactions,
  statistics: state.statistics,
})

export default connect(mapStateToProps, mapActionCreators)(Dashboard)
