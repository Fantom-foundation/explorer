import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import logoIcon from 'images/Logo/Fantom-Logo-icon.svg';
import { Title } from 'views/components/coreComponent/index';

export default class MarketCap extends React.Component {
  render() {
    return (
      <Row className="market-cap">
        <Col xs={12} md={6} className="discription">
          <Title h2 className="text-white mb-0">Beyond</Title>
          <Title h2 className="text-white">Blockchain</Title>
          <p className="mb-0">The Future of Decentralized Ecosystem</p>
        </Col>
        <Col xs={12} className="line"><hr /></Col>
        <Col xs={12} md={6} className="graph-info">
          <Row className="title-info">
            <Col className="icon" style={{backgroundImage:`url(${logoIcon})`}}>
              <Title h2 className="mb-0 text-white text-uppercase">Market Cap Of $28.956 Billion</Title>
              <Title h2 className="mb-0 text-white">$285.47 @ 0.04267 FTM/ETH 1.13%</Title>
            </Col>
          </Row>
          <div className="result-info top">
          <div className="left">
              <Title h2 className="text-white text-uppercase mb-0">Last Block</Title>
              <p>6192596 (14.2s)</p>
              </div>
    
            <div className="text-right right">
              <Title h2 className="text-white text-uppercase mb-0">Transactions</Title>
              <p>296.24 M (7.9 TPS)</p>
              </div>
            </div>
          <hr />
          <div className="result-info bottom">
            <div className="left">
              <Title h2 className="text-uppercase mb-0">Hash Rate</Title>
              <p>286,235.71 GH/s</p>
            </div>
            <div className="middle">
              <Title h2 className="text-uppercase mb-0">Your Balance</Title>
              <p>149.00FTM</p>
            </div>
            <div className="text-right right">
              <Title h2 className="text-uppercase mb-0">Network Difficulty</Title>
              <p>3,583.35 TH</p>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
