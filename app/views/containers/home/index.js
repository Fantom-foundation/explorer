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
import { createSelector } from 'reselect';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';
import { connect } from 'react-redux';
import fantomIcon from 'images/Logo/Fantom-Logo-icon.svg';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestTransactionsArr: [],
      latestBlocksArr: [],
    };
    this.handleRealTimeUpdate = this.handleRealTimeUpdate.bind(this);
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
    if (this.props.blockDetails && this.props.blockDetails.latestTransactions) {
      return (
        <div>
          <Header {...this.props} />
          <section
            className="intro"
            style={{ paddingTop: '89px', paddingBottom: '27px' }}
          >
            {' '}
            <Container className="intro-container">
              {/* <img src={fantomIcon} className="icon" /> */}
              <MarketCap
                handleRealTimeUpdate={this.props.handleRealTimeUpdate}
              />
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
                  latestTransactionsArr={this.props.blockDetails.latestTransactions.slice(
                    0,
                    9
                  )}
                  history={this.props.history}
                />
                <Col className="middle" xs={12}>
                  <hr />
                </Col>
                <LatestBlocks
                  latestBlocksArr={this.props.blockDetails.allBlockData.slice(
                    0,
                    9
                  )}
                  history={this.props.history}
                />
              </Row>
            </Container>
          </section>
          <Footer />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createSelector(
  getBlockUpdateDetails(),
  (blockDetails) => ({ blockDetails })
);

export default connect(
  mapStateToProps,
  null
)(HomePage);
