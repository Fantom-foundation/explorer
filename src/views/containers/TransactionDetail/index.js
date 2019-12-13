// @flow

import * as React from 'react';
import axios from "axios";
import { Button, Col, Container, Row } from 'reactstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import copyIcon from 'src/assets/images/icons/copy.svg';
import checkIcon from 'src/assets/images/icons/check.svg';
import arrowIcon from 'src/assets/images/icons/arrow.svg';
import crossIcon from 'src/assets/images/icons/failed.svg';

import type { DetailTransaction } from 'src/utils/types';

function TransactionDetail() {

    
    const match = useRouteMatch('/transactions/:txHash');
    const { params: { txHash } } = match;


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
    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'http://18.222.120.223:3100/api/v1/get-transaction?transactionHash=' + hash,
        })
            .then(function (response) {
                console.log(response.data.data.transaction);
                let dates = new Date(response.data.data.transaction.timestamp * 1000);
                let precision = 18;
                let result = 10 ** precision;
                let amount = response.data.data.transaction.value / result;
                let FTMamount = amount.toFixed(18);
                let fees = response.data.data.transaction.fee / result;
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
                let gasPrice = response.data.data.transaction.gasPrice / result;
                let gasamount = fees.toFixed(18);
                if (gasPrice == Math.floor(fees)) {
                    gasamount = gasPrice.toFixed(2);
                } else {

                    gasamount = gasPrice.toFixed(18);
                }
                setHash(response.data.data.transaction.hash);
                setSender(response.data.data.transaction.from);
                setrecepient(response.data.data.transaction.to);
                setAmount(FTMamount);
                setBlock(response.data.data.transaction.blockNumber);
                setTransactionFee(Feeamount);
                setTimestamp(dates);
                setdates(' '+dates );
                setGasLimit(response.data.data.transaction.gas);
                setGasUsed(response.data.data.transaction.gasUsed);
                setGasPrice(gasamount);
                setNonce(response.data.data.transaction.nonce);
                setstatus(response.data.data.transaction.status);
                setstatus(response.data.data.transaction.status);
                setinputField(response.data.data.transaction.input);
            });
    },);
    return (
        <section className="bg-theme full-height-conatainer">

            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><a href="/">Home</a></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li><a href="/transactions">Transactions</a></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li className="active">Transaction detail</li>
                    </ul>
                </Container>
            </div>
            <Container>
                <div className="transaction-wrapper-details transaction-wrapper">
                    <div className="d-flex">
                        <div className="title-section">
                            <h2>Transactions</h2>
                        </div>
                    </div>
                    <Row>
                        <Col>
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
                                            <img alt="Search" src={copyIcon} className="icon" />
                                        </Col>
                                        <Col className="col-4 col-sm-3">
                                            <span>
                                                Status:
                                            </span>
                                        </Col>
                                        <Col className="col-8 col-sm-9">
                                            {status ===true ?
                                            
                                            <span className="success-btn message-btn">
                                                <img alt="Search" src={checkIcon} className="icon-success" /> Success
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
                                                {sender}
                                            </span>
                                            <img alt="Search" src={copyIcon} className="icon" />
                                        </Col>
                                        <Col className="col-4 col-sm-3">
                                            <span>
                                                Recipient:
                                            </span>
                                        </Col>
                                        <Col className="col-8 col-sm-9">
                                            <span className="column-data blue">
                                                {recepient}
                                            </span>
                                            <img alt="Search" src={copyIcon} className="icon" />
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
                                                 <TimeAgo date={Timestamp} /> <small>({dates})</small>
                                            </span>
                                        </Col>
                                        <Col className="col-4 col-sm-3">
                                            <span>
                                                Block:
                                            </span>
                                        </Col>
                                        <Col className="col-8 col-sm-9">
                                            <span className="column-data blue">
                                                {block}
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
                                                    <span> Nonce
                                                 <span className="message-btn gray-btn">position</span>
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
                                                    <input type="text" value={inputField} readOnly className="input-wrapper" />
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

                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
}

export default TransactionDetail;
