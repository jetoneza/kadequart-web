import React from 'react';
import TransactionModal from './TransactionModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

class TransactionsTable extends React.Component {

  handleEditClick = (transaction) => {
    const { transactionModal } = this.refs;
    transactionModal.setTransaction(transaction);
    transactionModal.open()
  }

  handleDeleteClick = (transaction) => {
    const { confirmDeleteModal } = this.refs;
    confirmDeleteModal.setTransaction(transaction);
    confirmDeleteModal.open()
  }

  render() {
    const data = [
      {
        id: '00001',
        amount: '1000.00',
        type: 'donation',
        createdAt: 'October 27, 2016'
      },
      {
        id: '00002',
        amount: '1500.00',
        type: 'donation',
        createdAt: 'October 27, 2016'
      },
      {
        id: '00003',
        amount: '2333.00',
        type: 'donation',
        createdAt: 'October 27, 2016'
      },
      {
        id: '00004',
        amount: '5500.00',
        type: 'donation',
        createdAt: 'October 27, 2016'
      },
    ];

    return (
      <div className="transactions-table-wrapper">
        <TransactionModal ref="transactionModal" />
        <ConfirmDeleteModal ref="confirmDeleteModal" />
        <table className="ui blue selectable table transactions-table">
          <thead>
            <tr>
              <th>Transaction #</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>KDQ {item.amount}</td>
                  <td>{item.type}</td>
                  <td>{item.createdAt}</td>
                  <td className="actions">
                    <button className="ui blue compact icon button" onClick={e => this.handleEditClick(item)}><i className="edit icon"></i></button>
                    <button className="ui red compact icon button" onClick={e => this.handleDeleteClick(item)}><i className="trash icon"></i></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionsTable;
