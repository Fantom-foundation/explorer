import React from 'react';
import {
  Container,
  Row,
  Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Form, FormGroup, Input, Button,
} from 'reactstrap';
import identicon1 from 'images/identicon/ident-con-1.png';
import copyImage from 'images/icons/copy.svg';
import arrowLeftRight from 'images/icons/arrows-left-right.svg';
import Header from 'views/components/header';
import bip39 from 'bip39';

import TempQR from 'views/components/temp-components/qr';

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      email: '',
      password: '',
      password_hint: '',
      repassword: '',
      emailErrorText: '',
      passErrorText: '',
      repassErrorText: '',
      data: [],
      date: new Date().getTime(),
      isUpdated: false,
      mnemonic: '',
    };
    this.toggle = this.toggle.bind(this);
  }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  handleClick = (event) => {
    event.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
      repassword: this.state.repassword,
      password_hint: this.state.password_hint,
    };
    const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
    const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';
    fetch(`${hyperText}://${window.location.hostname}${hostname}/api/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
      .then((res) => {
        if (res) {
          console.log('res!!', res);
          this.resetFields();
        } else {
          console.log('error', res);
        }
      });
  }
  resetFields = () => {
    this.setState({
      email: '',
      password: '',
      repassword: '',
      password_hint: '',
    });
  }
  validateData = (event, name) => {
    event.preventDefault();
    if (name === 'email') {
      this.validEmail();
    } else if (name === 'password') {
      this.validPass();
    } else if (name === 'repassword') {
      this.validRepass();
    } else if (name === 'password_hint') {
      this.validPasswordHint();
    }
  }
  validPass = () => {
    const passObj = {};
    if (this.state.password === '') {
      passObj.passErrorText = 'Password field can\'t be empty';
    } else if (this.state.password.length < 8) {
      passObj.passErrorText = 'Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.';
    } else {
      passObj.passErrorText = '';
    }
    this.setState(passObj);
  }
  validEmail = () => {
    const obj = {};
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.email === '') {
      obj.emailErrorText = 'Account Name field can\'t be empty';
    } else if (re.test(String(this.state.email).toLowerCase())) {
      obj.emailErrorText = '';
    } else {
      obj.emailErrorText = 'You need to specify a valid account name';
    }
    this.setState(obj);
  }
  validRepass = () => {
    const obj = {};
    if (this.state.repassword === '') {
      obj.repassErrorText = 'Re-enter password field can\'t be empty';
    } else if (this.state.repassword !== this.state.password) {
      obj.repassErrorText = 'Password and Re-enter password must be same';
    } else {
      obj.repassErrorText = '';
    }
    this.setState(obj);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
    if (tab === '2') {
      this.getMnemonic();
    }
  }
  refreshData = () => {
    const newDate = new Date().getTime();
    this.setState({ date: newDate });
  }
  getMnemonic = () => {
    const mnemonic = bip39.generateMnemonic();
    bip39.mnemonicToSeedHex(mnemonic);
    this.setState({ mnemonic });
  }
  render() {

    return (
      <div>
        <Header />
        <section style={{ padding: '118px 0' }}>
          <Container className="bg-white ">
            <Row className="bg-primary py-1 account-management-header">
              <Col md={5} className="col text-white pl-4 text-uppercase">Account Management</Col>
              <Col className="col text-white text-uppercase"><img src={arrowLeftRight} className="mr-1" /> Transfer</Col>
            </Row>
            <Row >
              <Col className="px-5 py-4">
                <Row className="bg-gray ">
                  <Col lg={8} className="gray-column large">

                    <div className="person-info large">
                      <span className="person-basic-info">
                        <div className="d-inline-block align-top block">
                          <img src={identicon1} className="person-image theme-blue-shadow" />
                        </div>
                        <div className="d-inline-block align-top block">
                          <h2 className="person-name">John Doe</h2>

                          <div className="person-copy-info">
                            <div className="info-description-box pl-0">
                              <span className="mr-3">
                                <img src={copyImage} className="copy mr-3" />
                              </span>
                              <span className="">0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</span>
                            </div>
                          </div>

                        </div>
                      </span>
                      <Row className=" mt-3 mt-lg-0">
                        <Col className="blank-88 hide-at-991"></Col>
                        <Col>
                          <div className="">

                            <p className="text large text-gray mb-0">Ledger John Doe</p>
                            <p className="text large text-gray mb-5">0 Outgoing transactions</p>

                          </div>

                          <div className="bg-white ftm-block theme-blue-shadow text-center p-2 m-auto ml-lg-0">
                            <h3 className="text-right pr-4"><span>(1,000\ = 1.00002312FTM)</span></h3>
                            <h2><span><strong>00.00000000 <span className="medium-text">FTM</span></strong></span></h2>
                            <h3><span>0,0000\</span></h3>
                          </div>

                        </Col>
                      </Row>
                    </div>

                  </Col>



                  <Col className="text-right gray-column large qr">
                    <TempQR large />
                  </Col>
                </Row>


                <Row className="bg-gray mt-4">
                  <Col className="px-5 py-2">
                    <h2 className="r-title text-gray mb-0"><span>Transactions</span></h2>
                  </Col>
                </Row>

                {/*===============Transactions Loop Start=======================*/}

                <Row className="bg-gray mt-2">
                  <Col className="gray-column transactions-details small">
                    <Row>
                      <Col className="blank-88 hide-at-991"></Col>
                      <Col className="">
                        <Row>
                          <Col ><h4 className="text-ellipsis  w-208"><span>TX# <a href="#">0X42BB307E4C04F0BF13B7952</a></span></h4></Col>
                          <Col><h4 className=" text-right text-primary"><span>23 mins 42 secs ago</span></h4></Col>
                        </Row>
                        <Row>
                          <Col  className="blank-184"><h4 className="text-gray text-ellipsis  w-148"><span >From <a href="#">0x04041d6a6bbbc2</a></span></h4></Col>
                          <Col ><h4 className="text-gray text-ellipsis  w-185"><span>to <a href="#">0xf4a2eff88a408ff4c4550148</a></span></h4></Col>
                        </Row>
                        <Row>
                          <Col><h4 className="text-gray"><span>Amount 2.9999 <a href="#"><strong>Fantom</strong></a></span></h4></Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/*===============Transactions Loop End=======================*/}
            


              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}