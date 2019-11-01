// @flow

import React, { useState, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';

import { Title } from 'src/views/components/coreComponent/index';
import TitleIcon from 'src/assets/images/icons/latest-transaction.svg';
import transactionIcon from 'src/assets/images/icons/transactions.svg';
import { getBlockUpdateDetails } from 'src/storage/selectors/blocks';
import { toFixed } from 'src/common/utility';

/**
 * @class LatestTransactions : To display list of latest transactions.
 */

function LatestTransactions(props) {
    const { push } = props;
    const [transactionArray, setTransactionArray] = useState([]);
    const onTransactionClick = useCallback((e: SyntheticEvent<HTMLDivElement>) => {
        const { dataset: { txHash } } = e.currentTarget;

        push({
            pathname: `/transactions/${txHash}`,
        });
    }, [push]);

    const {
        blockDetails: {
            allBlockData: transactions = [],
        } = {},
    } = props;
    let transformedArray = [];
    let transactionArr = [];
    let newValue = '';
    let valueOnClick = '';

    if (transactions.length) {
        for (const block of transactions) {
            block.transactions.forEach((transac) => {
                if (transac.value) {
                    const ftmValue = Web3.utils.fromWei(`${transac.value}`, 'ether');
                    valueOnClick = ftmValue;
                    const value = Number(ftmValue);
                    newValue = toFixed(value, 4);
                }

                transactionArr = {
                    block_id: block.hash,
                    address_from: transac.from,
                    transaction_hash: transac.transactionHash,
                    address_to: transac.to,
                    value: valueOnClick,
                    gasUsed: transac.gas,
                    cumulativeGasUsed: transac.cumulativeGasUsed,
                    contractAddress: transac.contractAddress,
                    root: transac.root,
                    logsBloom: transac.logsBloom,
                    status: transac.status,
                    homePageValue: newValue,
                };

                transformedArray.push(transactionArr);
            });
        }
    }

    transformedArray = transformedArray.slice(0, 10);

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
                {transformedArray &&
                transformedArray.length &&
                transformedArray.map((data) => (
                    <Col
                        key={data.transaction_hash}
                        data-tx-hash={data.transaction_hash}
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
                                {data.transaction_hash}
                            </span>
                        </p>
                        <div className="s-to-r">
                            <p className="pb-2 mb-1 text-ellipsis">
                                <span className="text-white">From</span>
                                &nbsp;
                                <span className="text-primary from-value">
                                    {data.address_from}
                                </span>
                                &nbsp;
                            </p>
                            <p className="text-ellipsis">
                                <span className="text-white ">to</span>
                                &nbsp;
                                <span className="text-primary to-value">
                                    {data.address_to}
                                </span>
                            </p>
                        </div>
                        <div className="ammount-date">
                            <p className="mb-0">
                                <span className="text-white">Amount </span>
                                &nbsp;
                                <span className="text-primary">
                                    {data.homePageValue} FTM
                                </span>
                            </p>
                        </div>
                    </Col>
                ))}
            </Row>
        </Col>
    );
}

const mapStateToProps = createSelector(
    getBlockUpdateDetails(),
    (blockDetails) => ({ blockDetails })
);

export default connect(
    mapStateToProps,
    { push },
)(LatestTransactions);
