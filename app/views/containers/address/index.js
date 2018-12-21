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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import moment from 'moment';
import Web3 from 'web3';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';

import SearchForAccount from '../../components/search/searchForAccount/index';
import { scientificToDecimal } from '../../components/utils/index';

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      transactionArray: [],
      isOpen: false,
      address: '0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4',
      activeTab: '1',
      searchText: '',
      transactionData: [],
      walletDetail: [],
      isValidSearchText: 1,
      error: '',
    };
  }
  /**
   * Fetching data from database using api address-transaction
   */
  componentWillMount() {
    return;
    fetch('http://localhost:3000/api/address-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: 'qscvfgrtmncefiur2345',
        address: '0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4',
        limit: 5,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ transactionArray: res.result });
      })
      .catch((error) => {
        console.log('error is !!!', error);
      });
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });

    const searchText = e.target.value.trim();
    if (searchText && searchText === '') {
      this.setState({
        walletDetail: [],
      });
    }
  }

  /**
   * getFantomBalanceFromApiAsync() :  Api to fetch wallet balance for given address of Fantom own endpoint.
   * @param { String } address : address to fetch wallet balance.
   */
  getFantomBalanceFromApiAsync(address) {
    const url = 'http://18.221.128.6:8080';
    console.log('address : ', address);
    // const { publicKey } = this.props;
    // const dummyAddress = '0xFD00A5fE03CB4672e4380046938cFe5A18456Df4';
    return fetch(`${url}/account/${address}`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          const balance = scientificToDecimal(responseJson.balance);
          const valInEther = Web3.utils.fromWei(`${balance}`, 'ether');
          //  const walletBalance =  Number(valInEther).toFixed(4);
          const walletDetail = [];

          walletDetail.push({
            address,
            balance: valInEther,
            nonce: responseJson.nonce,
          });
          this.setState({
            searchType: 'address',
            walletDetail,
          });
        } else {
          this.setState({
            walletDetail: [],
            error: 'No Record Found',
          });
        }
        return responseJson;
      })
      .catch((error) => {
        this.setState({
          walletDetail: [],
          error: error.message || 'Internal Server Error',
        });
      });
  }

  /**
   * searchHandler() :  Function to handle text written in search bar
   */
  searchHandler(e) {
    e.preventDefault();
    const { searchText } = this.state;

    if (searchText && searchText !== '') {
      const isValid = Web3.utils.isAddress(searchText);
      if (isValid) {
        this.getFantomBalanceFromApiAsync(searchText);
        this.setState({
          error: '',
        });
      } else {
        this.setState({
          walletDetail: [],
          error: 'Please enter valid address.',
        });
      }
    }
  }

  render() {
    const { searchText, walletDetail, address, error } = this.state;

    let addressText = '';
    if (walletDetail && walletDetail.length) {
      addressText = walletDetail[0].address;
    }

    return (
      <div>
        <Header />
        <section
          className="bg-theme full-height-conatainer"
          style={{ paddingBottom: '179px' }}
        >
          <Container>
            {/*= ========= make this title-header component start=================*/}
            <Row className="title-header pt-3">
              <Col className="pt-3">
                <Title h2 className="d-inline  mr-4 mb-0 ">
                  Address
                </Title>
                <Title h2 className="token d-inline mb-0">
                  <span className="">{addressText}</span>
                </Title>
              </Col>

              <Col xs={12} className="search-col">
                <div className="form-element form-input">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => this.searchHandler(e)}
                  >
                    {' '}
                    {/* eslint-line disable*/}
                    <input
                      id="search"
                      value={searchText}
                      className="form-element-field"
                      placeholder=" "
                      type="search"
                      required=""
                      onChange={(e) => this.setSearchText(e)}
                    />
                    <div className="form-element-bar" />
                    <label className="form-element-label" htmlFor="search">
                      Search by Address
                    </label>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
          {/* <hr /> */}
          <Container>
            {walletDetail.length > 0 && (
              <SearchForAccount
                accountDetail={walletDetail}
                isOpen={this.state.isOpen}
                toggle={this.toggle}
              />
            )}
            {error !== '' && <p>{error}</p>}
            {/* { <div className="address-details">
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
                        <td>1,099.667542570678819374 Ether</td>
                      </tr>
                      <tr>
                        <td>Ether Value:</td>
                        <td>$305,961.51 (@ $278.19/ETH)</td>
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
            </div>} */}
            {/*= ========= make this title-header component end=================*/}
            {/* <div id="theme-tab">
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
                  {<Row>
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
                              <td className="text-black">{txFee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>}
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col>
                      empty

                </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div> */}
          </Container>
        </section>
      </div>
    );
  }
}
