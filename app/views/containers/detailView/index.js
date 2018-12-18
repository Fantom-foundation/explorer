import React from 'react';
import { Col, Table, Row, TabContent, TabPane } from 'reactstrap';
import Header from '../../components/header/header'

export default class DetailView extends React.PureComponent {
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
    const location = this.props.location;
    const state = location.state;
    const data = state.data;
    const type = state.type;
    if (type === 'transaction') {
      let txnStatus = 'Failed';
      if (data.status === 0) {
        txnStatus = 'Success';
      }
      return (
        <React.Fragment>
          <Header />
        <div className="tran-blk-details" style={{padding:'100px'}}>
          <div>
            <p>TxHash :</p>
            <p className="text-ellipsis">{data.transaction_hash}</p>
          </div>
          <div>
            <p>TxReceipt Status :</p>
            <p className="text-ellipsis">{txnStatus}</p>
          </div>
          <div>
            <p>From:</p>
            <p className="text-ellipsis">{data.address_from}</p>
          </div>
          <div>
            <p>To:</p>
            <p className="text-ellipsis">{data.address_to}</p>
          </div>
          <div>
            <p>Value:</p>
            <p className="text-ellipsis">{data.gasUsed}</p>
          </div>
          <div>
            <p>Gas used:</p>
            <p className="text-ellipsis">{txnStatus}</p>
          </div>
          <div>
            <p>Cumulative Gas used:</p>
            <p className="text-ellipsis">{data.cumulativeGasUsed}</p>
          </div>
          <div>
            <p>Contract Address:</p>
            <p className="text-ellipsis">{data.contractAddress}</p>
          </div>
          <div>
            <p>Root :</p>
            <p className="text-ellipsis">{data.root}</p>
          </div>
          <div>
            <p>Contract Address:</p>
            <p className="text-ellipsis">{data.contractAddress}</p>
          </div>
          <div>
            <p>Input Data:</p>
            <p className="text-ellipsis text-primary">
            {data.logsBloom}
            </p>
          </div>
        </div>
      </React.Fragment>
      );
    } else if (type === 'block') {
      let transactionText = 'transactions';
      if (data.transactions.length <= 1) {
        transactionText = 'transaction';
      }

      return (
        <React.Fragment>
           <Header />
          <div className="tran-blk-details" style={{padding:'100px'}}>
            <div>
              <p>Height :</p>
              <p className="text-ellipsis">{data.height}</p>
            </div>
            <div>
              <p>Transactions :</p>
              <p className="text-ellipsis">
                <span
                  aria-hidden
                  className="text-primary"
                  style={{
                    cursor: `${data.transactions >= 1 ? 'pointer' : ''}`,
                  }}
                  onClick={() =>
                    this.showDetail(data.height, data.transactions)
                  }
                >
                  {data.transactions.length} {transactionText}
                </span>
              </p>
            </div>
            <div>
              <p>Hash :</p>
              <p className="text-ellipsis">{data.hash}</p>
            </div>
            <div>
              <p>Round :</p>
              <p className="text-ellipsis">
                <span className="text-primary">{data.round}</span>
              </p>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
