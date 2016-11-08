import React from 'react';
import Graph from './Graph';
import TransactionsTable from './TransactionsTable';
import Statistics from './Statistics';
import { formatNumber } from 'utils/currency'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUserKaha();
    this.props.getStatistics();
  }

  componentWillReceiveProps(newProps, oldProps) {
    const { confirmSuccess, createSuccess, deleteSuccess } = newProps.transactions;

    if(confirmSuccess) {
      this.props.getUserKaha();
    }

    if(createSuccess || confirmSuccess || deleteSuccess) {
      this.props.getStatistics();
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
          <Graph {...this.props}/>
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
