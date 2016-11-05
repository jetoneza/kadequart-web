import React from 'react';
import Graph from './Graph';
import TransactionsTable from './TransactionsTable';
import Statistics from './Statistics';
import { formatNumber } from 'utils/currency'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUserKaha();
  }

  componentWillReceiveProps(newProps, oldProps) {
    const { confirmSuccess } = newProps.transactions;

    if(confirmSuccess) {
      this.props.getUserKaha();
    }
  }

  render() {
    const { kaha, fetchingKaha } = this.props.auth;
    return (
      <div className="dashboard-page">
        <div className="hero-section">
          <div className="ui main center aligned container statistic-info">
            <div className="ui huge inverted statistic">
              <div className="value">
                {fetchingKaha ? <div className="ui active inline loader"></div> : kaha && formatNumber(kaha.amount, '') }
              </div>
              <div className="label">
                KDQ
              </div>
            </div>
          </div>
          <Graph />
        </div>
        <div className="ui main container">
          <Statistics {...this.props}/>
          <TransactionsTable {...this.props}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;
