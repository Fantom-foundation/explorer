import React from 'react';
import {
  Container,
  Row,
  Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Form, FormGroup, Input, Button,
} from 'reactstrap';
import classnames from 'classnames';
// import identicon1 from 'images/identicon/ident-con-1.png';
// import refreshIcon from 'images/icons/refresh-icon.svg';
import { Progress, Refresh } from 'views/components/core/core';
import Header from 'views/components/header';
import DisplayIdenticons from 'views/containers/identicons/index';
import AccountFooter from 'views/components/footer/account-footer';
import FooterButtons from 'views/components/footer/footer-buttons';
// import copyImage from 'images/icons/copy.svg';
import bip39 from 'bip39';
import ReactToPrint from "react-to-print";
//import TempQR from 'views/components/temp-components/qr';
import AccountInfo from 'views/containers/homepage/account-info';


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
      identiconsId: '',
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
      icon: this.state.identiconsId,
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
        debugger;
        if (res.status === 200) {
          console.log('res!!', res);
          this.resetFields();
        } else {
          console.log('error', res);
        }
      });
  }
  resetFields = () => {
    debugger;
    this.setState({
      email: '',
      password: '',
      repassword: '',
      password_hint: '',
      identiconsId: '',
    });
  }
  getRadioData = (event, identiconsId) => {
    event.preventDefault();
    this.setState({ identiconsId });
  }
  validateData = (event, name) => {
    event.preventDefault();
    if (name === 'email') {
      if (this.state.email.includes('@')) {
        this.validEmail();
      }
    } else if (name === 'password') {
      this.validPass();
    } else if (name === 'repassword') {
      this.validRepass();
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
          <Container className="bg-white theme-blue-shadow">
            <Row>
              <Col className="px-0">
                <Nav tabs className="tab-full tab-theme text-center">
                  {/* <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Creation type
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Creat account
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      Account information
                    </NavLink>

                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      Confirm
                    </NavLink>
                  </NavItem>
                </Nav>
                <Progress type="theme-blue" value={33.33} />
              </Col>
            </Row>
            <Row>
              <Col>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                          <Row className="mx-0">
                            <Col sm="12" className="px-5 py-3">
                              <Form onSubmit={(event) => this.handleClick(event)}>


                                {/*==========================New Form Start=============================*/}


<div className="form-element form-input">
    <input id="AccountName" className="form-element-field" placeholder=" " type="text" required="" />
    <div className="form-element-bar"></div>
    <label className="form-element-label" for="AccountName">Account Name</label>
    <small className="form-element-hint">You need to specify a valid account name</small>
</div>

<Row>
    <Col sm={6}>
    <div className="form-element form-input">
        <input id="Password" className="form-element-field" placeholder=" " type="text" required="" />
        <div className="form-element-bar"></div>
        <label className="form-element-label" for="Password">Password</label>
        <small className="form-element-hint">You need to specify a valid account name</small>
    </div>
    </Col>
    <Col sm={6}>
    <div className="form-element form-input">
        <input id="Re-enterPassword" className="form-element-field" placeholder=" " type="text" required="" />
        <div className="form-element-bar"></div>
        <label className="form-element-label" for="Re-enterPassword">Re- enter Password</label>
        <small className="form-element-hint">You need to specify a valid account name</small>
    </div>
    </Col>
</Row>
<div className="form-element form-input">
    <input id="PasswordHint" className="form-element-field" placeholder=" " type="text" required="" />
    <div className="form-element-bar"></div>
    <label className="form-element-label" for="PasswordHint">Password hint</label>
    <small className="form-element-hint">You need to specify a valid account name</small>
</div>

                                {/*==========================New Form Ens=============================*/}




                                {/* <FormGroup>
                                  <Input
                                    type="text"
                                    name="email"
                                    className="theme-blue"
                                    id="exampleEmail"
                                    placeholder="Account name"
                                    value={this.state.email}
                                    onChange={(e) => this.onUpdate('email', e.currentTarget.value)}
                                    onBlur={(event) => this.validateData(event, 'email')}
                                  />
                                  {this.state.emailErrorText !== '' ? <p className="Form-Text error mt-3"> {this.state.emailErrorText} </p> : ''}
                                </FormGroup>
                                <Row>
                                  <Col sm={6}>

                                    <FormGroup>
                                      <Input
                                        type="password"
                                        name="password"
                                        className="theme-blue"
                                        id="exampleEmail"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onBlur={(event) => this.validateData(event, 'password')}
                                        onChange={(e) => this.onUpdate('password', e.currentTarget.value)}
                                      />
                                      {this.state.passErrorText !== '' ? <p className="Form-Text error mt-3"> {this.state.passErrorText} </p> : ''}
                                    </FormGroup>
                                  </Col>
                                  <Col sm={6}>
                                    <FormGroup>
                                      <Input
                                        type="password"
                                        name="password"
                                        className="theme-blue"
                                        id="exampleEmail"
                                        placeholder="Re-enter Password"
                                        value={this.state.repassword}
                                        onBlur={(event) => this.validateData(event, 'repassword')}
                                        onChange={(e) => this.onUpdate('repassword', e.currentTarget.value)}
                                      />
                                      {this.state.repassErrorText !== '' ? <p className="Form-Text error mt-3"> {this.state.repassErrorText} </p> : ''}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <FormGroup>
                                  <Input
                                    type="password"
                                    name="password"
                                    className="theme-blue"
                                    id="exampleEmail"
                                    placeholder="Password hint"
                                    value={this.state.password_hint}
                                    onBlur={(event) => this.validateData(event, 'password_hint')}
                                    onChange={(e) => this.onUpdate('password_hint', e.currentTarget.value)}
                                  />
                                </FormGroup> */}
                                <Row className="mt-3">
                                  <Col>
                                    <Progress type="theme-red-Yellow-green" value={40} />
                                  </Col>
                                </Row>
                                <Row>
                                  <Col md={6}>
                                    <p className="Form-Text mt-3">Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.</p>
                                  </Col>
                                </Row>
                              </Form>
                            </Col>
                          </Row>
                          <DisplayIdenticons date={this.state.date} refreshData={this.refreshData} getRadioData={this.getRadioData} />
                          <FooterButtons handleClick={this.handleClick} />
                        </div>
                        <AccountFooter />
                      </Col>
                    </Row>
                  </TabPane>
                  {/*===============================================================================================================*/}
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                          <Row className="mx-0">
                            <Col style={{ paddingTop: '46px', paddingBottom: '46px', paddingLeft: '66px', paddingRight: '69px' }}>

                              <AccountInfo mnemonic={this.state.mnemonic} ref={el => (this.componentRef = el)} />
                              <Row className="my-3 ">
                                <Col className="text-center">
                                  <ReactToPrint
                                    trigger={() => <Button color="primary">Print Phrase</Button>}
                                    content={() => this.componentRef}
                                  />
                                  {/* <Button color="primary">Print Phrase</Button> */}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <p className="text mb-3 black-text">Please back up the recovery phase now. Make sure to keep it private and secure, it allows full and unlimited access to your account.</p>

                                  <p className="text small mb-0 black-text">Type ‘’ I have written down the phrase’’  below to confirm it is backed up.</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          {/* <FooterButtons /> */}
                        </div>
                        <AccountFooter />
                      </Col>
                    </Row>
                  </TabPane>
                  {/*===============================================================================================================*/}
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '52px', paddingBottom: '52px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">


                          <Row className="mx-0">
                            <Col style={{ paddingTop: '46px', paddingBottom: '46px' }}>

                              <div className="m-auto" style={{ maxWidth: '488px' }}>
                                <Row>
                                  <Col>

                                    <h2 className="title large text-center black-text">Enter Your Mnemonic</h2>

                                    <p className="text text-center black-text">Entering your Mnemonic phrase on a website is dangerous. If our website is compromised or you accidentally visit a different website, your funds will be stolen. Please consider:</p>
                                    <div className="text-center">
                                      <ul className="text w-thin text-left d-inline-block pl-4 px-sm-0">
                                        <li ><a href="#">MetaMask</a> or <a href="#">A Hardware Wallet</a> or <a href="#">Running MEW Offline & Locally</a></li>
                                        <li ><a href="#">Learning How to Protect Yourself and Your Funds</a></li>
                                      </ul>
                                    </div>

                                    <p className="text text-center black-text">If you must, please double-check the URL & SSL cert. It should say <a href="https://fantom.foundation/" target="_blank">https://fantom.foundation/</a> & MYFANTOMWALLET INC in your URL bar.</p>
                                  </Col>
                                </Row>

                                <Row>
                                  <Col>
                                    <Form>
                                      <FormGroup>
                                        <Input type="textarea" name="text" id="exampleText" placeholder="Enter Mnemonic Phrase" />
                                      </FormGroup>
                                      <center><Button color="primary">Unlock</Button></center>
                                    </Form>


                                  </Col>
                                </Row>

                              </div>

                            </Col>
                          </Row>

                          <FooterButtons />
                        </div>
                        <AccountFooter />
                      </Col>
                    </Row>
                  </TabPane>
                  {/*===============================================================================================================*/}
                </TabContent>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}