// @flow
import * as React from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import TimeAgo from 'react-timeago';
import Loading from 'src/assets/images/icons/Loading.gif';
import first from 'src/assets/images/icons/gotoendbutton.svg';
import last from 'src/assets/images/icons/gotoendbutton.svg';
import prev from 'src/assets/images/icons/back-button-active.svg';
import next from 'src/assets/images/icons/forward-button.svg';
import { api_get_block } from 'src/utils/Utlity';
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import { connectSocketConnection, disconnectSocket } from '../../../utils/socketProvider';

function TableData() {
    const [Loader, setLoader] = React.useState(false);
    const [Blocks, setBlocks] = React.useState([]);
    const [TotalBlocks, setTotalBlocks] = React.useState(0);
    const [CurrentPage, setCurrentPage] = React.useState(0);
    const [paginationCount, setpaginationCount] = React.useState(1);
    const [paginationCountTotals, setpaginationCountTotals] = React.useState(1);
    const [CurrentPages, setCurrentPages] = React.useState(1);
    const [Error, setError] = React.useState(false);
    const [ErrorMsg, setErrorMsg] = React.useState('');
    const [FirstBlocks, setFirstBlocks] = React.useState(0);
    const [LastBlocks, setLastBlocks] = React.useState(0);

    /** Fetch Data using Socket.io  */
    React.useEffect(() => {
        connectSocketConnection().then((socketClient) => {
            socketClient.on('message', (data) => {
                const eventData = JSON.parse(data);
                if (eventData.event === 'newBlock') {
                   
                    setBlocks(prevBlocks => {
                        let newBlocks = JSON.parse(JSON.stringify(prevBlocks));
                        newBlocks.pop();
                        newBlocks.unshift(eventData.block);
                        return newBlocks;
                    });
                    setTotalBlocks(previousCount => previousCount + 1);
                    setFirstBlocks(prevNum => prevNum + 1);
                    setLastBlocks(prevNum => prevNum + 1);
                    setpaginationCount(prevCount => {
                        let newTotal = prevCount + 1;
                        let paginationTotals = newTotal / 20;
                        if (paginationTotals % 1 != 0) {
                            paginationTotals = Math.floor(paginationTotals) + 1;
                        }
                        setpaginationCountTotals(Math.floor(paginationTotals + 1));
                        return newTotal;
                    });
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
            url: `${api_get_block}?count=20&order=-1&offset=${CurrentPage}`,
        })
            .then(function (response) {
                console.log(response.data.data.blocks);
                setBlocks(response.data.data.blocks);
                setTotalBlocks(response.data.data.maxBlockHeight);
                setFirstBlocks(response.data.data.blocks['0'].number);
                setLastBlocks(response.data.data.blocks['19'].number);
                setLoader(true);
                let total = response.data.data.maxBlockHeight;
                let paginationTotal = total - 20;
                setpaginationCount(Math.floor(paginationTotal));
                let paginationTotals = total / 20;
                if (paginationTotals % 1 != 0) {
                    paginationTotals = Math.floor(paginationTotals) + 1;
                }

                setpaginationCountTotals(Math.floor(paginationTotals));
                setError(false);
            })
            .catch(function (error) {
                // console.log(error.message);
                setLoader(true);
                setError(true);
                setErrorMsg(error.response.data.data.additional['0'].msg);
            });
    }, [CurrentPage]);
    function lastPage() {
        setLoader(false);
        if (paginationCountTotals != 1) {
            setCurrentPage(TotalBlocks - 19);
        } else {
            setCurrentPage(TotalBlocks - 19);
        }

        setCurrentPages(paginationCountTotals);
    }
    function firstPage() {
        setLoader(false);
        setCurrentPage(1);
        setCurrentPages(1);
    }
    function prevPage() {
        setLoader(false);
        setCurrentPage(CurrentPage - 19);
        setCurrentPages(CurrentPages - 1);
    }
    function nextPage() {
        console.log("next page");
        setBlocks([]);
        setLoader(false);
        setCurrentPage(CurrentPage + 19);
        setCurrentPages(CurrentPages + 1);
    }
    return (
        <div>
            <Container>
                <div className="transaction-wrapper hide-mobile">
                    <div className="d-flex justify-content-between">
                        <div className="title-section">
                            <h2>Blocks</h2>
                            <span>Block #{LastBlocks} to #{FirstBlocks}  (Total of {TotalBlocks} blocks)</span>
                        </div>
                        <div className="pagination-section">
                            <ul className="d-flex">
                                {CurrentPages === 1 ? <li><img alt="Search" src={first} className="icon disabled" /></li>
                                    : <li><img alt="Search" onClick={firstPage} src={first} className="icon" /></li>
                                }
                                {CurrentPages === 1 ? <li><img alt="Search" src={prev} className="icon disabled" /></li>
                                    : <li><img alt="Search" onClick={prevPage} src={prev} className="icon" /></li>
                                }

                                <li><div className="pages">{CurrentPages} of {paginationCountTotals}</div></li>
                                {CurrentPages === (paginationCountTotals) ? <li><img alt="Search" src={next} className="icon disabled" /></li>
                                    : <li><img alt="Search" onClick={nextPage} src={next} className="icon" /></li>
                                }
                                {CurrentPages === (paginationCountTotals) ? <li><img alt="Search" src={last} className="icon disabled" /></li>
                                    : <li><img alt="Search" onClick={lastPage} src={last} className="icon" /></li>
                                }

                            </ul>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            {Error ? (
                                <div>
                                    <div className="alert alert-primary">
                                        Error! {ErrorMsg}
                                    </div>
                                </div>
                            )
                                :
                                Loader ?
                                    (
                                        <div>
                                            <div className="table-responsive">
                                                <table className="data-tables">
                                                    <thead>
                                                        <tr>

                                                            <th>Block</th>
                                                            <th>Time</th>
                                                            <th>Age</th>
                                                            <th>Txns</th>
                                                            {/* <th>Fees</th> */}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Blocks.map(Block => {
                                                            const {
                                                                number,
                                                                timestamp,
                                                                transactions,
                                                                hash
                                                            } = Block;

                                                            let d = new Date(timestamp * 1000);
                                                            let precision = 18;
                                                            let dateString = new Date(d).toUTCString();
                                                            dateString = dateString.split(' ').slice(0, 4).join(' ');
                                                            let dates = ' ' + d
                                                            //console.log(url);
                                                            return transactions > 0 ?
                                                                <tr key={timestamp + number + hash}>
                                                                    <td> <Link to={`/blocks/${number}`}>{number}</Link></td>
                                                                    <td>{dateString}</td>
                                                                    <td><TimeAgo date={d} /></td>
                                                                    <td> <Link to={`/blocks-tranasctions/${number}`}>{transactions}</Link></td>
                                                                    {/* <td>0.0000001 FTM</td> */}
                                                                </tr>
                                                                :
                                                                <tr key={timestamp + number + hash}>
                                                                    <td> <Link to={`/blocks/${number}`}>{number}</Link></td>
                                                                    <td>{dateString}</td>
                                                                    <td><TimeAgo date={d} /></td>
                                                                    <td> {transactions}</td>
                                                                    {/* <td>0.0000001 FTM</td> */}
                                                                </tr>
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="mobile-show">
                                                {Blocks.map(Block => {
                                                    const {
                                                        number,
                                                        timestamp,
                                                        transactions,
                                                        hash
                                                    } = Block;

                                                    let d = new Date(timestamp * 1000);
                                                    let precision = 18;
                                                    let dateString = new Date(d).toUTCString();
                                                    dateString = dateString.split(' ').slice(0, 4).join(' ');
                                                    let dates = ' ' + d;
                                                    return  transactions > 0 ?
                                                        <div className="row mobile-data-row" key={timestamp + number}>
                                                            <div className="col-4">
                                                                <span> Block</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    <Link to={`/blocks/${number}`}>{number}</Link>
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span>  Time</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    {dateString}
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span>Age</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    <TimeAgo date={d} />
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span>Txns</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                <Link to={`/blocks-tranasctions/${number}`}>{transactions}</Link>
                                                                </span>
                                                            </div>
                                                            {/* <div className="col-4">
                                                                <span> Fees</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    0.0000001 FTM
                                                        </span>
                                                            </div> */}
                                                        </div>
                                                    : 
                                                    <div className="row mobile-data-row" key={timestamp + number}>
                                                            <div className="col-4">
                                                                <span> Block</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    <Link to={`/blocks/${number}`}>{number}</Link>
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span>  Time</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    {dateString}
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span>Age</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    <TimeAgo date={d} />
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span>Txns</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    {transactions}
                                                                </span>
                                                            </div>
                                                            <div className="col-4">
                                                                <span> Fees</span>
                                                            </div>
                                                            <div className="col-8">
                                                                <span>
                                                                    0.0000001 FTM
                                                        </span>
                                                            </div>
                                                        </div>
                                                })}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <div className="pagination-section">
                                                    <ul className="d-flex">
                                                        {CurrentPages === 1 ? <li><img alt="Search" src={first} className="icon disabled" /></li>
                                                            : <li><img alt="Search" onClick={firstPage} src={first} className="icon" /></li>
                                                        }
                                                        {CurrentPages === 1 ? <li><img alt="Search" src={prev} className="icon disabled" /></li>
                                                            : <li><img alt="Search" onClick={prevPage} src={prev} className="icon" /></li>
                                                        }

                                                        <li><div className="pages">{CurrentPages} of {paginationCountTotals}</div></li>
                                                        {CurrentPages === (paginationCountTotals) ? <li><img alt="Search" src={next} className="icon disabled" /></li>
                                                            : <li><img alt="Search" onClick={nextPage} src={next} className="icon" /></li>
                                                        }
                                                        {CurrentPages === (paginationCountTotals) ? <li><img alt="Search" src={last} className="icon disabled" /></li>
                                                            : <li><img alt="Search" onClick={lastPage} src={last} className="icon" /></li>
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                    : (<div className="text-center loader-img"><img alt="Search" src={Loading} className="icon" /></div>)
                            }

                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default TableData;
