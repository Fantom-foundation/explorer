import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      transactionArray: [],
      isOpen: false,
      address: '0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4',
      activeTab: '1'
    };
  }
  componentWillMount() {
    fetch(
          'http://localhost:3000/api/address-transaction',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: 'qscvfgrtmncefiur2345',
          address: '0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4',
        },
      },
        )
        .then((res) => res.json())
        .then((res) => {
          this.setState({ transactionArray: res.result });
        }).catch((error) => {
          console.log('error is !!!', error);
        });
  }
  // toggle = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen,
  //   });
  // }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const transactions = this.state.transactionArray;
    const isOpen = this.state.isOpen;
    return (
      <div>
        <Header />
        <section className="bg-theme full-height-conatainer" style={{paddingBottom: '179px'}}>
          <Container>


            {/*========== make this title-header component start=================*/}

            <Row className="title-header pt-3">
              <Col className="pt-3">
                <Row>
                <Col className="pr-0"><Title h2>Address</Title></Col>
                <Col className="token-col pt-2 pl-0"><Title h2 className="token">{this.state.address}</Title></Col>
                </Row>
              </Col>
              <Col md={5}>
                <div className="form-element form-input">
                  <input id="search" className="form-element-field" placeholder=" " type="search" required="" />
                  <div className="form-element-bar"></div>
                  <label className="form-element-label" htmlFor="search">Search by Address / Txhash / Block Heights</label>
                </div>
              </Col>
            </Row>
            </Container>
            <hr />
            <Container>
              <div className="address-details">
            <Row>
              <Col>
                   <Title h2>OverView | <span className="gray">Eathermine</span></Title>
                </Col>
            </Row>
            <Row>
              <Col>
               <Table>
                 <tbody>
                 
                 <tr>
                   <td>Balance:</td>
                   <td>1,099.667542570678819374 Etder</td>
                 </tr>
                 <tr>
                   <td>Etder Value:</td>
                   <td>$305,961.51 (@ $278.19/Etd)</td>
                 </tr>
                 <tr>
                   <td>Mined:</td>
                   <td>994949 blocks and 106163 uncles</td>
                 </tr>
                 <tr>
                   <td>Transactions:</td>
                   <td>13990519 txns</td>
                 </tr>
               </tbody>
               </Table>
             </Col>
              <Col>
               <Table>
                 <tbody>  
                 <tr>
                   <td><strong>Misc</strong></td>
                   <td>Toggle Dropdown</td>
                 </tr>
                 <tr>
                   <td colSpan="2">Address Watch: Add To Watch List</td>
                 </tr>
                 <tr>
                   <td>Token Balances:</td>
                   <td><Dropdown direction="down" isOpen={this.state.isOpen} toggle={this.toggle}>
                     <DropdownToggle caret>
                       Dropup
                     </DropdownToggle>
                     <DropdownMenu>
                       <DropdownItem>Another Action</DropdownItem>
                       <DropdownItem>Another Action</DropdownItem>
                     </DropdownMenu>
                   </Dropdown></td>
                 </tr>
               </tbody>
               </Table></Col>
            </Row>

            </div>

            {/*========== make this title-header component end=================*/}




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
              <Col>
                <Table className="transactions-table">
                  <thead className="dark bg-white">
                    <tr>
                      <th>txHash</th>
                      <th>Block</th>
                      <th>Age</th>
                      <th>From</th>
                      <th></th>
                      <th>To</th>
                      <th>Value</th>
                      <th>[TxFee]</th>
                      {/* <th>Uncles</th>
                                            <th>Miner</th>
                                            <th>GasUsed</th>
                                            <th>GasLimit</th>
                                            <th>Avg.GasPrice</th>
                                            <th>Reward</th> */}
                    </tr>
                  </thead>
                  <tbody className="scroll-theme-1">
                    {transactions && transactions.length && transactions.length > 0 && transactions.map((data, index) => (
                      <tr key={index}>
                        <td className="text-black">{data.transaction_hash}</td>
                        <td className="text-black">{data.block_id}</td>
                        <td className="text-black">{moment(parseInt(data.createdAt, 10)).fromNow()}</td>
                        <td className="text-black">{data.address_from}</td>
                        <td>
                        {this.state.address === data.address_from ?
                      <Button color="red">OUT</Button>
                       : 
                      <Button color="green">IN</Button>
                      }
                        </td>
                        <td className="text-black">{data.address_to}</td>
                        <td className="text-black">{data.value}</td>
                        <td></td>
                      </tr>
                                        ))}
                    {/* {_.times(20, (i) =>
                                        <tr>
                                            <td className="text-primary">6197846</td>
                                            <td className="text-gray-dark">30 secs ago</td>
                                            <td className="text-black">101</td>
                                            <td className="text-primary">1</td>
                                            <td className="text-gray">Ethermine</td>
                                            <td className="text-black">7987286 (99.84%)</td>
                                            <td className="text-primary">0.00000524</td>
                                            <td className="text-gray">0.00000524</td>
                                            <td className="text-black">3.07095 FTM</td>
                                        </tr>
                                    )} */}
                  </tbody>
                </Table>
              </Col>
            </Row>



        
          </TabPane>
          <TabPane tabId="2">
            <Row>
                <Col>
                    empty

                </Col>
            </Row>
          </TabPane>
        </TabContent>
        </div>
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
