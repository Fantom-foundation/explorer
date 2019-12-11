// @flow

import * as React from 'react';
import { Container, Row, Button, Col } from 'reactstrap';
function BlockDetails() {
    return (
        <section className="block-details-wrapper">
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
                                                Block:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                120,460
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Timestamp:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                Timestamp: <small>
                                                    (Nov-29-2019 05:42:16 PM +UTC)
                                                </small>
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Transactions:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data ">
                                                1 transaction in this block
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                BlockHash:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data ">
                                                0xd8f983d903bad3df5a3b641683cc63ce785cc714
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                ParentHash:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data blue">
                                                0xd8f983d903bad3df5a3b641683cc63ce785cc714
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Validator node:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data blue">
                                                Fantom Validator
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-3">
                                            <span>
                                                Calculation Time:
                                            </span>
                                        </Col>
                                        <Col className="col-12 col-sm-9">
                                            <span className="column-data">
                                                Calculation Time:
                                            </span>
                                        </Col>
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

export default BlockDetails;
