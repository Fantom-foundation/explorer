// @flow

import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import SearchBar from 'src/views/components/SearchBar';

function SearchBlock() {
    return (
        <div>
            <Container>
                <Row className="text-center">
                    <Col md={12} lg={12} className="home-wrapper-inner">
                        <h2>
                        Fantom Explorer
                        </h2>
                        <SearchBar placeHolder="Search by addresses, transactions, blocks, tokens" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchBlock;
