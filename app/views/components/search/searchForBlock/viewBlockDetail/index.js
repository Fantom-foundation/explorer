import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Header from 'views/components/header/header';
import TransactionDetail from './transactionDetail';
import { Title } from '../../../../components/coreComponent';


/**
 * BlockDetail :  A component meant for displaying details of particuler block index.
 */

class BlockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionData: [],
      error: '',
    };
  }

  componentDidMount() {
    const { params } = this.props.match; // eslint-disable-line
    if (params) {
      const { id } = params;
      if (id !== '') {
        this.getFantomBlocks(id);
      }
    } else {
      this.props.history.push({ // eslint-disable-line
        pathname: '/blocks',
      });
    }
  }

  getFantomBlocks(searchBlockIndex) {
    const url = 'http://18.224.109.107:8080';
    fetch(`${url}/blockById/${searchBlockIndex}`)
            .then((response) => {
              if (response && response.status < 400) {
                return response.json();
              }
              throw new Error((response.statusText || 'Internal Server Error'));
            })
            .then((responseJson) => {
              if (responseJson) {
                this.loadFantomBlockData(responseJson);
              } else {
                this.setState({
                  transactionData: [],
                  error: 'No Record Found',
                });
              }
              return responseJson;
            })
            .catch((error) => {
              this.setState({
                transactionData: [],
                error: error.message || 'Internal Server Error',
              });
            });
  }

    /**
 * loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
 * @param {*} responseJson : Json of block response data from Api.
 */
  loadFantomBlockData(result) {
    let transactionData = [];

    if (result.transactions !== null) {
      result.transactions.map((transaction) => (
                transactionData.push({
                  transaction_hash: transaction.transactionHash,
                  block_id: result.index,
                  address_from: transaction.from,
                  address_to: transaction.to,
                  value: transaction.value,
                  txFee: '',
                  createdAt: '',
                  gasUsed: transaction.gasUsed !== null ? transaction.gasUsed : '',
                })
            ));

      transactionData = transactionData.reverse();
      this.setState({
        transactionData,
      });
    } else {
      this.setState({
        error: 'No Record Found!',
      });
    }
  }

  render() {
    const { transactionData, error } = this.state;

    return (
      <div>
        <Header />
        <section className="bg-theme full-height-conatainer">
          <Container>
            <Row className="title-header pt-3">
              <Col className="pt-3">
                <Title h2>Transactions</Title>
              </Col>
            </Row>
            <Row>
              {transactionData.length > 0 && <TransactionDetail transactions={transactionData} />}
              {error !== '' && <p>{error}</p>}
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default BlockDetail;
