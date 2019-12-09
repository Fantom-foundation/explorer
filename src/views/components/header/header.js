// @flow

import React from 'react';
import { Col, Container, Row } from 'reactstrap';

import Navigation from './nav/navigation';

const Header = () => (
    <header>
        <Container fluid={true} className="header-container">
            <Row>
                <Col>
                    <Navigation />
                </Col>
            </Row>
        </Container>
    </header>
);

export default Header;
