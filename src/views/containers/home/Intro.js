// @flow

import React from 'react';
import { Container, Row } from 'reactstrap';

import { Title } from 'src/views/components/coreComponent';
import fantomIcon from 'src/assets/images/Logo/Fantom-Logo-icon.svg';

function Intro() {
    return (
        <section className="intro">
            <Container className="intro-container">
                <img
                    alt="Fantom icon"
                    src={fantomIcon}
                    className="icon"
                />
                <Row className="market-cap">
                    <div className="description">
                        <Title h2 className="text-white mb-0">
                            <span>Beyond</span>
                            <br />
                            <span>Blockchain</span>
                        </Title>
                        <p className="mb-0">The Future of Decentralized Ecosystem</p>
                    </div>
                </Row>
            </Container>
        </section>
    );
}

export default Intro;
