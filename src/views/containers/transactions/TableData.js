// @flow

import * as React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import TimeAgo from 'react-timeago';
import Loading from 'src/assets/images/icons/Loading.gif';
import {api_get_transactions} from 'src/utils/Utlity';

function TransactionsPageData() {
    const [transactions, setTransactions] = React.useState([]);
    const [Totaltransactions, setTotaltransactions] = React.useState(0);
    const [Loader, setLoader] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_transactions}?count=10&order=-1`,
        })
            .then(function (response) {
                console.log(response.data.data.transactions);
                setTransactions(response.data.data.transactions);
                setTotaltransactions(response.data.data.total);
                setLoader(true);
            });
    }, [setTransactions, setTotaltransactions]);



    return (

        <div>
            <div className="transaction-wrapper hide-mobile transactio-listing">
                <div className="d-flex">
                    <div className="title-section">
                        <h2>Transactions</h2>
                        <span>More than {Totaltransactions} transactions found</span>
                    </div>
                </div>
                <Row>
                    <Col>
                        {Loader ?
                            (
                                <div>
                                    <div className="table-responsive">
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
                                                    //console.log(url);
                                                    return (
                                                        <tr key={blockHash}>
                                                            <td><Link className="text-ellipse"  to={`/transactions/${hash}`}>{hash}</Link></td>
                                                            <td><Link to={`/transactions/${hash}`}>{blockNumber}</Link></td>
                                                            <td>
                                                                <TimeAgo date={d} /></td>
                                                            <td ><Link className="text-ellipse" to={`/transactions/${hash}`} >{from}</Link></td>
                                                            <td > <Link className="text-ellipse" to={`/transactions/${hash}`} >{to}</Link></td>
                                                            <td>{FTMamount} FTM</td>
                                                            <td>{Feeamount} FTM</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mobile-show">
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
                                            let dateString = new Date(d).toUTCString();
                                            dateString = dateString.split(' ').slice(0, 4).join(' ');
                                            let dates = ' ' + dateString
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
                                                <div className="row listing-row  mobile-data-row">
                                                    <div className="col-12">
                                                        {dates}
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="text-ellipse"><Link to={`/transactions/${hash}`}>{hash}</Link></div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="d-flex">
                                                            <span>From </span>
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <span className="text-ellipse"> {from}</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span>To</span>
                                                    </div>
                                                    <div className="col-8">
                                                        <span className="text-ellipse"> {to}</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span>Amount</span>
                                                    </div>
                                                    <div className="col-8">
                                                        <span > {FTMamount} FTM</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <span>Fees</span>
                                                    </div>
                                                    <div className="col-8">
                                                        <span >{Feeamount} FTM</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                            : (<div className="text-center loader-img"><img alt="Search" src={Loading} className="icon" /></div>)
                        }
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default TransactionsPageData;
