import React from 'react'
import TransactionsTable from './TransactionsTable'

class Reports extends React.Component {
  render() {
    return (
      <div className="reports-page">
        <div className="hero-section">
          <div className="ui main center aligned container">
            <h1>Reports</h1>
          </div>
        </div>
        <div className="ui main container">
          <TransactionsTable {...this.props} />
        </div>
      </div>
    );
  }
}

export default Reports
