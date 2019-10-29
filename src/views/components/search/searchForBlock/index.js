import React, { Component } from 'react';
import moment from 'moment';

/**
 * SearchForBlock :  A component meant for searching details of particuler Block , on entering valid index in search field.
 */

class SearchForBlock extends Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  showDetail(height, transactions) {
    if (transactions <= 0) {
      return;
    }
    const { showDetail } = this.props; // eslint-disable-line
    if (showDetail) {
      showDetail(height);
    }
  }

  render() {
    const { blocks } = this.props; // eslint-disable-line
    let height = '';
    let hash = '';
    let round = '';
    let transactions = '';
    let createdAt = '';

    if (blocks && blocks.length) {
      height = blocks[0].height;
      hash = blocks[0].hash;
      round = blocks[0].round;
      transactions = blocks[0].transactions
        ? blocks[0].transactions
        : blocks[0].transactionLength;
      createdAt = blocks[0].createdTime;
    }
    let transactionText = 'transactions';
    if (transactions <= 1) {
      transactionText = 'transaction';
    }

    return (
      <React.Fragment>
        <hr />
        <div className="tran-blk-details">
          <div>
            <p>Height :</p>
            <p className="text-ellipsis">{height}</p>
          </div>
          <div>
            <p>Transactions : </p>
            <p className="text-ellipsis pointer">
              <span
                aria-hidden
                className="text-primary"
                style={{ cursor: `${transactions >= 1 ? 'pointer' : ''}` }}
                onClick={() => this.showDetail(height, transactions)}
              >
                {transactions} {transactionText}
              </span>
            </p>
          </div>
          <div>
            <p>Hash :</p>
            <p className="text-ellipsis">{hash}</p>
          </div>
          <div>
            <p>Round :</p>
            <p className="text-ellipsis">
              <span className="text-primary">{round}</span>
            </p>
          </div>
          <div>
            <p>Time :</p>
            <p className="text-ellipsis">
              {moment(new Date(createdAt * 1000)).fromNow()}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchForBlock;
