// @flow
import { withRouter } from 'react-router-dom'; 
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Search from "./search";
import Navigation from './nav/navigation';
import {  Route } from 'react-router-dom';

const Header = ({location}) => (
    <header>
        <Container  className="header-container">
            <Row>
                <Col className="d-flex align-items-center">
                    <Navigation />
                    <Route path="/(blocks|transactions|block|resources|validators)" component={Search} />
                </Col>
            </Row>
        </Container>
    </header>
);

export default Header;
