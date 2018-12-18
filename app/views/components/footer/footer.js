import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import GithubIcon from '../../../images/social/github.svg';
import LinkedInIcon from '../../../images/social/linked-in.svg';
import SlackIcon from '../../../images/social/slack.svg';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container>
          <hr />
          <Row className="menus">
            <Col md={4}>
              <div>
                <h2 className="text-uppercase">Support</h2>
                <a href="mailto:contact@fantom.foundation">
                  contact@fantom.foundation
                </a>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <h2 className="text-uppercase">Channel</h2>
                <div className="social">
                  <a href="#">
                    <img src={GithubIcon} />
                    Github
                  </a>
                  <a href="#">
                    <img src={SlackIcon} />
                    Slack
                  </a>
                  <a href="#">
                    <img src={LinkedInIcon} />
                    Linkedin
                  </a>
                </div>
              </div>
            </Col>
            <Col md={4} >
            <h2 className="text-uppercase">&nbsp;</h2>
            <ul className="page-menus">
              <li><a href="#">About</a></li>
              <li><a href="#">Term of services</a></li>
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
