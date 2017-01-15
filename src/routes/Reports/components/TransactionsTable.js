import React from 'react'
import moment from 'moment'
import NoteModal from 'components/NoteModal'
import Statistics from './Statistics'
import { formatNumber, zeroPad } from 'utils/currency'
import { Select } from 'semantic-ui-react';

class TransactionsTable extends React.Component {

  constructor(props) {
    super(props)

    this.dateFilters = {
      DAY: 'day',
      MONTH: 'month',
      YEAR: 'year',
    }

    const dateFilter = this.dateFilters.DAY

    const { startDate, endDate } = this.setDates(dateFilter)

    this.state = {
      dateFilter,
      startDate,
      endDate,
    }
  }

  setDates = (dateFilter) => {
    const dateFormat = 'YYYY-MM-DD HH:mm:ss'
    const startDate = moment().startOf(dateFilter).format(dateFormat)
    const endDate = moment().endOf(dateFilter).format(dateFormat)

    return { startDate, endDate }
  }

  componentDidMount() {
    // TODO: add filter to show only confirmed transactions

    const { startDate, endDate } = this.state

    this.props.getTransactions(1, 10, startDate, endDate)
    this.props.getStatistics(startDate, endDate)
  }

  handlePageClick = (page) => {
    const { startDate, endDate } = this.state
    const { list } = this.props.transactions
    const { lastPage, currentPage } = list
    if(page < 1 || page > lastPage || page == currentPage) {
      return
    }
    this.props.getTransactions(page, 10, startDate, endDate)
  }

  readNotes = (notes) => {
    const { noteModal } = this.refs
    noteModal.setNotes(notes)
    noteModal.open()
  }

  renderTable = () => {
    const { list, fetchingTransactions } = this.props.transactions
    const { data, lastPage, currentPage, total } = list

    if(fetchingTransactions) {
      return (
        <div className="ui loading blue segment">
          <p>Fetching transactions.</p>
          <p>Please wait.</p>
        </div>
      )
    }

    if(total < 1) {
      return (
        <div className="ui segment no-data">
          <h1>No data for this {this.state.dateFilter}</h1>
        </div>
      )
    }

    let pages = []

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
                      <i className="icon checkmark green"></i> : 'Unconfirmed'
                   }
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="7">
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
    )
  }

  handleSelectChange = (event, target) => {
    const dateFilter = this.dateFilters[target.value]

    const { startDate, endDate } = this.setDates(dateFilter)

    this.props.getTransactions(1, 10, startDate, endDate)
    this.props.getStatistics(startDate, endDate)
    this.setState({startDate, endDate, dateFilter})
  }

  shouldComponentUpdate(newProps, newState) {
    const newStatistics = newProps.statistics.data != this.props.statistics.data
    const newTransactions = newProps.transactions.list != this.props.transactions.list
    return newStatistics || newTransactions
  }

  render() {
    const { list } = this.props.transactions
    const table = list ? this.renderTable() : null

    const options = []

    for ( let key in this.dateFilters ) {
      options.push({
        text: this.dateFilters[key],
        value: key,
      })
    }

    return (
      <div className="transactions-table-wrapper">
        <NoteModal ref="noteModal" />
        <div className="field">
          <Select placeholder="Filter by" options={options} onChange={this.handleSelectChange}/>
        </div>
        <h1 className="title">Summary for this {this.state.dateFilter}.</h1>
        <Statistics {...this.props}/>
        { table }
      </div>
    )
  }
}

export default TransactionsTable

