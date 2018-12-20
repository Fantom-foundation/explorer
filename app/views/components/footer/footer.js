import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import GithubIcon from '../../../images/social/github.svg';
import TeleygramIcon from '../../../images/social/telegram.svg';
import FacebookIcon from '../../../images/social/facebook.svg';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container className="footer-container">
          <hr />
          <Row className="menus">
            <Col md={3}   className="bordred">
              <div className="fields">
                <h2 className="text-uppercase">Support</h2>
                <a href="mailto:contact@fantom.foundation">
                  contact@fantom.foundation
                </a>
              </div>
            </Col>
            <Col md={5}   className="bordred">
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
                    <img src={TeleygramIcon} />
                    Teleygram
                  </a>
                </div>
              </div>
            </Col>
            <Col md={4}  className="page-menus">
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
