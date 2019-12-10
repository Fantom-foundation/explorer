// @flow

import * as React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Web3 from 'web3';

import { DataTable } from 'src/views/components/DataTable';

import { useDataProvider } from 'src/utils/DataProvider';
import { usePagination } from 'src/utils/hooks';
import { toFixed } from 'src/common/utility';

import type { RouterHistory } from 'react-router-dom';
import type { Transaction } from 'src/utils/types';
import Wrapper from 'src/views/wrapper/wrapper';

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
    const provider = useDataProvider();
    const [currentPage, setCurrentPage, setMaxPages] = usePagination();
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
        async function fetchData() {
            if (!blockId) {
                return;
            }

            const response = await provider.getTransactionsByBlockNumber(
                parseInt(blockId, 10),
                currentPage * 10,
            );

            if (response.error) {
                setError(response.error.message);
            } else {
                const { blockData: transactionsData, total } = response;

                setMaxPages(Math.floor(total / 10));
                setTransactions(transactionsData);
            }
        }


        fetchData();
    }, [blockId, provider, setMaxPages, currentPage]);

    const historyCallback = React.useCallback((history: RouterHistory, data: Transaction) => {
        const { hash } = data;

        history.push({
            pathname: `/transactions/${hash}`,
        });
    }, []);

    return (
        <section className="bg-theme full-height-conatainer">
            <Wrapper
                title="Transactions"
                block="For Block"
                total={blockId ? blockId : '0'}
                onChangePage={setCurrentPage}
                currentPage={currentPage}
            >
                {
                    error !== '' ? (
                        <p className="text-white">{error}</p>
                    ): transactions.length > 0 ? (
                        <DataTable
                            data={transactions}
                            rowKey="hash"
                            structure={transactionsStructure}
                            historyCallback={historyCallback}
                        />
                    ) : <p className="text-white">No transactions found</p>
                }
            </Wrapper>
        </section>
    );
}

export default BlockDetail;
