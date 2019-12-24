// @flow

import * as React from 'react';
import axios from "axios";
import { Button, Col, Container, Row } from 'reactstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import separaterIcon from 'src/assets/images/icons/chevron.svg';
import copyIcon from 'src/assets/images/icons/copy.svg';
import checkIcon from 'src/assets/images/icons/check.svg';
import arrowIcon from 'src/assets/images/icons/arrow.svg';
import crossIcon from 'src/assets/images/icons/failed.svg';
import Loading from 'src/assets/images/icons/Loading.gif';
import type { DetailTransaction } from 'src/utils/types';
import { Link } from "react-router-dom";
import { api_get_singleTransaction } from 'src/utils/Utlity';
function TransactionDetail() {
    const match = useRouteMatch('/transactions/:txHash');
    const { params: { txHash } } = match;
    const [Loader, setLoader] = React.useState(false);
    const hash = txHash.replace(':', '');
    let [showDetails, setShowDetails] = React.useState(false);
    const [txhash, setHash] = React.useState(0);
    const [sender, setSender] = React.useState(0);
    const [recepient, setrecepient] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [transactionFee, setTransactionFee] = React.useState(0);
    const [Timestamp, setTimestamp] = React.useState(0);
    const [dates, setdates] = React.useState('');
    const [block, setBlock] = React.useState(0);
    const [gasLimit, setGasLimit] = React.useState(0);
    const [gasused, setGasUsed] = React.useState(0);
    const [gasPrice, setGasPrice] = React.useState(0);
    const [nonce, setNonce] = React.useState(0);
    const [status, setstatus] = React.useState(false);
    const [inputField, setinputField] = React.useState(false);
    const [senderCopied, setSenderCopied] = React.useState(false);
    const [receiverCopied, setReceiverCopied] = React.useState(false);
    const [txCopied, setTxCopied] = React.useState(false);
    const [Error, setError] = React.useState(false);
    const [ErrorMsg, setErrorMsg] = React.useState('');
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_singleTransaction}${hash}`,
        }).then(function (response) {
            //console.log(response.data.data.transaction);
            let dates = new Date(response.data.data.transaction.timestamp * 1000);
            let precision = 18;
            let result = 10 ** precision;
            let amount = response.data.data.transaction.value / result;
            let FTMamount = amount.toString();
            let fees = response.data.data.transaction.fee / result;
            let Feeamount = fees.toString();
            if (amount == Math.floor(amount)) {
                FTMamount = amount.toFixed(2);
            } else {

                FTMamount = amount.toString();
            }
            if (fees == Math.floor(fees)) {
                Feeamount = fees.toFixed(2);
            } else {

                Feeamount = fees.toString();
            }
            let gasPrice = response.data.data.transaction.gasPrice / result;
            let gasamount = fees.toString();
            if (gasPrice == Math.floor(fees)) {
                gasamount = gasPrice.toFixed(2);
            } else {

                gasamount = gasPrice.toString();
            }
            setHash(response.data.data.transaction.hash);
            setSender(response.data.data.transaction.from);
            setrecepient(response.data.data.transaction.to);
            setAmount(FTMamount);
            setBlock(response.data.data.transaction.blockNumber);
            setTransactionFee(Feeamount);
            setTimestamp(dates);
            setdates(' ' + dates);
            setGasLimit(response.data.data.transaction.gas);
            setGasUsed(response.data.data.transaction.gasUsed);
            setGasPrice(gasamount);
            setNonce(response.data.data.transaction.nonce);
            setstatus(response.data.data.transaction.status);
            setstatus(response.data.data.transaction.status);
            setinputField(response.data.data.transaction.input);
            setLoader(true);
        }).catch(function (error) {
            setLoader(true);
            setError(true);
            setErrorMsg(error.response.data.data.additional['0'].msg);
        });
    },[]);
    function fntxCopied() {
        setReceiverCopied(false)
        setSenderCopied(false)
        setTxCopied(true)
        setTimeout(() => {
            setReceiverCopied(false)
            setSenderCopied(false)
            setTxCopied(false)
        }, 2000);
    }
    function fnsenderCopied() {
        setSenderCopied(true)
        setReceiverCopied(false)
        setTxCopied(false)
        setTimeout(() => {
            setReceiverCopied(false)
            setSenderCopied(false)
            setTxCopied(false)
        }, 2000);
    }
    function fnreceiverCopied() {
        setReceiverCopied(true)
        setSenderCopied(false)
        setTxCopied(false);
        setTimeout(() => {
            setReceiverCopied(false)
            setSenderCopied(false)
            setTxCopied(false)
        }, 2000);
    }
    return (
        <section className="bg-theme full-height-conatainer">

            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><Link to={`/`}>Home</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li><Link to="/transactions">Transactions</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li className="active">Transaction detail</li>
                    </ul>
                </Container>
            </div>
            <Container>
                <div className="transaction-wrapper-details transaction-wrapper">
                    <div className="d-flex">
                        <div className="title-section">
                            <h2>Transaction Detail</h2>
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
                                : Loader ?
                                    (
                                        <div>
                                            <div className="details-wrapper">
                                                <div className="first-section">
                                                    <Row>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Transaction hash:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data">
                                                                {txhash}
                                                            </span>
                                                            {txCopied ? (<span style={{ color: '#777' }}>  <i class="far fa-check-circle" aria-hidden="true"></i>  Copied.</span>) : <CopyToClipboard
                                                                text={txhash}
                                                                onCopy={fntxCopied}
                                                            ><img alt="Search" src={copyIcon} className="icon copied-icon" />
                                                            </CopyToClipboard>}
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Status:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            {status === true ?

                                                                <span className="success-btn message-btn">
                                                                    <img alt="Search" src={checkIcon} className="icon-success " /> Success
                                            </span>
                                                                :
                                                                <span className="failed-btn message-btn">
                                                                    <img alt="Search" src={crossIcon} className="icon-success" /> Success
                                            </span>
                                                            }
                                                            {/*<span className="gray-btn-bg message-btn">
                                                Pending
                                            </span>*/ }
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Sender:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data blue">
                                                                <Link to={`/address/${sender}`} >  {sender}</Link>
                                                            </span>

                                                            {senderCopied ? <span style={{ color: '#777' }}> <i class="far fa-check-circle" aria-hidden="true"></i> Copied.</span> : <CopyToClipboard
                                                                text={sender}
                                                                onCopy={fnsenderCopied}
                                                            >
                                                                <img alt="Search" src={copyIcon} className="icon copied-icon" />
                                                            </CopyToClipboard>}
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Recipient:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data blue">
                                                                <Link to={`/address/${sender}`} >  {recepient}</Link>

                                                            </span>

                                                            {receiverCopied ? <span style={{ color: '#777' }}> <i class="far fa-check-circle" aria-hidden="true"></i> Copied.</span> : <CopyToClipboard
                                                                text={recepient}
                                                                onCopy={fnreceiverCopied}
                                                            >
                                                                <img alt="Search" src={copyIcon} className="icon copied-icon" />
                                                            </CopyToClipboard>}
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Amount:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data">
                                                                {amount} FTM
                                            </span>
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Transaction fee:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data">
                                                                {transactionFee} FTM
                                            </span>
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Timestamp:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data">
                                                                <TimeAgo date={Timestamp} /> ({dates})
                                                        </span>
                                                        </Col>
                                                        <Col className="col-4 col-sm-3">
                                                            <span>
                                                                Block:
                                            </span>
                                                        </Col>
                                                        <Col className="col-8 col-sm-9">
                                                            <span className="column-data blue">
                                                                <Link to={`/blocks/${block}`}>{block}</Link>
                                                            </span>
                                                        </Col>
                                                        {showDetails === false ? (
                                                            <Col className="col-12 col-sm-12">
                                                                <button className="arrow-down blue" onClick={() => setShowDetails(true)}>More Info  <img alt="Search" src={arrowIcon} className="icon-success" /> </button>
                                                            </Col>
                                                        ) : ""}
                                                        {showDetails ? (
                                                            <div className="row hidden-div">
                                                                <Col className="col-4 col-sm-3">
                                                                    <span>
                                                                        Gas limit:
                                            </span>
                                                                </Col>
                                                                <Col className="col-8 col-sm-9">
                                                                    <span className="column-data ">
                                                                        {gasLimit}
                                                                    </span>
                                                                </Col>
                                                                <Col className="col-4 col-sm-3">
                                                                    <span>
                                                                        Gas used by transaction:
                                            </span>
                                                                </Col>
                                                                <Col className="col-8 col-sm-9">
                                                                    <span className="column-data ">
                                                                        {gasused}
                                                                    </span>
                                                                </Col>
                                                                <Col className="col-4 col-sm-3">
                                                                    <span>
                                                                        Gas price:
                                            </span>
                                                                </Col>
                                                                <Col className="col-8 col-sm-9">
                                                                    <span className="column-data ">
                                                                        {gasPrice} FTM
                                            </span>
                                                                </Col>
                                                                <Col className="col-4 col-sm-3">
                                                                    <span> Nonce:
                                                                    </span>
                                                                </Col>
                                                                <Col className="col-8 col-sm-9">
                                                                    <span className="column-data ">
                                                                        {nonce}

                                                                    </span>
                                                                </Col>
                                                                <Col className="col-4 col-sm-3">
                                                                    <span> Input data:
                                            </span>
                                                                </Col>
                                                                <Col className="col-8 col-sm-9">
                                                                    <textArea readOnly className="input-wrapper"> {inputField}</textArea>
                                                                </Col>
                                                            </div>
                                                        )
                                                            : ""
                                                        }
                                                        {showDetails === true ? (
                                                            <Col className="col-12 col-sm-12">
                                                                <button className="arrow-down arrow-up blue" onClick={() => setShowDetails(false)}>Less Info  <img alt="Search" src={arrowIcon} className="icon-success" /> </button>
                                                            </Col>
                                                        ) : ""}
                                                    </Row>
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
        </section>
    );
}

export default TransactionDetail;
