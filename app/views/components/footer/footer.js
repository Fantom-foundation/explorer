import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import GithubIcon from '../../../images/social/github.svg';
import LinkedInIcon from '../../../images/social/linked-in.svg';
import SlackIcon from '../../../images/social/slack.svg';

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
            <Col md={5} lg={4}  className="bordred">
              <div className="fields">
                <h2 className="text-uppercase">Channel</h2>
                <div className="social">
                  <a href="https://github.com/Fantom-Foundation" target="_black">
                    <img src={GithubIcon} />
                    Github
                  </a>
                  <a href="https://fantom.foundation/" target="_black">
                    <img src={SlackIcon} />
                    Slack
                  </a>
                  <a href="https://fantom.foundation/" target="_black">
                    <img src={LinkedInIcon} />
                    Linkedin
                  </a>
                </div>
              </div>
            </Col>
            <Col md={4}  lg={4} className="page-menus">
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
