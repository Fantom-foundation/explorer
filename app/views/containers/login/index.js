import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
  } from 'reactstrap';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserDetails } from 'views/controllers/user-details/action';
import { getUserDetails } from 'views/controllers/user-details/selector';
import { Title } from 'views/components/coreComponent/index';
import { loginApi } from 'views/containers/apis/login';
import Register from 'views/containers/register/index';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registerModal: false,
      modal: this.props.modal,
      update: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  toggle(event) {
    this.setState({
      modal: false,
      registerModal: !this.state.registerModal,
      update: true,
    });
    this.props.toggleModal(event, !this.state.modal);
  }
  /**
   * handleClick is a method which called when clicked on login button
   * in this methos call loginApi for authenticate user credentials either its valid credentials or not.
   * Credentials are user email or password.
   */
  handleClick = (event) => {
    event.preventDefault();
    const loginApiPromise = loginApi(this.state.email, this.state.password, { ...this.props });
    loginApiPromise.then((result) => {
      if (result.status) {
        this.resetFields();
        this.closeModal(event);
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
  closeModal = (event) => {
    event.preventDefault();
    this.props.toggleModal(event, this.state.modal);
  }
  render() {
    if (this.state.registerModal) {
      return <Register toggle={this.toggle} registerModal={this.state.registerModal} />;
    }
    return (
      <Modal isOpen={this.state.modal} toggle={(event) => this.closeModal(event)} className={this.props.className} backdrop>
        <ModalBody>
          <Row className="mx-0" style={{ backgroundColor: 'white', paddingTop: '86px', paddingBottom: '10px', position: 'relative' }}>
            <Button
              color="secondary"
              onClick={(event) => this.closeModal(event)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 0,
                background: 'transparent',
                color: '#000',
                border: '0px',
                fontSize: '32px',
                lineHeight: '100%',
              }}
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
                  <label className="form-element-label" htmlFor="AccountName">Email</label>
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
                  <label className="form-element-label" htmlFor="Password">Password</label>
                </div>
                <Button style={{ marginLeft: '100px', backgroundColor: 'black', width: '200px' }} value={40} onClick={(event) => this.handleClick(event)}>Login</Button>
                <div className="text-right mt-4 pt-4">
                  <p className="m-0">
                    <a className="text-black" onClick={this.toggle}>Register</a>
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
