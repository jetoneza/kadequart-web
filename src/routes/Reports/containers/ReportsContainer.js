import { connect } from 'react-redux'

import Reports from '../components/Reports'

import { getTransactions } from 'store/modules/transactions';
import { getStatistics } from 'store/modules/statistics';

const mapActionCreators = {
  getTransactions,
  getStatistics,
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  statistics: state.statistics,
})

export default connect(mapStateToProps, mapActionCreators)(Reports)
