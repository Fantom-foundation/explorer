// @flow

import React, { useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import LatestTransaction from 'src/views/components/LatestTransaction';
import { Title } from 'src/views/components/coreComponent/index';
import TitleIcon from 'src/assets/images/icons/latest-transaction.svg';

import type { LocationShape } from 'react-router-dom';
import type { Transaction } from 'src/utils/types';

type LatestTransactionsProps = {|
    historyPush: (string | LocationShape) => void,
    latestTransactionsArr: Array<Transaction>,
|};

/**
 * @class LatestTransactions : To display list of latest transactions.
 */

function LatestTransactions(props: LatestTransactionsProps) {
    const {
        latestTransactionsArr,
        historyPush,
    } = props;

    const onTransactionClick = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
        const { dataset: { txHash } } = e.currentTarget;

        historyPush({
            pathname: `/transactions/${txHash}`,
        });
    }, [historyPush]);

    return (
        <Col xs={12} md={6} className="left">
            <div className="header">
                <Title
                    h2
                    className="text-uppercase"
                    style={{ backgroundImage: `url(${TitleIcon})` }}
                >
                    Latest Transactions
                </Title>

                <Link to="/transactions" className="btn">
                    View all
                </Link>
            </div>
            <Row className="blocks">
                {
                    latestTransactionsArr.length > 0
                        ? latestTransactionsArr.map((transaction) => (
                            <LatestTransaction
                                key={transaction.hash}
                                onTransactionClick={onTransactionClick}
                                transaction={transaction}
                            />
                        ))
                        : null
                }
            </Row>
        </Col>
    );
}

export default LatestTransactions;
