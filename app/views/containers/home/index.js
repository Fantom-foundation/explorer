import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import io from 'socket.io-client';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import LatestTransactions from 'views/containers/home/latest-transactions';
import LatestBlocks from 'views/containers/home/latest-blocks';
import MarketCap from 'views/containers/home/market-cap';
import Chart from 'views/containers/chart/index';
import HttpDataProvider from '../../../utils/httpProvider';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestTransactionsArr: [],
      latestBlocksArr: [],
    };
    this.handleRealTimeUpdate = this.handleRealTimeUpdate.bind(this);
  }

  /**
   * Get list of latest blocks and latest transactions.
   */
  componentDidMount() {
    this.fetchLatestBlocks();
  }

  /**
   * @method fetchLatestBlocks : To get list of latest blocks and latest transactions.
   */
  fetchLatestBlocks() {
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
      {
        blocks(first: 10, by: "index", byDirection: "desc") {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor,
            node {
              id,
              payload
            }
          }
        }
      }`,
    })
      .then(
        (res) => {
          if (res && res.data) {
            const allData = res.data;
            if (
              allData.data &&
              allData.data.blocks &&
              allData.data.blocks.edges &&
              allData.data.blocks.edges.length
            ) {
              const edges = allData.data.blocks.edges;
              let cursor;
              const latestTransactions = [];
              const allBlockData = [];

              edges.forEach((val) => {
                const {
                  hash,
                  index,
                  stateHash,
                  transactions,
                  round,
                } = val.node.payload;

                latestTransactions.push(...val.node.payload.transactions);
                cursor = val.cursor;
                allBlockData.push({
                  hash,
                  height: index,
                  parentHash: stateHash,
                  transactionLength: transactions.length,
                  round,
                  transactions,
                });
              });
              this.setState({
                latestBlocksArr: allBlockData,
                cursor,
                latestTransactionsArr: latestTransactions,
              });
            } else {
              this.setState({
                latestBlocksArr: [],
                latestTransactionsArr: [],
              });
            }
          }
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch(() => {
        this.setState({
          latestBlocksArr: [],
          latestTransactionsArr: [],
        });
      });
  }

  /**
   * @method handleRealTimeUpdate : To update list of latest blocks and transactions, If real time update is enabled.
   */
  handleRealTimeUpdate() {
    this.fetchLatestBlocks();
  }

  render() {
    // const socket = io();
    const { latestBlocksArr, latestTransactionsArr } = this.state;
    return (
      <div>
        <Header {...this.props} />
        <section
          className="intro"
          style={{ paddingTop: '89px', paddingBottom: '27px' }}
        >
          {' '}
          <Container className="intro-container">
            <MarketCap handleRealTimeUpdate={this.handleRealTimeUpdate} />
            {/* <Row>
              <Col>
                <Chart />
              </Col>
            </Row> */}
          </Container>
        </section>
        <section>
          <Container>
            <hr />
          </Container>
        </section>
        <section id="latest-blocks" className="bg-theme">
          <Container>
            <Row>
              <LatestTransactions
                latestTransactionsArr={latestTransactionsArr}
                history={this.props.history}
              />
              <Col className="middle" xs={12}>
                <hr />
              </Col>
              <LatestBlocks
                latestBlocksArr={latestBlocksArr}
                history={this.props.history}
              />
            </Row>
          </Container>
        </section>
        <Footer />
      </div>
    );
  }
}
