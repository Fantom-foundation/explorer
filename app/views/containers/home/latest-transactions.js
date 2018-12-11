import React from 'react';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import { Title } from 'views/components/coreComponent/index';
import { addLocaleData } from 'react-intl';
import TitleIcon from  '../../../images/icons/latest-transaction.svg';
import HttpDataProvider from '../../../../app/utils/httpProvider';

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
  // componentWillMount() {
  //   fetch(
  //     'http://localhost:3000/api/get-transactions',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         api_key: 'qscvfgrtmncefiur2345',
  //         limit: 5,
  //       },
  //     },
  //   )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     this.setState({ transactionArray: res.result });
  //   }).catch((error) => {
  //     console.log('error is !!!', error);
  //   });
  // }

  componentDidMount() {
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
      {
        transactions(first:10) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              hash
              from
              to
              block
              value
              gas
              cumulative
              contract
              root
            }
          }
        }
      }`,
    })
      .then(
        (res) => {
          if (res && res.data) {
            // this.formatTransactionList(res.data);
            const allTransactionData = [];
            const edges = res.data.data.transactions.edges;
            let cursor;
            edges.forEach((val) => {
              const {
                block,
                from,
                hash,
                to,
                value,
                gas,
                cumulative,
                contract,
                root,
              } = val.node;
              cursor = val.cursor;

              allTransactionData.push({
                block_id: block,
                address_from: from,
                transaction_hash: hash,
                address_to: to,
                value,
                gasUsed: gas,
                cumulativeGasUsed: cumulative,
                contractAddress: contract,
                root,
              });
            });
            this.setState({
              transactionArray: allTransactionData,
              cursor,
            });
            console.log('allTransactionData', allTransactionData);
          }
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch((err) => {
        console.log(err, 'err in graphql');
      });
  }
  render() {
    const transactions = this.state.transactionArray;
    return (
      <Col xs={12} md={6}>
        <Row className="header">
          <Col className="icon"  style={{backgroundImage:`url(${TitleIcon})`}} ><Title h2 className="text-uppercase mb-0">Latest Transactions</Title></Col>
          <Col className="link-column"><a href="/transactions" className="btn">View all</a></Col>
        </Row>
        <Row className="blocks">
          {transactions && transactions.length && transactions.length > 0 && transactions.map((data, index) => (
            <Col key={index} xs={12} className=" mb-3">
              <Row>
                <Col className="pr-0">
                  <p className="tx-holder">
                    <span className="text-white">TX#</span>&nbsp;
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
