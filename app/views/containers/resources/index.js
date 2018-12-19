import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import resources from '../../../images/resources/resources.svg';
import exchange from '../../../images/resources/exchange.svg';
import icos from '../../../images/resources/icos.svg';
import newsEvent from '../../../images/resources/news-event.svg';
import smartContract from '../../../images/resources/smart-contract.svg';
import wallet from '../../../images/resources/wallet.svg';
import others from '../../../images/resources/others.svg';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class Resources extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container className="text-white resources pb-5">
          <Row className="head">
            <Col style={{ backgroundImage: `url(${resources})` }}>
              <h2>Resources</h2>
              <p>
                Find out more about us
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col
              className="resource-card exchange"
              style={{ backgroundImage: `url(${exchange})` }}
              md={6} lg={4}
            >
              <h2>Exchanges</h2>
              <p>Places to buy and sell cryptocurrencies</p>
              <ul>
                <li onClick={()=>window.open('https://fantom.foundation/')}>CryptoExchanges</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>DEX</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Flat exchanges</li>
              </ul>
            </Col>
            <Col
              className="resource-card wallet"
              style={{ backgroundImage: `url(${wallet})` }}
              md={6} lg={4}
            >
              <h2>Wallet</h2>
              <p>Used to receive and send assets</p>
              <ul>
                <li onClick={()=>window.open('https://fantom.foundation/')}>GUI Wallets</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Hardware Wallets</li>
              </ul>
            </Col>
            <Col
              className="resource-card iocs"
              style={{ backgroundImage: `url(${icos})` }}
              md={6} lg={4}
            >
              <h2>ICOs</h2>
              <p>Initial Coin Offerings</p>
              <ul>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Benchmark Listing</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Prince Watch</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Services</li>
              </ul>
            </Col>
            <Col
              className="resource-card news-event"
              style={{ backgroundImage: `url(${newsEvent})` }}
              md={6} lg={4}
            >
              <h2>News And Events</h2>
              <p>Our community and events near you.</p>
              <ul>
                <li onClick={()=>window.open('https://fantom.foundation/')}>News</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Events</li>
              </ul>
            </Col>

            <Col
              className="resource-card smart-contract"
              style={{ backgroundImage: `url(${smartContract})` }}
              md={6} lg={4}
            >
              <h2>Smart Contracts</h2>
              <p>For more advanced users</p>
              <ul>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Smart Contracts Audit and Security</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Smart Contracts Factory</li>
              </ul>
            </Col>
            <Col
              className="resource-card others"
              style={{ backgroundImage: `url(${others})` }}
              md={6} lg={4}
            >
              <h2>Others</h2>
              <p>Extra Resources</p>
              <ul>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Career</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Grant</li>
                <li onClick={()=>window.open('https://fantom.foundation/')}>Tools</li>
              </ul>
            </Col>
          </Row>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Resources;
