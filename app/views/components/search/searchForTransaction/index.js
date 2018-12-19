import React, { Component } from 'react';
import {
  Col,
  Table,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import Web3 from 'web3';
import classnames from 'classnames';
/**
 * SearchForTransaction :  A component meant for searching details of particuler transaction , on entering valid transaction hash in search field.
 */

class SearchForTransaction extends Component {
  renderDetail = () => {
    const { transactions } = this.props;
    let transactionHash = '';
    let txnStatus = '';
    let addressFrom = '';
    let addressTo = '';
    let value = '';
    let gasUsed = '';
    let cumulativeGasUsed = '';
    let contractAddress = '';
    let root = '';
    let inputData = '';

    if (transactions && transactions.length) {
      const data = transactions.map((txData, index) => {
        transactionHash = txData.transaction_hash || '--';
        txnStatus = txData.status === 0 ? 'Success' : 'Failed';
        addressFrom = txData.address_from || '--';
        addressTo = txData.address_to || '--';
        value = `${txData.value}` || '--';
        if (value !== '--') {
          value = Web3.utils.fromWei(`${value}`, 'ether');
          value = Number(value).toFixed(4);
        }
        gasUsed = `${txData.gasUsed}` || '--';
        cumulativeGasUsed = `${txData.cumulativeGasUsed}` || '--';
        contractAddress = `${txData.contractAddress}` || '--';
        root = `${txData.root}` || '--';
        inputData = `${txData.logsBloom}` || '--';
        return (
          <React.Fragment>
            <hr />
            <div className="tran-blk-details">
              <div>
                <p>TxHash:</p>
                <p className="text-ellipsis">{transactionHash}</p>
              </div>
              <div>
                <p>TxReceipt Status:</p>
                <p>{txnStatus}</p>
              </div>
              <div>
                <p>From:</p>
                <p className="text-primary text-ellipsis">{addressFrom}</p>
              </div>
              <div>
                <p>To:</p>
                <p className="text-ellipsis">{addressTo}</p>
              </div>
              <div>
                <p>Value:</p>
                <p>{value} FTM</p>
              </div>
              <div>
                <p>Gas used:</p>
                <p className="text-ellipsis">{gasUsed}</p>
              </div>
              <div>
                <p>Cumulative Gas used:</p>
                <p className="text-ellipsis">{cumulativeGasUsed}</p>
              </div>
              <div>
                <p>Contract Address:</p>
                <p className="text-ellipsis">{contractAddress}</p>
              </div>
              <div>
                <p>Root:</p>
                <p className="text-ellipsis">{root}</p>
              </div>
              <div>
                <p>Input Data:</p>
                <textarea>{inputData}</textarea>
              </div>
            </div>
          </React.Fragment>
        );
      });
      return data;
    }
    return null;
  };
  render() {
    return this.renderDetail();
  }
}

export default SearchForTransaction;
