// @flow

import * as React from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import TimeAgo from 'react-timeago'

function TransactionsPageData() {
    const [transactions, setTransactions] = React.useState([]);
    const [Totaltransactions, setTotaltransactions] = React.useState(0);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'http://18.222.120.223:3100/api/v1/get-transactions?count=10&order=-1',
        })
            .then(function (response) {
                console.log(response.data.data.transactions);
                setTransactions(response.data.data.transactions);
                setTotaltransactions(response.data.data.total);
            });
    }, [setTransactions, setTotaltransactions]);



    return (

        <div>
            <div className="transaction-wrapper">
                <div className="d-flex">
                    <div className="title-section">
                        <h2>Transactions</h2>
                        <span>More than {Totaltransactions} transactions found</span>
                    </div>
                </div>
                <Row>
                    <Col>
                        <table className="data-tables">
                            <thead>
                                <tr>
                                    <th>Tx Hash</th>
                                    <th>Block</th>
                                    <th>Age</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Amount</th>
                                    <th>fees</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transactions => {
                                    const {
                                        blockHash,
                                        blockNumber,
                                        timestamp,
                                        from,
                                        to,
                                        value,
                                        hash,
                                        fee
                                    } = transactions;
                                    let d = new Date(timestamp * 1000);
                                    let precision = 18;
                                    let result = 10 ** precision;
                                    let amount = value / result;
                                    let FTMamount = amount.toFixed(18);
                                    let fees = fee / result;
                                    let Feeamount = fees.toFixed(18);
                                    if (amount == Math.floor(amount)) {
                                        FTMamount = amount.toFixed(2);
                                    } else {

                                        FTMamount = amount.toFixed(18);
                                    }
                                    if (fees == Math.floor(fees)) {
                                        Feeamount = fees.toFixed(2);
                                    } else {

                                        Feeamount = fees.toFixed(18);
                                    }
                                      let url = "/transactions/:" + hash
                                      //console.log(url);
                                    return (
                                        <tr key={blockHash}>
                                            <td><a className="text-ellipse" href={url}>{hash}</a></td>
                                            <td><a href={url}>{blockNumber}</a></td>
                                            <td>
                                                <TimeAgo date={d} /></td>
                                            <td><a className="text-ellipse" href={url}>{from}</a></td>
                                            <td> <a className="text-ellipse" href={url}>{to}</a> </td>
                                            <td>{FTMamount} FTM</td>
                                            <td>{Feeamount} FTM</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default TransactionsPageData;
