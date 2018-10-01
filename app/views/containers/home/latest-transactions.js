import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import { Title } from 'views/components/coreComponent/index';
import { addLocaleData } from 'react-intl';

export default class LatestTransactions extends React.Component {
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
      <Col xs={12} md={6} className="left" >
        <Row className="header bg-white mb-3 pt-2 pb-3">
          <Col><Title h2 className="text-uppercase mb-0">Latest Transactions</Title></Col>
          <Col className="link-column"><a href="/transactions" className="link pt-2 text-black">View all</a></Col>
        </Row>
        <Row className="blocks">
          {transactions && transactions.length && transactions.length > 0 && transactions.map((data, index) => (
            <Col key={index} xs={12} className="bg-white  mb-3">
              <Row>
                <Col className="pr-0">
                  <p className="tx-holder">
                    <span className="text-black">TX#</span>&nbsp;
                    <span className="text-primary tx-value">{data.transaction_hash}</span>
                  </p>
                </Col>
                <Col className="time-date-col pl-0">
                  <p><span className="text-primary">{moment(parseInt(data.createdAt, 10)).fromNow()}</span></p>
                </Col>
              </Row>
              <p className="pb-2 mb-1 from-to-holder">
                <span className="text-gray">From</span>&nbsp;
                <span className="text-primary from-value">{data.address_from}</span>&nbsp;
    
                <span className="text-gray">to</span>&nbsp;
                <span className="text-primary to-value">{data.address_to}</span>
              </p>
              <p className="mb-0">
                <span className="text-gray">Amount 2.9999</span>&nbsp;
                <span className="text-primary">Fantom</span>
              </p>
            </Col>))}
        </Row>
      </Col>
    );
  }
}
