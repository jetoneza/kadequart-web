import React from 'react';
import TransactionModal from './TransactionModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import NoteModal from './NoteModal';
import { formatNumber, zeroPad } from 'utils/currency';

class TransactionsTable extends React.Component {

  componentDidMount() {
    this.props.getTransactions();
  }

  componentWillReceiveProps(newProps, oldProps) {
    const { createSuccess, updateSuccess, confirmSuccess, deleteSuccess } = newProps.transactions;

    if(createSuccess || updateSuccess || confirmSuccess || deleteSuccess) {
      const { list } = newProps.transactions;
      const { currentPage } = list;
      this.props.getTransactions(currentPage);
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

  handleConfirmClick = (item) => {
    this.props.confirmTransaction(item.id);
  }

  readNotes = (notes) => {
    const { noteModal } = this.refs;
    noteModal.setNotes(notes);
    noteModal.open()
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
            <th>Notes</th>
            <th>Date Added</th>
            <th className="center aligned">Status</th>
            <th className="center aligned">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => {
            return (
              <tr key={item.id}>
                <td>{zeroPad(item.id, 8)}</td>
                <td>
                  <div className={`ui ${item.type.type === 'inflow' ? 'green' : 'red'} label`}>
                    {formatNumber(item.type.type === 'inflow' ? item.amount : (item.amount * -1), '')}
                  </div>
                </td>
                <td>
                  {item.type.name}
                </td>
                <td>
                  {item.notes ? <a onClick={e => this.readNotes(item.notes)}>Read notes</a> : 'n/a'}
                </td>
                <td>{item.created_at}</td>
                <td className="status center aligned">
                  {item.confirmed ?
                      <i className="icon checkmark green"></i> :
                      <button className="mini ui blue button" onClick={e => this.handleConfirmClick(item)}>Confirm</button>
                   }
                </td>
                <td className="actions center aligned">
                {!item.confirmed && <button className="ui blue compact icon button" onClick={e => this.handleEditClick(item)}><i className="edit icon"></i></button>}
                {!item.confirmed && <button className="ui red compact icon button" onClick={e => this.handleDeleteClick(item)}><i className="trash icon"></i></button>}
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="6">
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
        <NoteModal ref="noteModal" />
        <TransactionModal ref="transactionModal" {...this.props}/>
        <ConfirmDeleteModal ref="confirmDeleteModal" {...this.props}/>
        { table }
      </div>
    );
  }
}

export default TransactionsTable;
