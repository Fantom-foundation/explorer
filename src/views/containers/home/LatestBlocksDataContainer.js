// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import LatestTransactions from 'src/views/containers/home/latest-transactions';
import LatestBlocks from 'src/views/containers/home/latest-blocks';
import Loader from 'src/views/components/Loader';

import { getLatestBlocksData, unsubscribeToNewBlocks } from 'src/storage/actions/latestBlocksData';
import { getLatestBlocksSelector } from 'src/storage/selectors/latestBlocksData';

import type { LocationShape } from 'react-router-dom';
import type { Transaction, Block } from 'src/utils/types';

type LatestBlocksDataContainerProps = {|
    getLatestBlocksData: () => void,
    unsubscribeToNewBlocks: () => void,
    latestBlocksArr: Array<Block<string>>,
    latestTransactionsArr: Array<Transaction>,
    isLoading: boolean,
|};

function LatestBlocksDataContainer(props: LatestBlocksDataContainerProps) {
    const {
        getLatestBlocksData,
        unsubscribeToNewBlocks,
        latestBlocksArr,
        latestTransactionsArr,
        isLoading,
    } = props;

    const history = useHistory();
    const historyPush = React.useCallback((path: string | LocationShape) => {
        history.push(path);
    }, [history]);

    React.useEffect(() => {
        getLatestBlocksData();

        return unsubscribeToNewBlocks;
    }, [getLatestBlocksData, unsubscribeToNewBlocks]);

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
                {isLoading && <Loader />}
            </Container>
        </section>
    );
}

const mapStateToProps = getLatestBlocksSelector;

const mapDispatchToProps = {
    getLatestBlocksData,
    unsubscribeToNewBlocks,
};

export default connect<LatestBlocksDataContainerProps, {||}, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
)(LatestBlocksDataContainer);