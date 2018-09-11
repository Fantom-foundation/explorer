import React from 'react';
import {
  Container,
  Row,
  Col,
  TabContent,
} from 'reactstrap';
import { createAccountApi } from 'views/containers/apis/create-account';
import { validateEmailApi } from 'views/containers/apis/validate-email';
import Navbars from 'views/containers/navbars/index';
import Confirm from 'views/containers/tabs/confirm/index';
import Header from 'views/components/header';
import bip39 from 'bip39';
import AccountInformation from 'views/containers/tabs/account-data/index';
import Hdkey from 'hdkey';
import EthUtil from 'ethereumjs-util';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ValidateHelper from 'views/containers/validate-helper/index';
import { setUserDetails, updateUserDetails } from 'views/controllers/user-details/action';
import { getUserDetails } from 'views/controllers/user-details/selector';
import CreateAccount from 'views/containers/tabs/create-account/index';

//const helper = new ValidateHelper();
class HomePage extends React.Component {
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
      address: '',
      progressValue: 33.33,
    };
    this.toggle = this.toggle.bind(this);
  }
  // componentWillMount() {
  //   if (this.state.activeTab === '2') {
  //     this.getMnemonic();
  //   }
  // }
  onUpdate = (key, value) => {
    this.setState({
      [key]: value,
    });
  }
  handleClick = (event, isActive) => {
    event.preventDefault();
    if (isActive) {
      const object = {};
      object.user = this.state.email;
      object.icon = this.state.identiconsId;
      this.props.setUserDetails(object);
      this.toggle('2');
      // const createApiPromise = createAccountApi(this.state.email, this.state.password, this.state.repassword, this.state.password_hint, this.state.identiconsId, { ...this.props });
      // createApiPromise.then((result) => {
      //   if (result.status) {
      //     this.toggle('2');
      //     this.resetFields();
      //   }
      // }).catch((error) => {
      //   console.log('@@@error', error);
      // });
    } else if (this.state.mnemonic) {
      this.toggle('3');
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
      this.validPass(this, this.state);
    } else if (name === 'repassword') {
      this.validRepass();
    }
  }

  validAccountName = () => {
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
      obj.emailErrorText = 'Account Name field can\'t be empty';
    } else if (re.test(String(this.state.email).toLowerCase())) {
      this.validAccountName();
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
   // debugger;
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
      seed,
      address,
      mnemonic,
      pubKey,
      hexPrivateKey,
      masterPrivateKey,
    };
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
          {/* <Container className="bg-white theme-blue-shadow">
            <Navbars {...this.state} />
            <Row>
              <Col>
                <TabContent activeTab={this.state.activeTab}>
                  <CreateAccount
                    onUpdate={this.onUpdate}
                    validateData={this.validateData}
                    refreshData={this.refreshData}
                    handleClick={this.handleClick}
                    getRadioData={this.getRadioData}
                    isActive={isActive}
                    {...this.state}
                  />
                  <AccountInformation {...this.state} {...this.props} handleClick={this.handleClick} />
                  <Confirm />
                </TabContent>
              </Col>
            </Row>
          </Container> */}
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