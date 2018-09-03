import React from 'react';
import {
  Container,
  Row,
  Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Form, FormGroup, Input,Button,
} from 'reactstrap';
import classnames from 'classnames';
import identicon1 from 'images/identicon/ident-con-1.png';

import refreshIcon from 'images/icons/refresh-icon.svg';
import { Progress, Refresh } from 'views/components/core/core';
import Header from 'views/components/header';
import AccountFooter from 'views/components/footer/account-footer';
import FooterButtons from 'views/components/footer/footer-buttons';

import copyImage from 'images/icons/copy.svg'

import TempQR from '../../components/temp-components/qr';


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
    };
    this.toggle = this.toggle.bind(this);
  }

  onUpdate = (key, value) => {
    this.setState({ [key]: value });
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
  }

  render() {
    return (
      <div>
        <Header />
        <section style={{ padding: '118px 0', backgroundColor: 'rgba(17, 165, 244, 0.1)' }}>
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
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                          <Row className="mx-0">
                            <Col sm="12" className="px-5 py-3">
                              <Form onSubmit={(event) => this.handleClick(event)}>
                                <FormGroup>
                                  <Input
                                    type="text"
                                    name="email"
                                    className="theme-blue"
                                    id="exampleEmail"
                                    placeholder="Account name"
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
                                        placeholder="Re- enter Password"
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
                                    onChange={(e) => this.onUpdate('password_hint', e.currentTarget.value)}
                                  />
                                </FormGroup>
                                <Row>
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
                              <Refresh className="text-center" animated />
                            </Col>
                          </Row>
                          <Row className="m-auto" style={{ maxWidth: '635px' }}>
                            <Col>
                              <ul className="identicon m-0 p-0   ">
                                <li>
                                  <label className="form-radio-label">
                                    <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                                <li>
                                  <label className="form-radio-label">
                                    <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                                <li>
                                  <label className="form-radio-label">
                                    <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                                <li>
                                  <label className="form-radio-label">
                                    <input nameName="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                                <li>
                                  <label className="form-radio-label">
                                    <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                                <li>
                                  <label className="form-radio-label">
                                    <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                                <li>
                                  <label className="form-radio-label">
                                    <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                                    <i className="form-radio-button"></i>
                                    <img src={identicon1} />
                                  </label>
                                </li>
                              </ul>
                            </Col>
                            <Col className="identicon-refresh"> <img src={refreshIcon} alt="Refresh" />  </Col>
                          </Row>

                      <FooterButtons />
                        </div>
                       <AccountFooter />
                      </Col>
                    </Row>
                  </TabPane>
                  {/*===============================================================================================================*/}
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                          <Row className="mx-0">
                            <Col style={{ paddingTop: '46px', paddingBottom: '46px', paddingLeft: '66px', paddingRight: '69px' }}>
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
                                  <span className="mr-3"><img src={copyImage} className="copy mr-3" /></span>
                                  <span >0x59d50B3XXXXXXXXXXXXXXXXXXXCBE154D</span>
                                  </div>
                                  <div>
                                    <h2 className="info-title mb-0">Owner Recovery Phrase</h2>
                                  </div>
                                  <div className="info-description-box ">
                                  <span  className="mr-3"><img src={copyImage} className="copy" /></span>
                                  <span >unmoved skewed primary pointing pep prescribe on stage eject unbiased skeleton robot click </span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="my-3 ">
                                <Col className="text-center">
                                  <Button color="primary">Print Phrase</Button>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                <p className="text mb-3">Please back up the recovery phase now. Make sure to keep it private and secure, it allows full and unlimited access to your account.</p>

                                <p className="text small mb-0">Type ‘’ I have written down the phrase’’  below to confirm it is backed up.</p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                         <FooterButtons />
                        </div>
                        <AccountFooter />
                      </Col>
                    </Row>
                  </TabPane>
                  {/*===============================================================================================================*/}
                  <TabPane tabId="3">
                    <Row>
                      <Col >
                        ijghyju
                          ryrty
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