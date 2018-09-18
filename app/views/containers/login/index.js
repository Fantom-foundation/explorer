import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
  } from 'reactstrap';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserDetails } from 'views/controllers/user-details/action';
import { getUserDetails } from 'views/controllers/user-details/selector';
import { Title } from 'views/components/coreComponent/index';
import { loginApi } from 'views/containers/apis/login';


class Login extends React.Component {
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
    const loginApiPromise = loginApi(this.state.email, this.state.password, { ...this.props });
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
        <Col sm="12" style={{ paddingTop: '86px', minHeight: '100vh', backgroundColor: 'black' }}>
          <div style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
            <Row className="mx-0" style={{ backgroundColor: 'white', paddingTop: '86px', paddingBottom: '10px'}}>
              <Col className="px-5 py-3">
                <Form onSubmit={(event) => this.handleClick(event)}>
                <Title h2 className="text-center line-title" style={{ fontWeight: 100 }}>Sign In</Title>
                  <div className="form-element form-input">
                    <input
                      id="Email"
                      className="form-element-field"
                      placeholder=" "
                      type="email"
                      required=""
                      value={this.state.email}
                      onChange={(e) => this.onUpdate('email', e.currentTarget.value)}
                    />
                    <div className="form-element-bar"></div>
                    <label className="form-element-label" for="AccountName">Email</label>
                  </div>
                      <div className="form-element form-input">
                        <input
                          id="Password"
                          className="form-element-field"
                          placeholder=" "
                          type="password"
                          required=""
                          value={this.state.password}
                          onChange={(e) => this.onUpdate('password', e.currentTarget.value)}
                        />
                        <div className="form-element-bar"></div>
                        <label className="form-element-label" for="Password">Password</label>
                      </div>
                      <Button style={{ marginLeft: '100px', backgroundColor: 'black', width: '200px' }} value={40} onClick={(event) => this.handleClick(event)}>Login</Button>
                      <div className="text-right mt-4 pt-4">
                      <p className="m-0">
                        <a className="text-black" href="/register">Register</a>
                        </p>
                      <p className="m-0">
                        <a className="text-black">Forgot Password</a>
                        </p>
                      </div>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = createSelector(
    getUserDetails(),
    (userDetails) => ({ userDetails }),
);
const mapDispatchToProps = {
  setUserDetails,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
