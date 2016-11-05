import React from 'react';
import TransactionModal from './TransactionModal';
import { formatNumber } from 'utils/currency'

class Statistics extends React.Component {

  handleAddClick = () => {
    const { transactionModal } = this.refs;
    transactionModal.open();
  }

  render() {
    const { fetchingStatistics, data } = this.props.statistics;
    return (
      <div className="ui stackable grid statistics-section">
        <TransactionModal ref="transactionModal" {...this.props}/>
        <div className="four wide column center aligned">
          <div className="ui green statistic">
            <div className="value">
              { fetchingStatistics && <div className="ui active inline loader"></div> }
              { !fetchingStatistics && <i className="line chart icon"></i> }
              { !fetchingStatistics && (data && ` ${formatNumber(data.topPayin, '', 0)}`) }
            </div>
            <div className="label">
              Top Pay In
            </div>
          </div>
        </div>
        <div className="four wide column center aligned">
          <div className="ui red statistic">
            <div className="value">
              { fetchingStatistics && <div className="ui active inline loader"></div> }
              { !fetchingStatistics && <i className="level down icon"></i> }
              { !fetchingStatistics && (data && ` ${formatNumber(data.topPayout, '', 0)}`) }
            </div>
            <div className="label">
              Top Pay Out
            </div>
          </div>
        </div>
        <div className="four wide column center aligned">
          <div className="ui teal statistic">
            <div className="value">
              { fetchingStatistics && <div className="ui active inline loader"></div> }
              { !fetchingStatistics && <i className="exchange icon"></i> }
              { !fetchingStatistics && (data && ` ${formatNumber(data.transactionsCount, '', 0)}`) }
            </div>
            <div className="label">
              Transactions
            </div>
          </div>
        </div>
        <div className="four wide column center aligned actions">
          <button className="ui massive blue fluid button add-button" onClick={this.handleAddClick}>
            <i className="plus icon"></i> Add New
          </button>
        </div>
      </div>
    );
  }
}

export default Statistics;
