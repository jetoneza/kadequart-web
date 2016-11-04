import React from 'react';
import TransactionModal from './TransactionModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

class TransactionsTable extends React.Component {

  componentDidMount() {
    this.props.getTransactions();
  }

  componentWillReceiveProps(newProps, oldProps) {
    const { createSuccess } = newProps.transactions;

    if(createSuccess) {
      this.props.getTransactions();
    }
  }

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

  handlePageClick = (page) => {
    const { list } = this.props.transactions;
    const { lastPage, currentPage } = list;
    if(page < 1 || page > lastPage || page == currentPage) {
      return;
    }
    this.props.getTransactions(page);
  }

  renderTable = () => {
    const { list, fetchingTransactions } = this.props.transactions;
    const { data, lastPage, currentPage } = list;

    if(fetchingTransactions) {
      return (
        <div className="ui loading blue segment">
          <p>Fetching transactions.</p>
          <p>Please wait.</p>
        </div>
      );
    }

    let pages = [];

    for(let page = 1; page <= lastPage; page++) {
      pages.push(<a key={page} className={`item ${page == currentPage ? 'active' : ''}`} onClick={e => this.handlePageClick(page)}>{page}</a>)
    }

    return (
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
                <td>{item.type.name}</td>
                <td>{item.created_at}</td>
                <td className="actions">
                  <button className="ui blue compact icon button" onClick={e => this.handleEditClick(item)}><i className="edit icon"></i></button>
                  <button className="ui red compact icon button" onClick={e => this.handleDeleteClick(item)}><i className="trash icon"></i></button>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="5">
              <div className="ui right floated pagination menu">
                <a className={`icon item ${currentPage == 1 ? 'disabled' : ''}`} onClick={e => this.handlePageClick(currentPage - 1)}>
                  <i className="left chevron icon"></i>
                </a>
                {pages.map(page => {
                  return page
                })}
                <a className={`icon item ${currentPage == lastPage ? 'disabled' : ''}`} onClick={e => this.handlePageClick(currentPage + 1)}>
                  <i className="right chevron icon"></i>
                </a>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {
    const { list } = this.props.transactions;
    const table = list ? this.renderTable() : null;

    return (
      <div className="transactions-table-wrapper">
        <TransactionModal ref="transactionModal" {...this.props}/>
        <ConfirmDeleteModal ref="confirmDeleteModal" />
        { table }
      </div>
    );
  }
}

export default TransactionsTable;
