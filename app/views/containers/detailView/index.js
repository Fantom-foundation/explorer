import React from 'react';
import { Col, Table, Row, TabContent, TabPane } from 'reactstrap';
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
        <Col>
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
                              <td>{data.transaction_hash}</td>
                            </tr>
                            <tr>
                              <td>TxReceipt Status:</td>
                              <td>{txnStatus}</td>
                            </tr>
                            <tr>
                              <td>From:</td>
                              <td className="text-primary">
                                {data.address_from}
                              </td>
                            </tr>
                            <tr>
                              <td>To:</td>
                              <td>{data.address_to}</td>
                            </tr>
                            <tr>
                              <td>Value:</td>
                              <td>{data.value} FTM</td>
                            </tr>
                            <tr>
                              <td>Gas used:</td>
                              <td>{data.gasUsed}</td>
                            </tr>
                            <tr>
                              <td>Cumulative Gas used:</td>
                              <td>{data.cumulativeGasUsed}</td>
                            </tr>
                            <tr>
                              <td>Contract Address:</td>
                              <td>{data.contractAddress}</td>
                            </tr>
                            <tr>
                              <td>Root:</td>
                              <td>{data.root}</td>
                            </tr>
                            <tr>
                              <td>Input Data:</td>
                              <td>
                                <textarea className="txn-inputdata">
                                  {data.logsBloom}
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
      );
    } else if (type === 'block') {
      let transactionText = 'transactions';
      if (data.transactions.length <= 1) {
        transactionText = 'transaction';
      }

      return (
        <React.Fragment>
          <hr />
          <div className="tran-blk-details">
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
