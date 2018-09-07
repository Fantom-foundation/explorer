import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
  } from 'reactstrap';
import Alert from 'react-s-alert';
import { loginApi } from 'views/containers/apis/login';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  handleClick = (event) => {
    event.preventDefault();
      const loginApiPromise = loginApi(this.state.email, this.state.password);
      loginApiPromise.then((result) => {
        if (result.status) {
          this.resetFields();
        }
      }).catch((error) => {
        console.log('@@@error', error);
      });
  }
  resetFields = () => {
    this.setState({
      email: '',
      password: '',
    });
  }
  render() {
    return (
      <Row>
        <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
          <div className="cs-container forms-container theme-blue-shadow inner mb-4">
            <Row className="mx-0">
              <Col sm="12" className="px-5 py-3">
                <Form onSubmit={(event) => this.handleClick(event)}>
                  <div className="form-element form-input">
                    <input
                      id="Email"
                      className="form-element-field"
                      placeholder=" "
                      type="email"
                      required=""
                      value={this.state.email}
                      onChange={(e) => this.onUpdate('email', e.currentTarget.value)}
                     // onBlur={(event) => this.validateData(event, 'email')}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label" for="AccountName">Email</label>
                    {/* {this.state.emailErrorText !== '' ? <small className="form-element-hint">{this.state.emailErrorText}</small> : ''} */}
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
                         // onBlur={(event) => this.validateData(event, 'password')}
                          onChange={(e) => this.onUpdate('password', e.currentTarget.value)}
                        />
                        <div className="form-element-bar"></div>
                        <label className="form-element-label" for="Password">Password</label>
                        {/* {this.state.passErrorText !== '' ? <small className="form-element-hint">{this.state.passErrorText}</small> : ''} */}
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Button style={{ marginLeft: '350px' }} value={40} onClick={(event) => this.handleClick(event)}>Login</Button>
          </div>
        </Col>
      </Row>
    );
  }
}
