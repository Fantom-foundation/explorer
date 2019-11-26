// @flow

import * as React from 'react';
import { Row, Col } from 'reactstrap';

import { WindowSize } from 'src/views/components/PageSizeWatcher';

import TransactionIcon from 'src/assets/images/icons/transactions.svg';

type TransactionBlockHeaderProps = {
    title: string,
    block: string,
    total: string,
    icon: string,
    children: React.Node,
}

function TransactionBlockHeader (props: TransactionBlockHeaderProps) {
    const windowWidth = React.useContext(WindowSize);
    const {
        title,
        block,
        total,
        icon,
        children,
    } = props;

    return (
        <Row>
            <Col md={6} className="table-title">
                <Row>
                    <Col xs={6} md={12}>
                        <h2 style={{ backgroundImage: `url(${icon})` }}>{title}</h2>
                    </Col>
                    <Col xs={6} md={12}>
                        <div className="info">
                            <p>{block} </p>
                            <p style={{ marginLeft: 5 }}>{total}</p>
                        </div>
                    </Col>
                </Row>
            </Col>
            {windowWidth >= 768 && children}
        </Row>
    );
}

TransactionBlockHeader.defaultProps = {
    icon: TransactionIcon,
    total: '',
    block: '',
};

export default TransactionBlockHeader;
