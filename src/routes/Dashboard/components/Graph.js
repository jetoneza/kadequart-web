import React from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Balance',
          pointBorderColor: '#3b9fde',
          lineTension: 0,
          borderWidth: 2,
          backgroundColor: 'rgba(59, 159, 222, 0.3)',
          borderColor: '#3b9fde',
          pointBackgroundColor: '#3b9fde',
          pointBorderColor: '#3b9fde',
          pointHoverBackgroundColor: '#3b9fde',
          pointHoverBorderColor: '#3b9fde',
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 5,
          data: [500, 730, 240, 495, 400, 560, 300, 180, 350, 190, 390, 390],
        },
      ]
    };

    this.options = {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            display: false,
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

  render() {
    return (
      <div className="graph">
        <Line data={this.data} options={this.options} height={75} />
      </div>
    );
  }
}

export default Graph;
