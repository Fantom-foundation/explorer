import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from 'views/components/header/header';
import TransactionDetail from './transactionDetail';
import { Title } from '../../../../components/coreComponent';
import HttpDataProvider from '../../../../../utils/httpProvider';

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
      this.props.history.push({
        // eslint-disable-line
        pathname: '/blocks',
      });
    }
  }

  getFantomBlocks(searchBlockIndex) {
    HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
      query: `
          {
           block(index:${searchBlockIndex}) {
            id,payload
          }
          }`,
    })

      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.block
        ) {
          this.loadFantomBlockData(response.data.data);
        } else {
          this.setState({
            blockData: [],
            error: 'No Record Found',
          });
        }
      })
      .catch((error) => {
        this.setState({
          blockData: [],
          error: error.message || 'Internal Server Error',
        });
      });
  }

  /**
   * loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
   * @param {*} responseJson : Json of block response data from Api.
   */
  loadFantomBlockData(allData) {
    let transactionData = [];
    const result = allData.block.payload;
    if (result.transactions !== null) {
      result.transactions.map((transaction) => {
        transactionData.push({
          transaction_hash: transaction.transactionHash,
          block_id: result.index,
          address_from: transaction.from,
          address_to: transaction.to,
          value: transaction.value,
          txFee: '',
          createdAt: '',
          gasUsed: transaction.gasUsed !== null ? transaction.gasUsed : '',
        });
      });
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

  // loadFantomBlockData(allData) {
  //   const result = allData.payload;
  //   let blockData = [];
  //   const txLength =
  //     allData.payload.transactions !== null
  //       ? allData.payload.transactions.length
  //       : 0;
  //   blockData.push({
  //     height: result.index,
  //     hash: result.hash,
  //     round: result.round,
  //     transactions: txLength,
  //   });
  //   blockData = blockData.reverse();
  //   this.setState({
  //     blockData,
  //   });
  // }
  render() {
    const { transactionData, error } = this.state;
    return (
      <div>
        <Header />
        <section className="bg-theme full-height-conatainer">
          <Container>
            <Row className="title-header pt-3">
              <Col className="pt-3">
                <Title className="text-white" h2>
                  Transactions
                </Title>
              </Col>
            </Row>
            <Row>
              {transactionData.length > 0 && (
                <TransactionDetail transactions={transactionData} />
              )}
              {error !== '' && <p>{error}</p>}
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default BlockDetail;
