import React from 'react';
import {
  Container,
  Row,
  Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
  // Progress,
  Button, Form, FormGroup, Label, Input, FormText,
} from 'reactstrap';


import identicon1 from '../../../images/identicon/ident-con-1.png';
import arrowLeft from '../../../images/icons/arrow-left.svg';
import arrowRight from '../../../images/icons/arrow-right.svg';
import cross from '../../../images/icons/cross.svg';
import refreshIcon from '../../../images/icons/refresh-icon.svg';



import { Progress, Refresh } from '../../components/Core/Core';
import classnames from 'classnames';
import Header from '../../components/Header';
export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      email: '',
      password: '',
      password_hint: '',
      re_password: '',
    };
    this.toggle = this.toggle.bind(this);
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
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
                        <div className="cs-container forms-container theme-blue-shadow inner mb-4">
                          <Row>
                            <Col sm="12" className="px-5 py-3">



                              <Form>
                                <FormGroup>
                                  {/* <Label for="exampleEmail">Email</Label> */}
                                  <Input type="text" name="text" className="theme-blue" id="exampleEmail" placeholder="Account name" />
                                  <p className="Form-Text error mt-3">You need to specify a valid account name</p>
                                </FormGroup>

                                <Row>
                                  <Col sm={6}>
                                    <FormGroup>
                                      <Input type="password" name="password" className="theme-blue" id="exampleEmail" placeholder="Password" />
                                    </FormGroup>
                                  </Col>
                                  <Col sm={6}>
                                    <FormGroup>
                                      <Input type="password" name="password" className="theme-blue" id="exampleEmail" placeholder="Re- enter Password" />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <FormGroup>
                                  <Input type="password" name="password" className="theme-blue" id="exampleEmail" placeholder="Password hint" />
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
  <Row className="mx-0">
    <Col>
<ul className="identicon m-0 p-0 text-right  ">
  <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
       <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
       <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
       <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
       <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
       <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
       <li>
       <label class="form-radio-label">
                <input name="name" class="form-radio-field" type="radio" value="vagatarian food" />
                <i class="form-radio-button"></i>
                <img src={identicon1} />
            </label>
        </li>
   </ul>
   </Col>
   <Col className="identicon-refresh"> <img src={refreshIcon} alt="Refresh" />  </Col>
   </Row>

                          <ul className="form-footer-buttons">
                            <li>
                              <span style={{ backgroundImage: `url(${cross})` }}>Close</span>
                            </li>
                            <li>
                              <span style={{ backgroundImage: `url(${arrowLeft})` }}>Back</span>
                            </li>
                            <li>
                              <span className="disabled" style={{ backgroundImage: `url(${arrowRight})` }}>Next</span>
                            </li>
                          </ul>


                        </div>




                        <Row className="account-footer">
                          <Col>
                            <p className="text-center">This password encrypts your private key. This does not act as a speed to generate your keys. You will need this password + Mnemonic to unlock your wallet</p>
                            <ul className="text-center">
                              <li><span>How to Create a Wallet</span></li>
                              <li className="pl-3"><span>Getting Started</span></li>
                            </ul>
                          </Col>
                        </Row>


                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="6">
                        ijghyju
                          ryrty
                          </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="3">
                    <Row>
                      <Col >
                        ijghyju
                          ryrty
                      </Col>
                    </Row>
                  </TabPane>


                </TabContent>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}