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
      <Row>
        <Col xs={12} md={6} className="discription">
          <Title h2 className="text-white mb-0"><strong>Beyond</strong></Title>
          <Title h2 className="text-white"><strong>Blockchain</strong></Title>
          <p className="text-white mb-0">The Future of Decentralized</p>
          <p className="text-white">Ecosystem</p>
        </Col>
        <Col xs={12} md={6} className="graph-info">
          <Row className="title-info">
            <Col className="logo-column pt-1"><img src={logoIcon} className="logo" alt="logo" /></Col>
            <Col className="">
              <Title h2 className="mb-0 text-primary">MARKET CAP OF $28.956 BILLION</Title>
              <Title h2 className="text-white text-primary mb-0">$285.47 @ 0.04267 FTM/ETH <span style={{ color: '#00ff72' }}>1.13%</span></Title>
            </Col>
          </Row>
          <Row className="result-info top">
            <Col>
              <Title h2 className="text-white text-uppercase mb-0"><strong>Last Block</strong></Title>
              <Title h2 className="text-white mb-0">6192596 (14.2s)</Title>
            </Col>
            <Col className="text-right">
              <Title h2 className="text-white text-uppercase mb-0"><strong>Transactions</strong></Title>
              <Title h2 className="text-white mb-0">296.24 M (7.9 TPS)</Title>
            </Col>
          </Row>
          <hr className="light" />
          <Row className="result-info bottom">
            <Col className="pr-0">
              <Title h2 className="text-uppercase mb-0"><strong>Hash Rate</strong></Title>
              <Title h2 className="mb-0">286,235.71 GH/s</Title>
            </Col>
            <Col className="px-0">

              <Title h2 className="text-uppercase text-center balance mb-0"><strong>Your Balance</strong> 149.00FTM</Title>
            </Col>
            <Col className="text-right pl-0">
              <Title h2 className="text-uppercase mb-0"><strong>Network Difficulty</strong></Title>
              <Title h2 className="mb-0">3,583.35 TH</Title>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
