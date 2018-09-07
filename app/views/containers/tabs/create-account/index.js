import React from 'react';
import {
    Row,
    Col,
    Form,
    TabPane,
  } from 'reactstrap';
import DisplayIdenticons from 'views/containers/identicons/index';
import AccountFooter from 'views/components/footer/account-footer';
import FooterButtons from 'views/components/footer/footer-buttons';
import { Progress } from 'views/components/core/core';

export default class CreateAccount extends React.Component {
  render() {
    return (
      <TabPane tabId="1">
      <Row>
        <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
          <div className="cs-container forms-container theme-blue-shadow inner mb-4">
            <Row className="mx-0">
              <Col sm="12" className="px-5 py-3">
                <Form onSubmit={(event) => this.props.handleClick(event)}>
                  <div className="form-element form-input">
                    <input
                      id="AccountName"
                      className="form-element-field"
                      placeholder=" "
                      type="text"
                      required=""
                      value={this.props.email}
                      onChange={(e) => this.props.onUpdate('email', e.currentTarget.value)}
                      onBlur={(event) => this.props.validateData(event, 'email')}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label" for="AccountName">Account Name</label>
                    {this.props.emailErrorText !== '' ? <small className="form-element-hint">{this.props.emailErrorText}</small> : ''}
                  </div>

                  <Row>
                    <Col sm={6}>
                      <div className="form-element form-input">
                        <input
                          id="Password"
                          className="form-element-field"
                          placeholder=" "
                          type="password"
                          required=""
                          value={this.props.password}
                          onBlur={(event) => this.props.validateData(event, 'password')}
                          onChange={(e) => this.props.onUpdate('password', e.currentTarget.value)}
                        />
                        <div className="form-element-bar"></div>
                        <label className="form-element-label" for="Password">Password</label>
                        {this.props.passErrorText !== '' ? <small className="form-element-hint">{this.props.passErrorText}</small> : ''}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="form-element form-input">
                        <input
                          id="Re-enterPassword"
                          className="form-element-field"
                          placeholder=" "
                          type="password"
                          required=""
                          value={this.props.repassword}
                          onBlur={(event) => this.props.validateData(event, 'repassword')}
                          onChange={(e) => this.props.onUpdate('repassword', e.currentTarget.value)}
                        />
                        <div className="form-element-bar"></div>
                        <label className="form-element-label" for="Re-enterPassword">Re- enter Password</label>
                        {this.props.repassErrorText !== '' ? <small className="form-element-hint">{this.props.repassErrorText}</small> : ''}
                      </div>
                    </Col>
                  </Row>
                  <div className="form-element form-input">
                    <input
                      id="PasswordHint"
                      className="form-element-field"
                      placeholder=" "
                      type="text"
                      value={this.props.password_hint}
                      onChange={(e) => this.props.onUpdate('password_hint', e.currentTarget.value)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label" for="PasswordHint">Password hint</label>
                  </div>
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
            <DisplayIdenticons date={this.props.date} identiconsId={this.props.identiconsId} refreshData={this.props.refreshData} getRadioData={this.props.getRadioData} />
            <FooterButtons {...this.props} isEnabled={this.props.isActive}/>
          </div>
          <AccountFooter />
        </Col>
      </Row>
      </TabPane>
    );
  }
}