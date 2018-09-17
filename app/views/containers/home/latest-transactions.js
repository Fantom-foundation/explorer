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
  componentWillMount() {
    const payload = {
      api_key: 'qscvfgrtmncefiur2345',
    };
    fetch(
      'http://localhost:3000/api/get-transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      <Col className="left">
        <Row className="header bg-white mb-3 pt-2 pb-3">
          <Col><Title h2 className="text-uppercase mb-0">Latest Transactions</Title></Col>
          <Col className="link-column"><a href="/transactions" className="link pt-2">View all</a></Col>
        </Row>
        <Row className="blocks">
          {transactions && transactions.length && transactions.length > 0 && transactions.map((data, index) => (
            <Col key={index} xs={12} className="bg-white  mb-3">
                    <Row>
                      <Col className="pr-0">
                        <p>
                          <span className="text-black">TX#</span>&nbsp;
                          <span className="text-primary">{data.transaction_hash}</span>
                        </p>
                      </Col>
                      <Col className="time-date-col pl-0">
                        <p><span className="text-primary">{moment(parseInt(data.createdAt, 10)).fromNow()}</span></p>
                      </Col>
                    </Row>
                    <p className="pb-2 mb-1">
                      <span className="text-gray">From</span>&nbsp;
                      <span className="text-primary">{data.address_from}</span>&nbsp;
    
                      <span className="text-gray">to</span>&nbsp;
                      <span className="text-primary">{data.address_to}</span>
                    </p>
                    <p className="mb-0">
                      <span className="text-gray">Amount 2.9999</span>&nbsp;
                      <span className="text-primary">Fantom</span>
                    </p>
                  </Col>))}
          {/* {_.times(5, (i) =>
                  (<Col key={i} xs={12} className="bg-white  mb-3">
                    <Row>
                      <Col className="pr-0">
                        <p>
                          <span className="text-black">TX#</span>&nbsp;
                          <span className="text-primary">0X42BB307E4C04F0BF13B7952</span>
                        </p>
                      </Col>
                      <Col className="time-date-col pl-0">
                        <p><span className="text-primary">23 mins 42 secs</span></p>
                      </Col>
                    </Row>
                    <p className="pb-2 mb-1">
                      <span className="text-gray">From</span>&nbsp;
                      <span className="text-primary">0x04041d6a6bbbc2…</span>&nbsp;
    
                      <span className="text-gray">to</span>&nbsp;
                      <span className="text-primary">0xf4a2eff88a408ff4c4550148…</span>
                    </p>
                    <p className="mb-0">
                      <span className="text-gray">Amount 2.9999</span>&nbsp;
                      <span className="text-primary">Fantom</span>
                    </p>
                  </Col>)
                    )} */}
        </Row>
      </Col>
    );
  }
}
