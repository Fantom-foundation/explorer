// @flow

import * as React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Web3 from 'web3';

import { DataTable } from 'src/views/components/DataTable';

import TransactionBlockHeader from 'src/views/components/header/tranactionBlockHeader';
import Web3Provider from 'src/utils/DataProvider/web3Provider';
import { toFixed } from 'src/common/utility';

import type { RouterHistory } from 'react-router-dom';
import type { Transaction } from 'src/utils/types';

/**
 * BlockTransactions :  A component meant for displaying transactions of particular block index
 *
 */

const transactionsStructure = [
    {
        className: 'text-primary full head text-ellipsis',
        key: 'hash',
        header: 'Tx Hash',
        render: (hash: string) => (
            <span className="icon icon-transaction">
                {hash || '--'}
            </span>
        ),
    },
    {
        className: 'text-primary half text-ellipsis',
        key: 'blockNumber',
        header: 'Block',
        render: (blockNumber: number) => blockNumber.toString() || '--',
    },
    {
        className: 'text-primary half text-ellipsis',
        key: 'from',
        header: 'From',
        render: (from: string) => from || '--',
    },
    {
        className: 'text-primary half text-ellipsis',
        key: 'to',
        header: 'To',
        render: (to: string) => to || '--',
    },
    {
        className: 'text-primary half text-ellipsis',
        key: 'value',
        header: 'Value',
        render: (value: string) => {
            if (value) {
                const fnt = Web3.utils.fromWei(value, 'ether');
                return toFixed(fnt, 4);
            } else {
                return '--';
            }
        },
    },
    {
        className: 'text-primary half text-ellipsis',
        key: 'gas',
        header: 'Gas used',
        render: (gas: string) => gas || '--',
    },
];

function BlockDetail() {
    const [error, setError] = React.useState('');
    const [transactions, setTransactions] = React.useState([]);
    const history = useHistory();
    const match = useRouteMatch('/block/:blockId?');
    const {
        params: { blockId },
    } = match;

    if (!blockId) {
        history.push({
            pathname: '/blocks',
        });
    }

    React.useEffect(() => {
        if (!blockId) {
            return;
        }

        async function fetchData() {
            const provider = new Web3Provider();

            const response = await provider.getBlock(blockId, true);

            if (response.error) {
                setError(response.error.message);
            } else {
                const [{ transactions: transactionsData }] = response.blockData;
                setTransactions(transactionsData);
            }
        }

        fetchData();
    }, [blockId, history]);

    const historyCallback = React.useCallback((history: RouterHistory, data: Transaction) => {
        const { hash } = data;

        history.push({
            pathname: `/transactions/${hash}`,
        });
    }, []);

    const goToBlock = React.useCallback(() => {
        if (blockId) {
            history.push({
                pathname: `/blocks/${blockId}`,
            })
        }
    }, [history, blockId]);

    return (
        <section className="bg-theme full-height-conatainer">
            <Container>
                <TransactionBlockHeader
                    title="Transactions"
                    block="For Block"
                    total={blockId ? blockId : '0'}
                >
                    <Col md={6} className="text-right">
                        <Button
                            color="white"
                            className="list"
                            onClick={goToBlock}
                        >
                            Go to Block
                        </Button>
                    </Col>
                </TransactionBlockHeader>
                <Container>
                    <Row>
                        {
                            error !== '' ? <p>{error}</p> :
                                transactions.length > 0 ? (
                                    <DataTable
                                        data={transactions}
                                        rowKey="hash"
                                        structure={transactionsStructure}
                                        historyCallback={historyCallback}
                                    />
                                ) : <p>No transactions found</p>
                        }
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default BlockDetail;
