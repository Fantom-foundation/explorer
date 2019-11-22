// @flow

import React from 'react';
import { Col } from 'reactstrap';
import Web3 from 'web3';

import transactionIcon from 'src/assets/images/icons/transactions.svg';

import { toFixed } from 'src/common/utility';

import type { Transaction } from 'src/utils/types';

type LatestTransactionProps = {
    onTransactionClick: (event: SyntheticEvent<HTMLDivElement>) => void,
    transaction: Transaction,
};

function LatestTransaction(props: LatestTransactionProps) {
    const { onTransactionClick, transaction } = props;
    const value = toFixed(Web3.utils.fromWei(transaction.value, 'ether'), 4);

    return (
        <Col
            data-tx-hash={transaction.hash}
            xs={12}
            className="details"
            onClick={onTransactionClick}
        >
            <p
                className="tx-holder text-ellipsis ico"
                style={{ backgroundImage: `url(${transactionIcon})` }}
            >
                <span className="text-white">TX#</span>
                &nbsp;
                <span className="text-primary tx-value">
                    {transaction.hash}
                </span>
            </p>
            <div className="s-to-r">
                <p className="pb-2 mb-1 text-ellipsis">
                    <span className="text-white">From</span>
                    &nbsp;
                    <span className="text-primary from-value">
                        {transaction.from}
                    </span>
                    &nbsp;
                </p>
                <p className="text-ellipsis">
                    <span className="text-white ">to</span>
                    &nbsp;
                    <span className="text-primary to-value">
                        {transaction.to}
                    </span>
                </p>
            </div>
            <div className="ammount-date">
                <p className="mb-0">
                    <span className="text-white">Amount </span>
                    &nbsp;
                    <span className="text-primary">
                        {value} FTM
                    </span>
                </p>
            </div>
        </Col>
    );
}

export default LatestTransaction;
