// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import GithubIcon from 'src/assets/images/social/github.svg';
import TelegramIcon from 'src/assets/images/social/telegram.svg';
import TwitterIcon from 'src/assets/images/social/twitter.svg';

const Footer = () => (
    <footer>
        <Container  className="footer-container">
            <Row className="menus justify-content-between align-items-center">
                <Col md={5} lg={5} className="bordred">
                    <span >
                    ©2019 Fantom Foundation. All rights reserved.
              </span>
                </Col>
                <Col md={5} lg={5} className="bordred">
                    <div className="fields">
                        <div className="social">
                            <a href="https://t.me/Fantom_English" target="_black">
                                <img alt="Telegram" src={TelegramIcon} />
                            </a>
                            <a href="https://twitter.com/FantomFDN/" target="_black">
                                <img alt="Facebook" src={TwitterIcon} />
                            </a>
                            <a href="https://github.com/Fantom-foundation" target="_black">
                                <img alt="Github" src={GithubIcon} />
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
);

export default Footer;
