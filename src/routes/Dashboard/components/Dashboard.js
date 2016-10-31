import React from 'react';
import Graph from './Graph';
import TransactionsTable from './TransactionsTable';

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
          <div className="ui stackable grid statistics-section">
            <div className="four wide column center aligned">
              <div className="ui green statistic">
                <div className="value">
                  <i className="line chart icon"></i> 10,000
                </div>
                <div className="label">
                  Top Pay In
                </div>
              </div>
            </div>
            <div className="four wide column center aligned">
              <div className="ui red statistic">
                <div className="value">
                  <i className="level down icon"></i> 6,000
                </div>
                <div className="label">
                  Top Pay Out
                </div>
              </div>
            </div>
            <div className="four wide column center aligned">
              <div className="ui teal statistic">
                <div className="value">
                  <i className="exchange icon"></i> 143
                </div>
                <div className="label">
                  Transactions
                </div>
              </div>
            </div>
            <div className="four wide column center aligned actions">
              <button className="ui massive blue fluid button add-button">
                <i className="plus icon"></i> Add New
              </button>
            </div>
          </div>
          <TransactionsTable />
        </div>
      </div>
    );
  }
}

export default Dashboard;
