// @flow

import React, { useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { push } from 'connected-react-router';

import { Title } from 'src/views/components/coreComponent';
import LatestBlock from 'src/views/components/LatestBlock';
import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

type LatestBlocksProps = {
    push: ({ pathname: string }) => void,
    latestBlocksArr: Array<{|
        hash: string,
        height: number,
        round: number,
        transactionLength: number,
        createdTime: number,
    |}>,
};

function LatestBlocks(props: LatestBlocksProps) {
    const {
        push,
        latestBlocksArr: blocks,
    } = props;
    const onBlockClick = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
        const { dataset: { blockHeight } } = e.currentTarget;

        push({
            pathname: `/blocks/${blockHeight}`,
        });
    }, [push]);

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
                {blocks &&
                blocks.length &&
                blocks.map((data) => (
                    <LatestBlock
                        key={data.height}
                        onBlockClick={onBlockClick}
                        data={data}
                    />
                ))}
            </Row>
        </Col>
    );
}

export default connect(
    null,
    { push },
)(LatestBlocks);
