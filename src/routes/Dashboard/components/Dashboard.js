import React from 'react';
import Graph from './Graph';
import TransactionsTable from './TransactionsTable';
import Statistics from './Statistics';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard-page">
        <div className="hero-section">
          <div className="ui main center aligned container statistic-info">
            <div className="ui huge inverted statistic">
              <div className="value">
                32,204
              </div>
              <div className="label">
                KDQ
              </div>
            </div>
          </div>
          <Graph />
        </div>
        <div className="ui main container">
          <Statistics />
          <TransactionsTable />
        </div>
      </div>
    );
  }
}

export default Dashboard;
