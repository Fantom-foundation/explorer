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
    console.log('TransactionDetail transactions : ', transactions);
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
        txnStatus = txData.txnStatus || '--';
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
          // <Row>
          <Col key={index}>
            <div id="theme-tab">
              <TabContent className="theme-nav-tab-content" activeTab={'1'}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Row>
                        <Col>
                          <Table className="information-table">
                            <thead>
                              <tr>
                                <th className="w-nowrap">
                                  Transaction Information
                                </th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>TxHash:</td>
                                <td>{transactionHash}</td>
                              </tr>
                              <tr>
                                <td>TxReceipt Status:</td>
                                <td>{txnStatus}</td>
                              </tr>
                              <tr>
                                <td>From:</td>
                                <td className="text-primary">{addressFrom}</td>
                              </tr>
                              <tr>
                                <td>To:</td>
                                <td>{addressTo}</td>
                              </tr>
                              <tr>
                                <td>Value:</td>
                                <td>{value} FTM</td>
                              </tr>
                              <tr>
                                <td>Gas used:</td>
                                <td>{gasUsed}</td>
                              </tr>
                              <tr>
                                <td>Cumulative Gas used:</td>
                                <td>{cumulativeGasUsed}</td>
                              </tr>
                              <tr>
                                <td>Contract Address:</td>
                                <td>{contractAddress}</td>
                              </tr>
                              <tr>
                                <td>Root:</td>
                                <td>{root}</td>
                              </tr>
                              <tr>
                                <td>Input Data:</td>
                                <td>
                                  {/* {inputData} */}
                                  <textarea className="txn-inputdata">
                                    {inputData}
                                  </textarea>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Col>
          // </Row>
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
