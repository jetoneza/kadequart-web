import React from 'react';
import { Bar } from 'react-chartjs-2';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: []
      },
      isFetching: false,
    };

    this.options = {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#bedff4',
            beginAtZero: true,
            maxTicksLimit: 8,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: '#bedff4',
          }
        }],
      },
    };
  }

  componentDidMount() {
    this.props.getDataset();
    this.setState({isFetching: true});
  }

  componentWillReceiveProps(newProps, oldProps) {
    const { confirmSuccess  } = newProps.transactions;
    const { fetchingDataset } = newProps.statistics;

    if(confirmSuccess) {
      this.props.getDataset();
      this.setState({isFetching: true});
    }

    if(!fetchingDataset && this.state.isFetching) {
      this.initializeGraph(newProps.statistics.dataset)
    }
  }

  shouldComponentUpdate(newProps, newState) {
    return newProps.statistics.dataset != this.props.statistics.dataset;
  }

  initializeGraph = (dataset) => {
    let labels = [];
    let dataItems = [];
    let spendings = [];
    let earnings = [];

    dataset.forEach(item => {
      labels.push(item.month);
      dataItems.push(item.amount);
      spendings.push(item.totalSpending.toFixed(2));
      earnings.push(item.totalEarnings.toFixed(2));
    })

    let data = {
      labels,
      datasets: [
        {
          type: 'line',
          label: 'Balance',
          pointBorderColor: '#3b9fde',
          lineTension: 0,
          borderWidth: 2,
          backgroundColor: 'rgba(59, 159, 222, 0)',
          borderColor: '#3b9fde',
          pointBackgroundColor: '#3b9fde',
          pointBorderColor: '#3b9fde',
          pointHoverBackgroundColor: '#3b9fde',
          pointHoverBorderColor: '#3b9fde',
          pointBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 5,
          data: dataItems,
        },
        {
          label: 'Earnings',
          pointBorderColor: '#21BA45',
          lineTension: 0,
          borderWidth: 2,
          backgroundColor: 'rgba(33, 186, 69, 0.3)',
          borderColor: '#21BA45',
          pointBackgroundColor: '#21BA45',
          pointBorderColor: '#21BA45',
          pointHoverBackgroundColor: '#21BA45',
          pointHoverBorderColor: '#21BA45',
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 5,
          data: earnings,
        },
        {
          label: 'Spending',
          pointBorderColor: '#DB2828',
          lineTension: 0,
          borderWidth: 2,
          backgroundColor: 'rgba(219, 40, 40, 0.3)',
          borderColor: '#DB2828',
          pointBackgroundColor: '#DB2828',
          pointBorderColor: '#DB2828',
          pointHoverBackgroundColor: '#DB2828',
          pointHoverBorderColor: '#DB2828',
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 5,
          data: spendings,
        },
      ]
    }

    this.setState({data, isFetching: false});
  }

  render() {
    const { data } = this.state;

    return (
      <div className="graph">
        <Bar data={data} options={this.options} height={75} />
      </div>
    );
  }
}

export default Graph;
