// @flow

import * as React from 'react';
import { Col, Table } from 'reactstrap';
import Web3 from 'web3';

import { toFixed } from 'src/common/utility';

type TransactionDetailProps = {
    transactions: Array<{
        transaction_hash: string,
        block_id: number,
        address_from: string,
        address_to: string,
        value: string,
        gasUsed: string,
    }>,
};

/**
 * TransactionDetail :  A component meant for displaying details of Transactions.
 */

// TODO: split to two components

class TransactionDetail extends React.Component<TransactionDetailProps> {
    renderDetail = () => {
        const { transactions } = this.props;

        let transaction_hash = '';
        let block_id = '';
        let address_from = '';
        let address_to = '';
        let value = '';
        let gasUsed = '';

        if (transactions && transactions.length) {
            let data = transactions.map<React$Node>((txData, index) => {
                transaction_hash = txData.transaction_hash || '--';
                block_id = txData.block_id + '' || '--';
                address_from = txData.address_from || '--';
                address_to = txData.address_to || '--';
                value = txData.value + '' || '--';
                if (value !== '--') {
                    value = Web3.utils.fromWei(`${value}`, 'ether');
                    const valToNum = Number(value);
                    value = toFixed(valToNum, 4);
                }
                gasUsed = txData.gasUsed + '' || '--';

                return (
                    <tr key={index}>
                        <td
                            data-head="TxHash"
                            className="text-primary full head text-ellipsis"
                        >
                            <span className="icon icon-transaction">
                                {transaction_hash}
                            </span>
                        </td>
                        <td data-head="Block" className="text-primary half text-ellipsis">
                            {block_id}
                        </td>
                        <td data-head="From" className="text-primary half text-ellipsis">
                            {address_from}
                        </td>
                        <td data-head="To" className="text-primary half text-ellipsis">
                            {address_to}
                        </td>
                        <td data-head="Value" className="text-primary half text-ellipsis">
                            {value} FTM
                        </td>
                        <td
                            data-head="gasUsed"
                            className="text-primary half text-ellipsis"
                        >
                            {gasUsed}
                        </td>
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
                        {<th>TxHash</th>}
                        {<th>Block</th>}
                        {<th>From</th>}
                        {<th>To</th>}
                        {<th>Value</th>}
                        {<th>gasUsed</th>}
                    </tr>
                    </thead>
                    <tbody className="scroll-theme-1">
                        { this.renderDetail() }
                    </tbody>
                </Table>
            </Col>
        );
    }
}

export default TransactionDetail;
