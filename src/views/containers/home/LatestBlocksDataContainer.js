// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { push } from 'connected-react-router/immutable';

import LatestTransactions from 'src/views/containers/home/latest-transactions';
import LatestBlocks from 'src/views/containers/home/latest-blocks';

import type { LocationShape } from 'react-router-dom';

type LatestBlocksDataContainerProps = {|
    historyPush: (string | LocationShape) => void,
    getLatestBlocksData: () => void,
    latestBlocksArr: Array<string>,
    latestTransactionsArr: Array<string>,
|};

function LatestBlocksDataContainer(props: LatestBlocksDataContainerProps) {
    const {
        historyPush,
        getLatestBlocksData,
        latestBlocksArr,
        latestTransactionsArr,
    } = props;

    React.useEffect(() => {
        getLatestBlocksData();
    }, [getLatestBlocksData]);

    return (
        <section id="latest-blocks" className="bg-theme">
            <Container>
                <Row>
                    <LatestTransactions
                        historyPush={historyPush}
                        latestTransactionsArr={latestTransactionsArr}
                    />
                    <Col className="middle" xs={12}>
                        <hr />
                    </Col>
                    <LatestBlocks
                        historyPush={historyPush}
                        latestBlocksArr={latestBlocksArr}
                    />
                </Row>
            </Container>
        </section>
    );
};

const mapStateToProps = () => ({
    latestBlocksArr: ['string'], // TODO: move to selectors
    latestTransactionsArr: ['string'], // TODO: move to selectors
});

const mapDispatchToProps = {
    historyPush: push,
    getLatestBlocksData: () => { // TODO: move to sagas
        return { type: 'GET_LATEST_BLOCKS_DATA' };
    }
};

export default connect<LatestBlocksDataContainerProps, {||}, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
)(LatestBlocksDataContainer);