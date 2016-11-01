import React from 'react';
import AddTransactionModal from './AddTransactionModal';

class Statistics extends React.Component {

  handleAddClick = () => {
    const { addTransactionModal } = this.refs;
    addTransactionModal.open();
  }

  render() {
    return (
      <div className="ui stackable grid statistics-section">
        <AddTransactionModal ref="addTransactionModal" />
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
          <button className="ui massive blue fluid button add-button" onClick={this.handleAddClick}>
            <i className="plus icon"></i> Add New
          </button>
        </div>
      </div>
    );
  }
}

export default Statistics;
