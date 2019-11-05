// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import resources from 'src/assets/images/resources/resources.svg';
import documentIcon from 'src/assets/images/resources/document.svg';
import newsEvent from 'src/assets/images/resources/news-event.svg';
import wallet from 'src/assets/images/resources/wallet.svg';
import others from 'src/assets/images/resources/others.svg';


function Resources() {
    return (
        <Container className="text-white resources pb-5">
            <Row className="head">
                <Col style={{ backgroundImage: `url(${resources})` }}>
                    <h2>Resources</h2>
                    <p>Find out more about us</p>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col
                    className="resource-card exchange"
                    style={{ backgroundImage: `url(${documentIcon})` }}
                    md={6}
                    lg={4}
                >
                    <h2>Documentation</h2>
                    <p>Find out how Fantom works</p>
                    <ul>
                        <li
                            onClick={() =>
                                window.open('https://github.com/Fantom-foundation')
                            }
                        >
                            Github
                        </li>
                        <li
                            onClick={() =>
                                window.open(
                                    'https://github.com/Fantom-foundation/go-lachesis/wiki'
                                )
                            }
                        >
                            Wiki
                        </li>
                        <li
                            onClick={() =>
                                window.open('https://fantom.foundation/developers/')
                            }
                        >
                            Developers
                        </li>
                    </ul>
                </Col>
                <Col
                    className="resource-card wallet"
                    style={{ backgroundImage: `url(${wallet})` }}
                    md={6}
                    lg={4}
                >
                    <h2>Wallet</h2>
                    <p>Send and receive assets</p>
                    <ul>
                        <li
                            onClick={() =>
                                window.open('https://testflight.apple.com/join/8gR9WqWA')
                            }
                        >
                            Mobile
                        </li>
                        <li
                            onClick={() =>
                                window.open(
                                    'https://github.com/Fantom-foundation/desktop-wallet/releases'
                                )
                            }
                        >
                            Desktop
                        </li>
                        <li
                            onClick={() =>
                                window.open('https://wallet.fantom.foundation/')
                            }
                        >
                            Web
                        </li>
                    </ul>
                </Col>

                <Col
                    className="resource-card news-event"
                    style={{ backgroundImage: `url(${newsEvent})` }}
                    md={6}
                    lg={4}
                >
                    <h2>News And Events</h2>
                    <p>Stay up to date with the latest from Fantom.</p>
                    <ul>
                        <li
                            onClick={() =>
                                window.open('https://fantom.foundation/news-updates/')
                            }
                        >
                            News and Updates
                        </li>
                    </ul>
                </Col>
                <Col
                    className="resource-card others"
                    style={{ backgroundImage: `url(${others})` }}
                    md={6}
                    lg={4}
                >
                    <h2>Others</h2>
                    <p>Extra Resources</p>
                    <ul>
                        <li>
                            <a href="mailto:jobs@fantom.foundation">Jobs</a>
                        </li>
                        <li
                            onClick={() =>
                                window.open(
                                    'https://fantom.foundation/contents/data/2018files/10/Fantom_Paper_vRelease.pdf'
                                )
                            }
                        >
                            Lachesis
                        </li>
                        <li
                            onClick={() =>
                                window.open(
                                    'https://fantom.foundation/contents/data/2018files/10/TP_arXiv_v51.pdf'
                                )
                            }
                        >
                            Fantom Framework
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default Resources;
