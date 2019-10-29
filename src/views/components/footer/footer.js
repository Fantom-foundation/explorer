import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import GithubIcon from 'src/assets/images/social/github.svg';
import TelegramIcon from 'src/assets/images/social/telegram.svg';
import FacebookIcon from 'src/assets/images/social/facebook.svg';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container className="footer-container">
          <hr />
          <Row className="menus">
            <Col md={3}  lg={4}  className="bordred">
              <div className="fields">
                <h2 className="text-uppercase">Support</h2>
                <a href="mailto:contact@fantom.foundation">
                  contact@fantom.foundation
                </a>
              </div>
            </Col>
            <Col md={5} lg={5}  className="bordred">
              <div className="fields">
                <h2 className="text-uppercase">Channel</h2>
                <div className="social">
                  <a href="https://github.com/Fantom-foundation" target="_black">
                    <img src={GithubIcon} />
                    Github
                  </a>
                  <a href="https://www.facebook.com/Fantom.Foundation.English/" target="_black">
                    <img src={FacebookIcon} />
                    Facebook
                  </a>
                  <a href="https://t.me/Fantom_English" target="_black">
                    <img src={TelegramIcon} />
                    Telegram
                  </a>
                </div>
              </div>
            </Col>
            <Col md={4}  lg={3} className="page-menus">
            <h2 className="text-uppercase">&nbsp;</h2>
            <ul className="">
              <li><a href="https://fantom.foundation/" target="_black">About</a></li>
              <li><a href="https://fantom.foundation/" target="_black">Term of services</a></li>
            </ul>
            </Col>
          </Row>
          <Row className="copyright">
            <Col>
              <span >
                Copyright © 2018 FANTOM. All Rights Reserved.
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
