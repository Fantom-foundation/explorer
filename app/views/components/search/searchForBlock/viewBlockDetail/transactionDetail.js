import React, { Component } from 'react';
import { Col, Table } from 'reactstrap';
import Web3 from 'web3';

/**
 * TransactionDetail :  A component meant for displaying details of Transaction.
 */
/* eslint-disable */
class TransactionDetail extends Component {
  renderDetail = () => {
    const { transactions } = this.props;
    let transaction_hash = '';
    let block_id = '';
    let address_from = '';
    let address_to = '';
    let value = '';

    let gasUsed = '';

    if (transactions && transactions.length) {
      let data = transactions.map((txData, index) => {
        transaction_hash = txData.transaction_hash || '--';
        block_id = txData.block_id + '' || '--';
        address_from = txData.address_from || '--';
        address_to = txData.address_to || '--';
        value = txData.value + '' || '--';
        if (value !== '--') {
          value = Web3.utils.fromWei(`${value}`, 'ether');
          value = Number(value).toFixed(4);
        }
        gasUsed = txData.gasUsed + '' || '--';

        return (
          <tr key={index}>
            {<td className="text-white">{transaction_hash}</td>}
            {<td className="text-white">{block_id}</td>}
            {<td className="text-white">{address_from}</td>}
            {<td className="text-white">{address_to}</td>}
            {<td className="text-white">{value} FTM</td>}
            {<td className="text-white">{gasUsed}</td>}
          </tr>
        );
      });
      return data;
    }
    return null;
  };
  render() {
    return (
      <Col>
        <Table className="transactions-table">
          <thead className="dark">
            <tr>
              {<th>txHash</th>}
              {<th>Block</th>}
              {<th>From</th>}
              {<th>To</th>}
              {<th>Value</th>}
              {<th>gasUsed</th>}
            </tr>
          </thead>
          <tbody className="scroll-theme-1">{this.renderDetail()}</tbody>
        </Table>
      </Col>
    );
  }
}

export default TransactionDetail;
