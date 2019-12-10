// @flow

import * as React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';

function ExplorerDetails() {
    return (
        <div>
            <Container>
                <Row className="text-center">
                    <Col md={12} lg={12} className="home-wrapper-details">
                        <ul className="block-details">
                            <li>
                                <label>Block Height</label>
                                <span>135,100,678</span>
                            </li>
                            <li>
                                <label>Block Time</label>
                                <span>0.97s</span>
                            </li>
                            <li>
                                <label>Active Validators</label>
                                <span>99</span>
                            </li>
                            <li>
                                <label>FTM Price</label>
                                <span>$0.24</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ExplorerDetails;
