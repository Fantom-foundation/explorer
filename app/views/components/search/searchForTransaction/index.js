import React, { Component } from 'react';
import { Col, Table, } from 'reactstrap';
/**
 * SearchForTransaction :  A component meant for searching details of particuler transaction , on entering valid transaction hash in search field.
 */

class SearchForTransaction extends Component {
    render() {
        const { transactions, } = this.props;
        let transaction_hash = '';
        let block_id = '';
        let address_from = '';

        let address_to = '';
        let value = '';
        let txFee = '';
        let createdAt = '';

        if (transactions && transactions.length) {
            transaction_hash = transactions[0].transaction_hash;
            block_id = transactions[0].Block_id;
            address_from = transactions[0].address_from;
            address_to = transactions[0].address_to;
            value = transactions[0].value;
            txFee = transactions[0].txFee;
            createdAt = transactions[0].createdAt;

        }

        return (
                <Col>
                    <Table className="transactions-table">
                        <thead className="dark">
                            <tr>
                                {transaction_hash !== '' && <th>txHash</th>}
                                {block_id !== '' && <th>Block</th>}
                                {createdAt !== '' && <th>Age</th>}
                                {address_from !== '' && <th>From</th>}
                                {address_to !== '' && <th>To</th>}
                                {value !== '' && <th>Value</th>}
                                {txFee !== '' && <th>[TxFee]</th>}
                            </tr>
                        </thead>
                        <tbody className="scroll-theme-1">
                            <tr>
                                {transaction_hash !== '' && <td className="text-black">
                                    {transaction_hash}
                                </td>}
                                {block_id !== '' && <td className="text-black">{block_id}</td>}
                                {createdAt !== '' && <td className="text-black">
                                    {moment(parseInt(createdAt, 10)).fromNow()}
                                </td>}
                                {address_from !== '' && <td className="text-black">{address_from}</td>}
                                {address_to !== '' && <td className="text-black">{address_to}</td>}
                                {value !== '' && <td className="text-black">{value}</td>}
                                {txFee !== '' && <td className="text-black">{txFee}</td>}
                            </tr>
                        </tbody>
                    </Table>
                </Col>
        )
    }
}

export default SearchForTransaction;