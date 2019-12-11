// @flow

import * as React from 'react';
import Web3 from 'web3';
import { Button, Col, Container, Row } from 'reactstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';

import TransactionBlockHeader from 'src/views/components/header/tranactionBlockHeader';

import Loader from 'src/views/components/Loader';
import { useDataProvider } from 'src/utils/DataProvider';

import type { Transaction } from 'src/utils/types';

function TransactionDetail () {
    const [ error, setError ] = React.useState('');
    const [ transaction, setTransaction ] = React.useState<?Transaction>();
    const history = useHistory();
    const provider = useDataProvider();
    const onShowList = React.useCallback(() => {
        history.push({
            pathname: '/transactions',
        });
    }, [history]);

    const match = useRouteMatch('/transactions/:txHash');
    const { params: { txHash } } = match;

    if (!txHash) {
        onShowList();
    }

    React.useEffect(() => {
        async function fetchData() {
            if (!txHash) {
                return;
            }

            const response = await provider.getTransaction(txHash);

            if (response.error) {
                setError(response.error.message);
            } else {
                const { transactionData: [transaction] } = response;
                setTransaction({
                    ...transaction,
                        value: Web3.utils.fromWei(transaction.value),
                });
            }
        }

        fetchData();
    }, [txHash, provider]);

    return (
        <section className="bg-theme full-height-conatainer">
            <Container>
                <TransactionBlockHeader
                    title="Transaction"
                    block="Hash: "
                    total={txHash ? txHash : '0'}
                >
                    <Col md={6} className="text-right">
                        <Button
                            color="white"
                            className="list"
                            onClick={onShowList}
                        >
                            Show List
                        </Button>
                    </Col>
                </TransactionBlockHeader>
                <hr />
                <Container>
                    {error !== '' ? (<p className="text-white">{error}</p>) :
                        transaction ? (
                            <Row>
                                <div className="tran-blk-details">
                                    <div>
                                        <p>TxHash:</p>
                                        <p className="text-ellipsis">{transaction.hash}</p>
                                    </div>
                                    <div>
                                        <p>TxReceipt Status:</p>
                                        <p>{transaction.status ? 'Success' : 'Failed'}</p>
                                    </div>
                                    <div>
                                        <p>From:</p>
                                        <p className="text-primary text-ellipsis">{transaction.from}</p>
                                    </div>
                                    <div>
                                        <p>To:</p>
                                        <p className="text-ellipsis">{transaction.to}</p>
                                    </div>
                                    <div>
                                        <p>Value:</p>
                                        <p>{transaction.value} FTM</p>
                                    </div>
                                    <div>
                                        <p>Gas used:</p>
                                        <p className="text-ellipsis">{transaction.gasUsed}</p>
                                    </div>
                                    <div>
                                        <p>Cumulative Gas used:</p>
                                        <p className="text-ellipsis">{transaction.cumulativeGasUsed}</p>
                                    </div>
                                    <div>
                                        <p>Contract Address:</p>
                                        <p className="text-ellipsis">{transaction.contractAddress}</p>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <p>Root:</p>*/}
                                    {/*    <p className="text-ellipsis">{transaction.root}</p>*/}
                                    {/*</div>*/}
                                    <div>
                                        <p>Input Data:</p>
                                        <textarea defaultValue={transaction.v} readOnly />
                                    </div>
                                </div>
                            </Row>
                        ) : <Loader />
                    }
                </Container>
            </Container>
        </section>
    );
}

export default TransactionDetail;
