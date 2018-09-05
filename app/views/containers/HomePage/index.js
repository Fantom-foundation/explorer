import React from 'react';
import {
  Container,
  Row,
  Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
  Form, FormGroup, Input, Button,
} from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'views/components/core/core';
import Header from 'views/components/header';
import AccountFooter from 'views/components/footer/account-footer';
import FooterButtons from 'views/components/footer/footer-buttons';
import bip39 from 'bip39';
import ReactToPrint from 'react-to-print';
import AccountInfo from 'views/containers/homepage/account-info';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserDetails, updateUserDetails } from 'views/controllers/user-details/action';
import { getUserDetails } from 'views/controllers/user-details/selector';
import CreateAccount from 'views/containers/tabs/create-account/index';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.userDetails.icon ? '2' : '1',
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
      mnemonic:'',
      identiconsId: '',
      address: '',
      progressValue: this.props.userDetails.icon ? 66.66 : 33.33,
    };
    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    if (this.state.activeTab === '2') {
      this.getMnemonic();
    }
  }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  handleClick = (event, isActive) => {
    event.preventDefault();
    if (isActive) {
      const payload = {
        user: this.state.email,
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
          if (res.status === 200) {
            console.log('res!!', res);
            const object = {
              user: '',
              icon: '',
              // address: '', 
              // seed: '', 
              // mnemonic: '', 
              // pubKey: '', 
              // hexPrivateKey: '', 
              // masterPrivateKey: '',
            };
            if (res.result.email) {
              object.user = res.result.email;
            } else {
              object.user = res.result.account_name;
            }
            object.icon = res.result.icon;
            this.props.setUserDetails(object);
            this.toggle('2');
            this.resetFields();
          } else {
            console.log('error', res);
          }
        });
    }
  }
  resetFields = () => {
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
      } else {
        this.validAccountName();
      }
    } else if (name === 'password') {
      this.validPass();
    } else if (name === 'repassword') {
      this.validRepass();
    }
  }

  validAccountName = () => {
    const payload = {
      user: this.state.email,
    };
    const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
    const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';
    fetch(`${hyperText}://${window.location.hostname}${hostname}/api/validate-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
      .then((res) => {
        if (res.status === 202) {
          this.setState({ emailErrorText: 'Account name already exist' });
        } else {
          this.setState({ emailErrorText: '' });
        }
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
      obj.emailErrorText = 'Account Name field can\'t be empty';
    } else if (re.test(String(this.state.email).toLowerCase())) {
      this.validAccountName();
      //obj.emailErrorText = '';
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
      this.setState({ progressValue: 66.66 });
    }
  }
  refreshData = () => {
    const newDate = new Date().getTime();
    this.setState({ date: newDate });
  }
  getMnemonic = () => {
    debugger;
    const mnemonic = bip39.generateMnemonic();
    bip39.mnemonicToSeedHex(mnemonic);
    const seed = bip39.mnemonicToSeed(mnemonic);
    this.setState({ mnemonic });
    this.walletSetup(seed, mnemonic);
  }
  walletSetup(seed, mnemonic) {
    const root = Hdkey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = EthUtil.privateToPublic(addrNode._privateKey);
    const addr = EthUtil.publicToAddress(pubKey).toString('hex');
    const address = EthUtil.toChecksumAddress(addr);
    const hexPrivateKey = EthUtil.bufferToHex(addrNode._privateKey);
    const object = {
     // user: this.props.userDetails.user,
     // icon: this.props.userDetails.icon,
      seed,
      address,
      mnemonic,
      pubKey,
      hexPrivateKey,
      masterPrivateKey,
    };
    debugger;
    this.props.updateUserDetails(object);
    this.setState({ address });
  }

  render() {
    let isActive = false;
    if (this.state.email !== '' && this.state.password !== '' && this.state.repassword !== '' && this.state.identiconsId !== '') {
      isActive = true;
    }
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
                    >
                      Creat account
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                    >
                      Account information
                    </NavLink>

                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                    >
                      Confirm
                    </NavLink>
                  </NavItem>
                </Nav>
                <Progress type="theme-blue" value={this.state.progressValue} />
              </Col>
            </Row>
            <Row>
              <Col>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <CreateAccount
                      onUpdate={this.onUpdate}
                      validateData={this.validateData}
                      refreshData={this.refreshData}
                      handleClick={this.handleClick}
                      getRadioData={this.getRadioData}
                      isActive={isActive}
                      {...this.state}
                    />
                  </TabPane>
                  {/*===============================================================================================================*/}
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                          <Row className="mx-0">
                            <Col style={{ paddingTop: '46px', paddingBottom: '46px', paddingLeft: '66px', paddingRight: '69px' }}>

                              <AccountInfo mnemonic={this.state.mnemonic} {...this.props} address={this.state.address} ref={el => (this.componentRef = el)} />
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
const mapStateToProps = createSelector(
  getUserDetails(),
  (userDetails) => ({ userDetails }),
);

const mapDispatchToProps = {
  setUserDetails,
  updateUserDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
