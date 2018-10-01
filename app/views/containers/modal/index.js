import React from 'react';

import { Row, Col, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserDetails } from 'views/controllers/user-details/action';
import { getUserDetails } from 'views/controllers/user-details/selector';
import { Title } from 'views/components/coreComponent/index';
import { loginApi } from 'views/containers/apis/login';



class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: '',
      password: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop='static'>
          
          <ModalBody>
           



<Row className="mx-0" style={{ backgroundColor: 'white', paddingTop: '86px', paddingBottom: '10px'}}>




<Button color="secondary" onClick={this.toggle}


>&times;</Button>



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




          </ModalBody>
          
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;