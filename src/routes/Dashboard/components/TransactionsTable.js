import React from 'react';

class TransactionsTable extends React.Component {
  render() {
    return (
      <table className="ui blue selectable table transactions-table">
        <thead>
          <tr>
            <th>Transaction #</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>00001</td>
            <td>KDQ 1,000.00</td>
            <td>Donation</td>
            <td>October 27, 2016</td>
          </tr>
          <tr>
            <td>00002</td>
            <td>KDQ 500.00</td>
            <td>Donation</td>
            <td>October 28, 2016</td>
          </tr>
          <tr>
            <td>00003</td>
            <td>KDQ 3,100.00</td>
            <td>Donation</td>
            <td>November 17, 2016</td>
          </tr>
          <tr>
            <td>00004</td>
            <td>KDQ 2,300.00</td>
            <td>Donation</td>
            <td>November 18, 2016</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default TransactionsTable;
