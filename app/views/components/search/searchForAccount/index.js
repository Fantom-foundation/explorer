import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { Title } from '../../coreComponent/index';
/**
 * SearchForAccount :  A component meant for searching details of particuler account , on entering public key in search field.
 */

class SearchForAccount extends Component {
  render() {
    const { accountDetail, isOpen, toggle } = this.props;
    let balance = '';
    const etherVal = '';
    const blockVal = '';
    const uncleVal = '';
    const transactionCount = '';
    const tokenVal = '';
    let nonce = '';

    if (accountDetail && accountDetail.length) {
      balance = accountDetail[0].balance;
      nonce = accountDetail[0].nonce;
    }

    return (
      <div className="address-details">
        <Row>
          <Col>
            <Title h2>OverView | <span className="gray">Fantom</span></Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <tbody>
                {balance !== '' && <tr>
                  <td>Balance:</td>
                  <td>{balance} FTM</td>
                </tr>}
                {nonce !== '' && <tr>
                  <td>Nonce:</td>
                  <td>{nonce}</td>
                </tr>}
                {etherVal !== '' && <tr>
                  <td>Ether Value:</td>
                  <td>{etherVal} (@ $278.19/Etd)</td>
                </tr>}
                {(blockVal !== '' || uncleVal !== '') && <tr>
                  <td>Mined:</td>
                  <td>{blockVal} blocks and {uncleVal} uncles</td>
                </tr>}
                { transactionCount !== '' && <tr>
                  <td>Transactions:</td>
                  <td>{transactionCount} txns</td>
                  </tr>}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchForAccount;
