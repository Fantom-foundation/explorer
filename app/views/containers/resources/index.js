import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import resources from '../../../images/resources/resources.svg';
import exchange from '../../../images/resources/exchange.jpg';
import icos from '../../../images/resources/icos.jpg';
import newsEvent from '../../../images/resources/news-event.jpg';
import smartContract from '../../../images/resources/smart-contract.jpg';
import wallet from '../../../images/resources/wallet.jpg';
import others from '../../../images/resources/others.jpg';

import Header from '../../components/header/header';

class Resources extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container className="text-white resources">
          <Row style={{ marginTop: '70px' }}>
            <Col style={{ backgroundImage: `url(${resources})` }}>
              <h1 style={{ paddingLeft: '25px' }}>Resources</h1>
              <p style={{ fontSize: 16, paddingLeft: '25px' }}>
                Find out more about us
              </p>
            </Col>
          </Row>
          <hr />
          <Row style={{ marginTop: '70px' }}>
            <Col
              className="resource-card"
              style={{ backgroundImage: `url(${exchange})` }}
              md={4}
            >
              <h2>Exchanges</h2>
              <p>Places to buy and sell cryptocurrencies</p>
              <ul>
                <li>CryptoExchanges</li>
                <li>DEX</li>
                <li>Flat exchanges</li>
              </ul>
            </Col>
            <Col
              className="resource-card"
              style={{ backgroundImage: `url(${wallet})` }}
              md={4}
            >
              <h2>Wallet</h2>
              <p>Used to receive and send assets</p>
              <ul>
                <li>GUI Wallets</li>
                <li>Hardware Wallets</li>
              </ul>
            </Col>
            <Col
              className="resource-card"
              style={{ backgroundImage: `url(${icos})` }}
              md={4}
            >
              <h2>ICOs</h2>
              <p>Initial Coin Offerings</p>
              <ul>
                <li>Benchmark Listing</li>
                <li>Prince Watch</li>
                <li>Services</li>
              </ul>
            </Col>
            <Col
              className="resource-card"
              style={{ backgroundImage: `url(${newsEvent})` }}
              md={4}
            >
              <h2>News And Events</h2>
              <p>Our community and events near you.</p>
              <ul>
                <li>News</li>
                <li>Events</li>
              </ul>
            </Col>

            <Col
              className="resource-card"
              style={{ backgroundImage: `url(${smartContract})` }}
              md={4}
            >
              <h2>Smart Contracts</h2>
              <p>For more advanced users</p>
              <ul>
                <li>Smart Contracts Audit and Security</li>
                <li>Smart Contracts Factory</li>
              </ul>
            </Col>
            <Col
              className="resource-card"
              style={{ backgroundImage: `url(${others})` }}
              md={4}
            >
              <h2>Others</h2>
              <p>Extra Resources</p>
              <ul>
                <li>Career</li>
                <li>Grant</li>
                <li>Tools</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default Resources;
