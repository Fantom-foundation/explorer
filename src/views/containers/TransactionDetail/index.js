// @flow

import * as React from 'react';
import Web3 from 'web3';
import { Button, Col, Container, Row } from 'reactstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';

import TransactionBlockHeader from 'src/views/components/header/tranactionBlockHeader';

import Loader from 'src/views/components/Loader';
import Web3Provider from 'src/utils/DataProvider/web3Provider';
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import copyIcon from 'src/assets/images/icons/copy.svg';
import checkIcon from 'src/assets/images/icons/check.svg';
import arrowIcon from 'src/assets/images/icons/arrow.svg';
import crossIcon from 'src/assets/images/icons/failed.svg';

import type { DetailTransaction } from 'src/utils/types';

function TransactionDetail() {
    const [error, setError] = React.useState('');
    const [transaction, setTransaction] = React.useState<?DetailTransaction>();
    const history = useHistory();
    const onShowList = React.useCallback(() => {
        history.push({
            pathname: '/transactions',
        });
    }, [history]);
    let [showDetails, setShowDetails] = React.useState(false);
    const match = useRouteMatch('/transactions/:txHash');
    const { params: { txHash } } = match;

    if (!txHash) {
        onShowList();
    }
    React.useEffect(() => {
        async function fetchData() {
            const provider = new Web3Provider();
            const response = await provider.getTransaction(txHash);

            if (response.error) {
                setError(response.error.message);
            } else {
                const { transactionData: [transaction] } = response;
                setTransaction({
                    ...transaction,
                    value: Web3.utils.fromWei(transaction.value),
                });
            }
        }

        fetchData();
    }, [txHash]);

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
                                <div class="first-section">
                                    <Row>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Transaction hash:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                0x0960aa9d893f88bedefd285ae12f6aadbdab2da75081e034be47ffd2586251cf
                                            </span>
                                            <img alt="Search" src={copyIcon} className="icon" />
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Status:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="success-btn message-btn">
                                                <img alt="Search" src={checkIcon} className="icon-success" /> Success
                                            </span>
                                            <span className="failed-btn message-btn">
                                                <img alt="Search" src={crossIcon} className="icon-success" /> Success
                                            </span>
                                            <span className="gray-btn-bg message-btn">
                                                 Pending
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Sender:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data blue">
                                                0x888888d60516b674e1c65730eb496eefc2e2e366
                                            </span>
                                            <img alt="Search" src={copyIcon} className="icon" />
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Recipient:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data blue">
                                                0xd8f983d903bad3df5a3b641683cc63ce785cc714
                                            </span>
                                            <img alt="Search" src={copyIcon} className="icon" />
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Amount:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                54,345 FTM <small>($1234.48)</small>
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Transaction fee:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                0.1 FTM<small> ($0.0001)</small>
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Timestamp:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                3 hrs 48 mins ago <small>(Nov-29-2019 05:42:16 PM +UTC)</small>
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Confirmations:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                1945
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Block:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data blue">
                                                120,460
                                            </span>
                                        </Col>
                                        {showDetails ===false ? (
                                        <Col className="col-12 col-sm-12">
                                            <button className="arrow-down blue" onClick={() => setShowDetails(true)}>More Info  <img alt="Search" src={arrowIcon} className="icon-success" /> </button>
                                        </Col>
                                        ):""}
                                        {showDetails ? (
                                            <div className="row hidden-div">
                                                <Col className="col-12 col-sm-3">
                                                    <span>
                                                        Gas limit:
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-9">
                                                    <span className="column-data ">
                                                        21,000
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-3">
                                                    <span>
                                                        Gas used by transaction:
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-9">
                                                    <span className="column-data ">
                                                        21,000 (100%)
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-3">
                                                    <span>
                                                        Gas price:
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-9">
                                                    <span className="column-data ">
                                                        0.00000001 FTM
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-3">
                                                    <span> Nonce
                                                 <span className="message-btn gray-btn">position</span>
                                                    </span>
                                                </Col>
                                                <Col className="col-12 col-sm-9">
                                                    <span className="column-data ">
                                                        2345657
                                                <span className="message-btn gray-btn">32</span>
                                                    </span>
                                                </Col>
                                                <Col className="col-12 col-sm-3">
                                                    <span> Input data:
                                            </span>
                                                </Col>
                                                <Col className="col-12 col-sm-9">
                                                    <input type="text" readOnly className="input-wrapper" />
                                                </Col>
                                            </div>
                                        )
                                            : ""
                                        }
                                        {showDetails ===true ? (
                                        <Col className="col-12 col-sm-12">
                                            <button className="arrow-down arrow-up blue" onClick={() => setShowDetails(false)}>Less Info  <img alt="Search" src={arrowIcon} className="icon-success" /> </button>
                                        </Col>
                                        ):""}
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
