import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Title } from 'views/components/coreComponent/index';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import fantomIcon from 'images/Logo/Fantom-Logo-icon.svg';
import LatestTransactions from 'views/containers/home/latest-transactions';
import LatestBlocks from 'views/containers/home/latest-blocks';

import { createSelector } from 'reselect';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';

import ToggleToolTip from './toggleToolTip';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestTransactionsArr: [],
      latestBlocksArr: [],
    };
  }

  render() {
    const { blockDetails, history } = this.props;
    const { latestTransactions, allBlockData } = blockDetails;
    if (blockDetails && latestTransactions) {
      return (
        <div>
          <Header {...this.props} />
          <section
            className="intro"
            style={{ paddingTop: '89px', paddingBottom: '27px' }}
          >
            {' '}
            <Container className="intro-container">
              <img src={fantomIcon} className="icon" />
              <Row className="market-cap">
                <div className="discription">
                  <Title h2 className="text-white mb-0">
                    Beyond
                  </Title>
                  <Title h2 className="text-white">
                    Blockchain
                  </Title>
                  <p className="mb-0">The Future of Decentralized Ecosystem</p>
                </div>
              </Row>
            </Container>
          </section>
          <section>
            <Container>
              <hr />
              <ToggleToolTip />
            </Container>
          </section>
          <section id="latest-blocks" className="bg-theme">
            <Container>
              <Row>
                <LatestTransactions history={history} />
                <Col className="middle" xs={12}>
                  <hr />
                </Col>
                <LatestBlocks
                  latestBlocksArr={allBlockData.slice(0, 10)}
                  history={history}
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
