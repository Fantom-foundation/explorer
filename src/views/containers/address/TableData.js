// @flow

import * as React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import TimeAgo from 'react-timeago';
import Loading from 'src/assets/images/icons/Loading.gif';
import { api_get_transactions } from 'src/utils/Utlity';
import first from 'src/assets/images/icons/gotoendbutton.svg';
import last from 'src/assets/images/icons/gotoendbutton.svg';
import prev from 'src/assets/images/icons/back-button-active.svg';
import next from 'src/assets/images/icons/forward-button.svg';

function TransactionsassetsPageData() {
    const [transactions, setTransactions] = React.useState([]);
    const [Totaltransactions, setTotaltransactions] = React.useState(0);
    const [Loader, setLoader] = React.useState(false);
    const [currentPage, setcurrentPage] = React.useState(0);
    const [paginationCount, setpaginationCount] = React.useState(1);
    const [paginationCountTotals, setpaginationCountTotals] = React.useState(1);
    const [currentPages, setcurrentPages] = React.useState(1);
    const [Error, setError] = React.useState(false);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_transactions}?count=10&order=-1&offset=${currentPage}`,
        })
            .then(function (response) {
                console.log(response.data.data.transactions);
                setTransactions(response.data.data.transactions);
                setTotaltransactions(response.data.data.total);
                let total = response.data.data.total;
                let paginationTotal = total - 10;
                setpaginationCount(Math.floor(paginationTotal));
                let paginationTotals = total / 10;
                if (paginationTotals % 1 != 0) {
                    paginationTotals = Math.floor(paginationTotals) + 1;
                }
                console.log(paginationCount);
                setpaginationCountTotals(Math.floor(paginationTotals));
                setLoader(true);
            }).catch(function (error) {
                console.log(error.message);
                setLoader(true);
                setError(true);
            });

    }, [setTransactions, setTotaltransactions, currentPage]);
    function lastPage() {
        setLoader(false);
        //console.log(paginationCount);
        if (paginationCountTotals != 1) {
            setcurrentPage(Totaltransactions - paginationCountTotals);
        } else {
            setcurrentPage(Totaltransactions - 9);
        }

        setcurrentPages(paginationCountTotals);
    }
    function firstPage() {
        setLoader(false);
        setcurrentPage(1);
        setcurrentPages(1);
    }
    function prevPage() {
        setLoader(false);
        setcurrentPage(currentPage - 9);
        setcurrentPages(currentPages - 1);
    }
    function nextPage() {
        setTransactions([]);
        setLoader(false);
        setcurrentPage(currentPage + 9);
        setcurrentPages(currentPages + 1);
    }


    return (

        <div className="row">
            <div className="transaction-wrapper hide-mobile transactio-listing col-12">
                <div className="d-flex justify-content-between">
                    <div className="title-section">
                        <span>{Totaltransactions} transactions found</span>
                    </div>
                    <div className="pagination-section">
                        <ul className="d-flex">
                            {currentPages === 1 ? <li><img alt="Search" src={first} className="icon disabled" /></li>
                                : <li><img alt="Search" onClick={firstPage} src={first} className="icon" /></li>
                            }
                            {currentPages === 1 ? <li><img alt="Search" src={prev} className="icon disabled" /></li>
                                : <li><img alt="Search" onClick={prevPage} src={prev} className="icon" /></li>
                            }

                            <li><div className="pages">{currentPages} of {paginationCountTotals}</div></li>
                            {currentPages === (paginationCountTotals) ? <li><img alt="Search" src={next} className="icon disabled" /></li>
                                : <li><img alt="Search" onClick={nextPage} src={next} className="icon" /></li>
                            }
                            {currentPages === (paginationCountTotals) ? <li><img alt="Search" src={last} className="icon disabled" /></li>
                                : <li><img alt="Search" onClick={lastPage} src={last} className="icon" /></li>
                            }

                        </ul>
                    </div>
                </div>
                <Row>

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
                                                        <td><Link className="text-ellipse" to={`/transactions/${hash}`}>{hash}</Link></td>
                                                        <td><Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link></td>
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
                                <div className="d-flex justify-content-end">
                                    <div className="pagination-section">
                                        <ul className="d-flex">
                                            {currentPages === 1 ? <li><img alt="Search" src={first} className="icon disabled" /></li>
                                                : <li><img alt="Search" onClick={firstPage} src={first} className="icon" /></li>
                                            }
                                            {currentPages === 1 ? <li><img alt="Search" src={prev} className="icon disabled" /></li>
                                                : <li><img alt="Search" onClick={prevPage} src={prev} className="icon" /></li>
                                            }

                                            <li><div className="pages">{currentPages} of {paginationCountTotals}</div></li>
                                            {currentPages === (paginationCountTotals) ? <li><img alt="Search" src={next} className="icon disabled" /></li>
                                                : <li><img alt="Search" onClick={nextPage} src={next} className="icon" /></li>
                                            }
                                            {currentPages === (paginationCountTotals) ? <li><img alt="Search" src={last} className="icon disabled" /></li>
                                                : <li><img alt="Search" onClick={lastPage} src={last} className="icon" /></li>
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                        : (<div className="text-center loader-img"><img alt="Search" src={Loading} className="icon" /></div>)
                    }

                </Row>
            </div>

        </div>
    );
}

export default TransactionsassetsPageData;
