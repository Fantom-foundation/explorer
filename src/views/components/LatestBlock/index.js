// @flow

import React from 'react';
import moment from 'moment';
import { Col } from 'reactstrap';

import blockIcon from 'src/assets/images/icons/block.svg';

type LatestBlockProps = {
    onBlockClick: (event: SyntheticEvent<HTMLDivElement>) => void,
    data: {
        hash: string,
        height: number,
        round: number,
        transactionLength: number,
        createdTime: number,
    },
};

function LatestBlock({ onBlockClick, data }: LatestBlockProps) {
    return (
        <Col
            xs={12}
            className="details"
            onClick={onBlockClick}
        >
            <p
                className="text-white ico"
                style={{ backgroundImage: `url(${blockIcon})` }}
            >
                {data.height}
            </p>
            <p className="text-ellipsis">
                <span className="text-white">Hash</span>
                <span className="text-primary hash-value">{data.hash}</span>
            </p>
            <p className="text-ellipsis">
                <span className="text-white">Round</span>
                <span className="text-primary">{data.round}</span>
            </p>
            <div className="ammount-date">
                <p className="mb-0">
                    <span className="text-white">Txns</span>
                    <span className="text-primary">{data.transactionLength}</span>
                </p>
                <p className="time-date text-white">
                    {moment(new Date(data.createdTime * 1000)).fromNow()}
                </p>
            </div>
        </Col>
    );
}

export default LatestBlock;
