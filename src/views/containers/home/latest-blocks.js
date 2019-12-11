// @flow

import React, { useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import {
    Link,
    type LocationShape,
} from 'react-router-dom';

import { Title } from 'src/views/components/coreComponent';
import LatestBlock from 'src/views/components/LatestBlock';
import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

import type { Block } from 'src/utils/types';

type LatestBlocksProps = {
    historyPush: (string | LocationShape) => void,
    latestBlocksArr: Array<Block>,
};

function LatestBlocks(props: LatestBlocksProps) {
    const {
        historyPush,
        latestBlocksArr,
    } = props;
    const onBlockClick = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
        const { dataset: { blockHeight } } = e.currentTarget;

        historyPush({
            pathname: `/blocks/${blockHeight}`,
        });
    }, [historyPush]);

    return (
        <Col xs={12} md={6} className="right">
            <div className="header">
                <Title
                    h2
                    className="text-uppercase l-b"
                    style={{ backgroundImage: `url(${TitleIcon})` }}
                >
                    Latest Blocks
                </Title>
                <Link to="/blocks" className="btn">
                    View all
                </Link>
            </div>
            <Row className="blocks">
                {
                    latestBlocksArr.length > 0
                        ? latestBlocksArr.map((block) => (
                            <LatestBlock
                                key={block.number}
                                onBlockClick={onBlockClick}
                                data={block}
                            />
                        ))
                        : null
                }
            </Row>
        </Col>
    );
}

export default LatestBlocks;
