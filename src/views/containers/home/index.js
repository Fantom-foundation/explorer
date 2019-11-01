// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { Title } from 'src/views/components/coreComponent';
import LatestTransactions from 'src/views/containers/home/latest-transactions';
import LatestBlocks from 'src/views/containers/home/latest-blocks';

import fantomIcon from 'src/assets/images/Logo/Fantom-Logo-icon.svg';

import { getBlockUpdateDetails } from 'src/storage/selectors/blocks';

import ToggleToolTip from './toggleToolTip';

type HomePageProps = {
    blockDetails?: {
        latestTransactions?: Array<any>,
        allBlockData?: Array<any>,
    },
};

function HomePage(props: HomePageProps) {
    const {
        blockDetails,
        blockDetails: {
            latestTransactions = [],
            allBlockData = [],
        } = {},
    } = props;

    if (blockDetails && latestTransactions) {
        return (
            <div>
                <section className="intro">
                    <Container className="intro-container">
                        <img
                            alt="Fantom icon"
                            src={fantomIcon}
                            className="icon"
                        />
                        <Row className="market-cap">
                            <div className="description">
                                <Title h2 className="text-white mb-0">
                                    <span>Beyond</span>
                                    <br />
                                    <span>Blockchain</span>
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
                            <LatestTransactions />
                            <Col className="middle" xs={12}>
                                <hr />
                            </Col>
                            <LatestBlocks latestBlocksArr={allBlockData.slice(0, 10)} />
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }

    return null;
}

const mapStateToProps = createSelector(
    getBlockUpdateDetails(),
    (blockDetails) => ({ blockDetails })
);

export default connect(mapStateToProps)(HomePage);
