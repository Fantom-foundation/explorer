// @flow

import React from 'react';
import moment from 'moment';
import { Col } from 'reactstrap';

import blockIcon from 'src/assets/images/icons/block.svg';

import type { Block } from 'src/utils/types';
type LatestBlockProps = {
    onBlockClick: (event: SyntheticEvent<HTMLDivElement>) => void,
    data: Block,
};

function LatestBlock({ onBlockClick, data }: LatestBlockProps) {
    return (
        <Col
            xs={12}
            className="details"
            onClick={onBlockClick}
            data-block-height={data.number}
        >
            <p
                className="text-white ico"
                style={{ backgroundImage: `url(${blockIcon})` }}
            >
                {data.number}
            </p>
            <p className="text-ellipsis">
                <span className="text-white">Hash</span>
                &nbsp;
                <span className="text-primary hash-value">{data.hash}</span>
            </p>
            {/*<p className="text-ellipsis">*/}
            {/*    <span className="text-white">Round</span>*/}
            {/*    <span className="text-primary">{data.round || 0}</span>*/}
            {/*</p>*/}
            <div className="ammount-date">
                <p className="mb-0">
                    <span className="text-white">Txns</span>
                    &nbsp;
                    <span className="text-primary">{data.transactions}</span>
                </p>
                <p className="time-date text-white">
                    {moment(new Date(data.timestamp * 1000)).fromNow()}
                </p>
            </div>
        </Col>
    );
}

export default LatestBlock;
