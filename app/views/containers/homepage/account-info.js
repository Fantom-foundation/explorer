import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import identicon1 from 'images/identicon/ident-con-1.png';
import TempQR from 'views/components/temp-components/qr';
import copyImage from 'images/icons/copy.svg';

export default class AccountInfo extends React.Component {
  render() {
    return (
      <span>
        <Row>
          <Col>
            <div className="person-info small">
              <div className="d-inline-block align-top"><img src={identicon1} className="person-image theme-blue-shadow" /></div>
              <div className="d-inline-block align-top"><h2 className="person-name">John Doe</h2>
              </div>
            </div>
          </Col>
          <Col className="text-right">
            {/* -------qr------- */}
            <TempQR />
            {/* -------qr------- */}
          </Col>
        </Row>
        <Row>
          <Col className="person-copy-info">
            <div>
              <h2 className="info-title mb-0">Your Address</h2>
            </div>
            <div className="info-description-box">
              <span className="mr-3">
                <img src={copyImage} className="copy mr-3" />
              </span>
              <span >0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</span>
            </div>
            <div>
              <h2 className="info-title mb-0">Owner Recovery Phrase</h2>
            </div>
            <div className="info-description-box ">
              <span className="mr-3">
                <img src={copyImage} className="copy" />
              </span>
              <span> {this.props.mnemonic} </span>
            </div>
          </Col>
        </Row>
      </span>
    );
  }
}
