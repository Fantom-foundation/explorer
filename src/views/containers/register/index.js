import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
  } from 'reactstrap';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserDetails } from 'src/storage/actions/userDetails';
import { getUserDetails } from 'src/storage/selectors/userDetails';
import { Title } from 'src/views/components/coreComponent/index';
import { validateEmailApi } from 'src/views/containers/apis/validate-email';
import { createAccountApi } from 'src/views/containers/apis/create-account';

class Register extends React.Component {
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
      registerModal: false,
    };
  }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
   /**
   * handleClick is a method which called when clicked on register button
   * in this methos call createAccountApi for create user account.
   * @email: User email
   * @password: User password
   * @repassword: For confirmation purpose.
   */
  handleClick = (event, isActive) => {
    event.preventDefault();
    if (isActive) {
      const createApiPromise = createAccountApi(this.state.email, this.state.password, this.state.repassword, { ...this.props });
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
          this.props.toggle(event);
          this.props.history.push('/verify-email');
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
      // <Row>
      //   <Col sm="12" style={{ paddingTop: '86px', minHeight: '100vh', backgroundColor: 'black' }}>
      //     <div style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
      <Modal isOpen={this.props.registerModal} toggle={(event) => this.props.toggle(event)} className={this.props.className} backdrop>

      <ModalBody>
            <Row className="mx-0" style={{ backgroundColor: 'white', paddingTop: '86px', paddingBottom: '10px',position:'relative'}}>
            <Button color="secondary" onClick={this.props.toggle}
             style={{
              position:'absolute',
              top:0,
              right:0,
              padding:0,
              background:"transparent",
              color:'#000',
              border:'0px',
              fontSize:'32px',
              lineHeight: '100%',
            }}>&times;</Button>
              <Col className="px-5 py-3">
                <Form onSubmit={(event) => this.props.handleClick(event, isActive)}>
                <Title h2 className="text-center line-title" style={{ fontWeight: 100 }}>Sign Up</Title>
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

                  <Row>
                    <Col>
                      <p className="Form-Text">Make your password with 8 characters or more. It can be any combination of letters, numbers, and symbols.</p>
                    </Col>
                  </Row>
                  <Button style={{ marginLeft: '100px', backgroundColor: 'black', width: '200px' }} value={40} onClick={(event) => this.handleClick(event, isActive)}>Register</Button>
                </Form>
              </Col>
            </Row>
            </ModalBody>

          </Modal>

      //     </div>
      //   </Col>
      // </Row>
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
)(Register);
