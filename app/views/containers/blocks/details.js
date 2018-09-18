import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText,
} from 'reactstrap';
import classnames from 'classnames';

import ChatTab from '../../components/chat/chatTab';

import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';

export default class Deatails extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
      
    render() {
        return (
            <div>
                <Header />
                <section className="bg-theme full-height-conatainer" style={{paddingBottom:'60px'}}>
                    <Container>




{/*========== make this title-header component start=================*/}

                        <Row className="title-header pt-3">
                            <Col className="pt-3">
                            <Title h2>Blocks</Title>
                                </Col>
                            <Col>
                                <div className="form-element form-input">
                                    <input id="search" className="form-element-field" placeholder=" " type="search" required="" />
                                    <div className="form-element-bar"></div>
                                    <label className="form-element-label" htmlFor="search">Search by Address / Txhash / Block Heights</label>

                                </div>
                            </Col>
                        </Row>


{/*========== make this title-header component end=================*/}


                        <Row>
                            <Col>
          

<div id="theme-tab">
<Nav tabs className="mb-3 theme-nav">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Overview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Comments
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="theme-nav-tab-content" activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
               










            <Row>
                <Col>
                    <Table className="information-table">
                        <thead>
                            <tr>
                                <th>Block Information</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Height:</td>
                                <td>16221280</td>
                            </tr>
                            <tr>
                                <td>TimeStamp:</td>
                                <td>18 mins ago (Aug-27-2018 06:05:07 AM +UTC)</td>
                            </tr>
                            <tr>
                                <td>Transactions:</td>
                                <td><span className="text-primary">87 transactions</span> and <span className="text-primary">12 contract internal transactions in this block</span></td>
                            </tr>
                            <tr>
                                <td>Hash:</td>
                                <td>0x534d9b6e781c22587e5e54fb516c153cca2ea914a0dee5f8049372a1c3f43086</td>
                            </tr>
                            <tr>
                                <td>Parent Hash:</td>
                                <td><span className="text-primary">0xe31ce580c928a1655ebb1dadf197f5a21ecb741301668856b5a9e846c2482368</span></td>
                            </tr>
                            <tr>
                                <td>Sha3Uncles:</td>
                                <td>0x0b98218248431f4d47c692e87f78cec61b284ea32ff89eb3c22b77bffe956b18</td>
                            </tr>
                            <tr>
                                <td>Mined By:</td>
                                <td><span className="text-primary">0xea674fdde714fd979de3edf0f56aa9716b898ec8</span> (Ethermine) in 6 secs</td>
                            </tr>
                            <tr>
                                <td>Difficulty:</td>
                                <td>3,423,344,251,341,734</td>
                            </tr>
                            <tr>
                                <td>Total Difficulty:</td>
                                <td>6,260,786,548,854,986,977,920</td>
                            </tr>
                            <tr>
                                <td>Size:</td>
                                <td>31716 bytes</td>
                            </tr>
                            <tr>
                                <td>Gas Used:</td>
                                <td>7,938,009 (99.22%)</td>
                            </tr>
                            <tr>
                                <td>Gas Limit:</td>
                                <td>8,000,029</td>
                            </tr>
                            <tr>
                                <td>Nonce:</td>
                                <td>0x941b7c6c045b1e57</td>
                            </tr>
                            <tr>
                                <td>Block Reward:</td>
                                <td>3.13651355500625139 Ether (3 + 0.04276355500625139 + 0.09375)</td>
                            </tr>
                            <tr>
                                <td>Uncles Reward:</td>
                                <td>1.5 Ether (1 Uncle at <span className="text-primary">>Position 0</span>)</td>
                            </tr>
                            <tr>
                                <td>Extra Data:</td>
                                <td>ethermine-asia1-5 (Hex:0x65746865726d696e652d61736961312d35)</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>





              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
                <Col>
                    <Table className="information-tale">
                        <thead>
                            <tr>
                                <th>Block Information</th>
                                <th></th>
                            </tr>
                        </thead>
                    </Table>
              </Col>
            </Row>
            <Row>
                <Col className="px-5">

{/*=======Chat Section=======*/}
<ChatTab />

                </Col>
            </Row>
          </TabPane>
        </TabContent>
        </div>


                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(HomePage);
