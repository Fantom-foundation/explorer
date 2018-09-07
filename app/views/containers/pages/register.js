import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
  } from 'reactstrap';
import Alert from 'react-s-alert';
import { validateEmailApi } from 'views/containers/apis/validate-email';
import { createAccountApi } from 'views/containers/apis/create-account';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      repassword: '',
      emailErrorText: '',
      passErrorText: '',
      repassErrorText: '',
      data: [],
      date: new Date().getTime(),
      isUpdated: false,
    };
  }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  handleClick = (event, isActive) => {
    event.preventDefault();
    if (isActive) {
      const createApiPromise = createAccountApi(this.state.email, this.state.password, this.state.repassword);
      createApiPromise.then((result) => {
        if (result.status) {
          const emailToken = result.emailToken;
          const registrationUrl = `http://localhost:3000/verify-email${emailToken}`;
          console.log('Email Verification Link!!', registrationUrl);
          this.resetFields();
          Alert.success('Registered Successfully,Please verify your email', {
            position: 'top',
            timeout: 5000,
          });
        }
      }).catch((error) => {
        console.log('@@@error', error);
      });
    }
  }
  resetFields = () => {
    this.setState({
      email: '',
      password: '',
      repassword: '',
    });
  }
  validateData = (event, name) => {
    event.preventDefault();
    if (name === 'email') {
      this.validEmail();
    } else if (name === 'password') {
      this.validPass(this, this.state);
    } else if (name === 'repassword') {
      this.validRepass();
    }
  }

  validEmailEmail = () => {
    const validateNameApiPromise = validateEmailApi(this.state.email);
    validateNameApiPromise.then((result) => {
      this.setState(result);
    }).catch((error) => {
      console.log('@@@error', error);
    });
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
      obj.emailErrorText = 'Email field can\'t be empty';
    } else if (re.test(String(this.state.email).toLowerCase())) {
      this.validEmailEmail();
    } else {
      obj.emailErrorText = 'You need to specify a valid email';
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

  render() {
    let isActive = false;
    if (this.state.email !== '' && this.state.password !== '' && this.state.repassword !== '') {
      isActive = true;
    }
    return (
      <Row>
        <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
          <div className="cs-container forms-container theme-blue-shadow inner mb-4">
            <Row className="mx-0">
              <Col sm="12" className="px-5 py-3">
                <Form onSubmit={(event) => this.props.handleClick(event, isActive)}>
                  <div className="form-element form-input">
                    <input
                      id="Email"
                      className="form-element-field"
                      placeholder=" "
                      type="email"
                      required=""
                      value={this.state.email}
                      onChange={(e) => this.onUpdate('email', e.currentTarget.value)}
                      onBlur={(event) => this.validateData(event, 'email')}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label" for="AccountName">Email</label>
                    {this.state.emailErrorText !== '' ? <small className="form-element-hint">{this.state.emailErrorText}</small> : ''}
                  </div>

                  <Row>
                    <Col sm={12}>
                      <div className="form-element form-input">
                        <input
                          id="Password"
                          className="form-element-field"
                          placeholder=" "
                          type="password"
                          required=""
                          value={this.state.password}
                          onBlur={(event) => this.validateData(event, 'password')}
                          onChange={(e) => this.onUpdate('password', e.currentTarget.value)}
                        />
                        <div className="form-element-bar"></div>
                        <label className="form-element-label" for="Password">Password</label>
                        {this.state.passErrorText !== '' ? <small className="form-element-hint">{this.state.passErrorText}</small> : ''}
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="form-element form-input">
                        <input
                          id="Re-enterPassword"
                          className="form-element-field"
                          placeholder=" "
                          type="password"
                          required=""
                          value={this.state.repassword}
                          onBlur={(event) => this.validateData(event, 'repassword')}
                          onChange={(e) => this.onUpdate('repassword', e.currentTarget.value)}
                        />
                        <div className="form-element-bar"></div>
                        <label className="form-element-label" for="Re-enterPassword">Re- enter Password</label>
                        {this.state.repassErrorText !== '' ? <small className="form-element-hint">{this.state.repassErrorText}</small> : ''}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <p className="Form-Text mt-3">Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.</p>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Button style={{ marginLeft: '350px' }} value={40} onClick={(event) => this.handleClick(event, isActive)}>Register</Button>
          </div>
        </Col>
      </Row>
    );
  }
}
