import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap';
import moment from 'moment';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionArray: [],
    };
  }
  /**
* @api_key: send private key for security purpose
* here call a api get-transactions and get data from transactions table.
*/
  componentWillMount() {
    fetch(
      'http://localhost:3000/api/get-transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: 'qscvfgrtmncefiur2345',
          limit: 5,
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
  render() {
    const transactions = this.state.transactionArray;
    return (
      <div>
        <Header />
        <section className="bg-theme full-height-conatainer">
          <Container>


            {/*========== make this title-header component start=================*/}

            <Row className="title-header pt-3">
              <Col className="pt-3">
                <Title h2>Transaction</Title>
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
                <Table className="transactions-table">
                  <thead className="dark">
                    <tr>
                      <th>txHash</th>
                      <th>Block</th>
                      <th>Age</th>
                      <th>From</th>
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
                        <td className="text-black">{data.address_to}</td>
                        <td className="text-black">{data.value}</td>
                        <td className="text-black">225.205</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}
