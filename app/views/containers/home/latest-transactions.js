import React from 'react';
import { Row, Col } from 'reactstrap';
// import moment from 'moment';
import PropTypes from 'prop-types';
import { Title } from 'views/components/coreComponent/index';
import TitleIcon from '../../../images/icons/latest-transaction.svg';
import transactionIcon from '../../../images/icons/transactions.svg';
import { Link } from 'react-router-dom';

/**
 * @class LatestTransactions : To display list of latest transactions.
 * @param {array} latestTransactionsArr : List of latest transactions.
 */

export default class LatestTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionArray: [],
    };
    this.onTransactionClick = this.onTransactionClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.latestTransactionsArr &&
      nextProps.latestTransactionsArr.length
    ) {
      const transactions = [];
      nextProps.latestTransactionsArr.forEach((val) => {
        const {
          contractAddress,
          cumulativeGasUsed,
          from,
          gas,
          root,
          to,
          transactionHash,
          value,
          logsBloom,
          status,
        } = val;

        transactions.push({
          address_from: from,
          transaction_hash: transactionHash,
          address_to: to,
          value,
          gasUsed: gas,
          cumulativeGasUsed,
          contractAddress,
          root,
          logsBloom,
          status,
        });
      });
      this.setState({
        transactionArray: transactions,
      });
    }
  }

  onTransactionClick(props, data) {
    props.history.push({
      pathname: '/transactions',
      state: { data, type: 'transaction' },
    });
  }

  render() {
    const transactions = this.state.transactionArray;
    return (
      <Col xs={12} md={6} className="left">
        <div className="header">
          <Title
            h2
            className="text-uppercase"
            style={{ backgroundImage: `url(${TitleIcon})` }}
          >
            Latest Transactions
          </Title>

          <Link to="/transactions" className="btn">
            View all
          </Link>
        </div>
        <Row className="blocks">
          {transactions &&
            transactions.length &&
            transactions.map((data, index) => (
              <Col
                key={index}
                xs={12}
                className="details"
                onClick={() => this.onTransactionClick(this.props, data)}
              >
                <p
                  className="tx-holder text-ellipsis ico"
                  style={{ backgroundImage: `url(${transactionIcon})` }}
                >
                  <span className="text-white">TX#</span>
                  &nbsp;
                  <span className="text-primary tx-value">
                    {data.transaction_hash}
                  </span>
                </p>
                <div className="s-to-r">
                  <p className="pb-2 mb-1 text-ellipsis">
                    <span className="text-white">From</span>
                    &nbsp;
                    <span className="text-primary from-value">
                      {data.address_from}
                    </span>
                    &nbsp;
                  </p>
                  <p className="text-ellipsis">
                    <span className="text-white ">to</span>
                    &nbsp;
                    <span className="text-primary to-value">
                      {data.address_to}
                    </span>
                  </p>
                </div>
                <div className="ammount-date">
                  <p className="mb-0">
                    <span className="text-white">Amount </span>
                    &nbsp;
                    <span className="text-primary">{data.value} FTM</span>
                  </p>
                  {/* <p className="time-date text-white">
                    {moment(parseInt(data.createdAt, 10)).fromNow()}
                  </p> */}
                </div>
              </Col>
            ))}
        </Row>
      </Col>
    );
  }
}

LatestTransactions.propTypes = {
  latestTransactionsArr: PropTypes.array,
};
