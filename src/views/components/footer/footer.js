// @flow

import React from "react";
import { Container, Row, Col } from "reactstrap";

import GithubIcon from "src/assets/images/social/github.svg";
import TelegramIcon from "src/assets/images/social/telegram.svg";
import FacebookIcon from "src/assets/images/social/facebook.svg";

const Footer = () => (
  <footer id="footer">
    <Container>
      <Row>
        <Col>
          <div className="wrapper">
            <p className="mb-0 copyright">
              ©2019 Fantom Foundation. All rights reserved
            </p>
            <div className="social">
              <a href="https://t.me/Fantom_English" target="_black">
                <i className="fab fa-telegram-plane"></i>
              </a>
              <a href="https://twitter.com" target="_black">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.github.com/" target="_black">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
