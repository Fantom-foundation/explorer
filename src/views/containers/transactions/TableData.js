// @flow

import * as React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import TimeAgo from 'react-timeago';
import BigNumber from 'big-number'; 
import Loading from 'src/assets/images/icons/Loading.gif';
import { api_get_transactions } from 'src/utils/Utlity';
import first from 'src/assets/images/icons/gotoendbutton.svg';
import last from 'src/assets/images/icons/gotoendbutton.svg';
import prev from 'src/assets/images/icons/back-button-active.svg';
import next from 'src/assets/images/icons/forward-button.svg';
import { connectSocketConnection, disconnectSocket } from "../../../utils/socketProvider";

function TransactionsPageData() {
    const [transactions, setTransactions] = React.useState([]);
    const [Totaltransactions, setTotaltransactions] = React.useState(0);
    const [Loader, setLoader] = React.useState(false);
    const [currentPage, setcurrentPage] = React.useState(0);
    const [paginationCount, setpaginationCount] = React.useState(1);
    const [paginationCountTotals, setpaginationCountTotals] = React.useState(1);
    const [currentPages, setcurrentPages] = React.useState(1);
    const [Error, setError] = React.useState(false);
    const [paginationCountExtras, setPaginationCountExtras] = React.useState(0);
    /** Fetch Data using Socket.io  */
    React.useEffect(() => {
        connectSocketConnection().then((socketClient) => {
            socketClient.on('message', (data) => {
                const eventData = JSON.parse(data);
                if (eventData.event === 'newBlock') {
                    //console.log(eventData);
                    if (eventData.block.transactions > 0) {
                        setTransactions(prevTrans => {
                            let newTrans = JSON.parse(JSON.stringify(prevTrans));
                            if (eventData.lastTrxs.length > 0) {
                                eventData.lastTrxs.forEach((tx) => {
                                    newTrans.pop();
                                    newTrans.unshift(tx);
                                })
                            }
                            return newTrans;
                        });
                        setTotaltransactions(previousCount => previousCount + 1);
                        setpaginationCount(prevCount => {
                            let newTotal = prevCount + 1;
                            let paginationTotals = newTotal / 20;
                            let paginationExtras;
                            if (paginationTotals % 1 != 0) {
                                paginationExtras = parseFloat(paginationTotals % 1);
                                paginationTotals = Math.floor(paginationTotals) + 1;
                                //console.log(paginationExtras * 10);
                                setPaginationCountExtras(paginationExtras * 10);
                            }
                            setpaginationCountTotals(Math.floor(paginationTotals + 1));
                            return newTotal;
                        });
                    }
                }
            });
        });
        return () => {
            console.log("Will unmount");
            disconnectSocket()
        };
    }, []);

    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_transactions}?count=10&order=-1&offset=${currentPage}`,
        })
            .then(function (response) {
                //console.log(response.data.data.transactions);
                setTransactions(response.data.data.transactions);
                setTotaltransactions(response.data.data.total);
                let total = response.data.data.total;
                let paginationTotal = total - 10;
                setpaginationCount(Math.floor(paginationTotal));
                let paginationTotals = total / 10;
                let paginationExtras;
                if (paginationTotals % 1 != 0) {
                    paginationExtras = parseFloat(paginationTotals % 1);
                    paginationTotals = Math.floor(paginationTotals) + 1;
                    //console.log(paginationExtras * 10);
                    setPaginationCountExtras(paginationExtras * 10);
                }
                //console.log(paginationCount);
                setpaginationCountTotals(Math.floor(paginationTotals));
                setLoader(true);
            }).catch(function (error) {
               // console.log(error.message);
                setLoader(true);
                setError(true);
            });

    }, [setTransactions, setTotaltransactions, currentPage]);
    function lastPage() {
        setLoader(false);
        //console.log(paginationCountTotals);
        if (paginationCountExtras == 0) {
            setcurrentPage(Totaltransactions - 10);
        } else {
            setcurrentPage(Totaltransactions - paginationCountExtras);
        }

        setcurrentPages(paginationCountTotals);
    }
    function firstPage() {
        setLoader(false);
        setcurrentPage(0);
        setcurrentPages(1);
    }
    function prevPage() {
        setLoader(false);
        setcurrentPage(currentPage - 10);
        setcurrentPages(currentPages - 1);
    }
    function nextPage() {
        setTransactions([]);
        setLoader(false);
        setcurrentPage(currentPage + 10);
        setcurrentPages(currentPages + 1);
    }


    return (

        <div className="row">
            <div className="transaction-wrapper hide-mobile transactio-listing">
                <div className="d-flex justify-content-between">
                    <div className="title-section">
                        <h2>Transactions</h2>
                        <span>More than {Totaltransactions} transactions found</span>
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
                                                let FTMamount =  amount;
                                                
                                                let fees = fee / result;
                                                let Feeamount = fees.toString();
                                                let FTMamounts = parseFloat(FTMamount.toString());
                                                if (fees == Math.floor(fees)) {
                                                    Feeamount = fees.toFixed(2);
                                                } else {

                                                    Feeamount = fees.toString();
                                                }
                                                
                                                return (
                                                    <tr key={blockHash}>
                                                        <td><Link className="text-ellipse" to={`/transactions/${hash}`}>{hash}</Link></td>
                                                        <td><Link to={`/blocks/${blockNumber}`}>{blockNumber}</Link></td>
                                                        <td>
                                                            <TimeAgo date={d} /></td>
                                                        <td ><Link className="text-ellipse" to={`/address/${from}`} >{from}</Link></td>
                                                        <td > <Link className="text-ellipse" to={`/address/${to}`} >{to}</Link></td>
                                                        <td>{FTMamounts} FTM</td>
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
                                        let FTMamount =  parseFloat(amount.toString());
                                        let fees = fee / result;
                                        let Feeamount = fees.toString();
                                        if (amount == Math.floor(amount)) {
                                            //FTMamount = amount.toFixed(2);
                                        } else {

                                          //  FTMamount = amount.toString();
                                        }
                                        if (fees == Math.floor(fees)) {
                                            Feeamount = fees.toString();
                                        } else {

                                            Feeamount = fees.toString();
                                        }
                                        let url = "/transactions/:" + hash
                                        //console.log(url);
                                        return (
                                            <div key={blockHash} className="row listing-row  mobile-data-row">
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

export default TransactionsPageData;