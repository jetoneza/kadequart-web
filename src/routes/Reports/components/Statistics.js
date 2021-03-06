import React from 'react';
import { formatNumber } from 'utils/currency'

class Statistics extends React.Component {

  render() {
    const { fetchingStatistics, data } = this.props.statistics;
    let summaryTotal = 0

    if (!fetchingStatistics && data) {
      summaryTotal = data.totalPayin - data.totalPayout
    }

    return (
      <div className="ui stackable grid statistics-section">
        <div className="four wide column center aligned">
          <div className="ui green statistic">
            <div className="value">
              { fetchingStatistics && <div className="ui active inline loader"></div> }
              { !fetchingStatistics && <i className="line chart icon"></i> }
              { !fetchingStatistics && (data && ` ${formatNumber(data.totalPayin, '', 0)}`) }
            </div>
            <div className="label">
              Total Pay In
            </div>
          </div>
        </div>
        <div className="four wide column center aligned">
          <div className="ui red statistic">
            <div className="value">
              { fetchingStatistics && <div className="ui active inline loader"></div> }
              { !fetchingStatistics && <i className="level down icon"></i> }
              { !fetchingStatistics && (data && ` ${formatNumber(data.totalPayout, '', 0)}`) }
            </div>
            <div className="label">
              Total Pay Out
            </div>
          </div>
        </div>
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
        <div className="sixteen wide column center aligned">
          <div className={`ui ${summaryTotal > 0 ? 'green' : 'red'} statistic`}>
            <div className="value">
              { fetchingStatistics && <div className="ui active inline loader"></div> }
              { !fetchingStatistics && <i className={`${summaryTotal > 0 ? 'line chart' : 'level down'} icon`}></i> }
              { !fetchingStatistics && (data && ` ${formatNumber(summaryTotal, '', 0)}`) }
            </div>
            <div className="label">
              {  summaryTotal > 0 ? 'Gain' : 'Loss'}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;

