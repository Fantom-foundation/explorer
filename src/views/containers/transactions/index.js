// @flow

import * as React from 'react';
import Web3 from 'web3';
import { Container, Row, Col } from 'reactstrap';

import Web3Provider from 'src/utils/DataProvider/web3Provider';
import { usePagination } from 'src/utils/hooks';
import { toFixed } from 'src/common/utility';

import { DataTable } from 'src/views/components/DataTable';
import Wrapper from 'src/views/wrapper/wrapper';
import Loader from 'src/views/components/Loader';


import type { RouterHistory } from 'react-router-dom';
import type { Transaction } from 'src/utils/types';

const transactionStructure = [
    {
        header: 'Tx Hash',
        key: 'hash',
        className: 'text-primary text-ellipsis full head',
        render: (hash: string) => (
            <span className="icon icon-transaction">
                {hash}
            </span>
        ),
    },
    {
        header: 'Block',
        key: 'blockNumber',
        className: 'text-primary text-ellipsis half',
    },
    {
        header: 'From',
        key: 'from',
        className: 'text-primary text-ellipsis half',
    },
    {
        header: 'To',
        key: 'to',
        className: 'text-primary text-ellipsis half',
    },
    {
        header: 'Value',
        key: 'value',
        className: 'half',
        render: (value: string) => {
            let newValue = '';

            if (value) {
                newValue = Web3.utils.fromWei(value, 'ether');
                newValue = toFixed(newValue, 4);

                return (<span className="o-5">{newValue} FTM</span>);
            }

            return '';
        },
    },
];

function TransactionsPage() {
    const [error, setError] = React.useState('');
    const [transactions, setTransactions] = React.useState([]);
    const [maxBlockNumber, setMaxBlockNumber] = React.useState(0);
    const [currentPage, setCurrentPage] = usePagination(1, 50000);

    const pushToTransaction = React.useCallback((history: RouterHistory, tx: Transaction) => {
        history.push({
            pathname: `/transactions/${tx.hash}`,
        })
    }, []);

    React.useEffect(() => {
        async function fetchData() {
            const provider = new Web3Provider();
            const offset = (currentPage - 1) * 10;

            const response = await provider.getTransactionsPageData(offset);

            if (response.error) {
                setError(response.error.message);
            } else {
                const { transactions, maxBlockHeight } = response;

                setMaxBlockNumber(maxBlockHeight);

                if (transactions) {
                    setTransactions(transactions);
                }
            }
        }

        fetchData();
    }, [currentPage, setMaxBlockNumber]);

    const totalBlocks = `(Total of ${maxBlockNumber} Blocks)`;
    const descriptionBlock = 'Transactions of Block #${lastBlock.height} To #${firstBlock.height}';

    return (
        <div>
            {/* <Wrapper
                title="Transactions"
                onChangePage={setCurrentPage}
                block={descriptionBlock}
                total={totalBlocks}
                currentPage={currentPage}
            >
                {error ? (
                    <p>{error}</p>
                ) : (
                    <Row>
                        <Col>
                            {
                                transactions.length > 0 ? (
                                    <DataTable
                                        data={transactions}
                                        rowKey="hash"
                                        structure={transactionStructure}
                                        historyCallback={pushToTransaction}
                                    />
                                ) : <Loader />
                            }
                        </Col>
                    </Row>
                )}
            </Wrapper> */}
            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><a href="/">Home</a></li>
                        <li><span>></span> </li>
                        <li className="active">Transactions</li>
                    </ul>
                </Container>
            </div>
            <Container>
                <div className="transaction-wrapper">
                    <div className="d-flex">
                        <div className="title-section">
                            <h2>Transactions</h2>
                            <span>More than 102,712,555 transactions found</span>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <table className="data-tables">
                                <thead>
                                    <tr>
                                        <th>Tx Hash</th>
                                        <th>Block</th>
                                        <th>Age</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Amount</th>
                                        <th>fees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><a href="#">0x264dab51d080f3…</a></td>
                                        <td><a href="#">5068703</a></td>
                                        <td>1 sec ago</td>
                                        <td><a href="#">0xc50489a925e9c8…</a></td>
                                        <td> <a href="#">0xc50489a925e9c8…</a> </td>
                                        <td>306,460 FTM</td>
                                        <td>0.1 FTM</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#">0x264dab51d080f3…</a></td>
                                        <td><a href="#">5068703</a></td>
                                        <td>1 sec ago</td>
                                        <td><a href="#">0xc50489a925e9c8…</a></td>
                                        <td> <a href="#">0xc50489a925e9c8…</a> </td>
                                        <td>306,460 FTM</td>
                                        <td>0.1 FTM</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#">0x264dab51d080f3…</a></td>
                                        <td><a href="#">5068703</a></td>
                                        <td>1 sec ago</td>
                                        <td><a href="#">0xc50489a925e9c8…</a></td>
                                        <td> <a href="#">0xc50489a925e9c8…</a> </td>
                                        <td>306,460 FTM</td>
                                        <td>0.1 FTM</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#">0x264dab51d080f3…</a></td>
                                        <td><a href="#">5068703</a></td>
                                        <td>1 sec ago</td>
                                        <td><a href="#">0xc50489a925e9c8…</a></td>
                                        <td> <a href="#">0xc50489a925e9c8…</a> </td>
                                        <td>306,460 FTM</td>
                                        <td>0.1 FTM</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#">0x264dab51d080f3…</a></td>
                                        <td><a href="#">5068703</a></td>
                                        <td>1 sec ago</td>
                                        <td><a href="#">0xc50489a925e9c8…</a></td>
                                        <td> <a href="#">0xc50489a925e9c8…</a> </td>
                                        <td>306,460 FTM</td>
                                        <td>0.1 FTM</td>
                                    </tr>
                                    <tr>
                                        <td><a href="#">0x264dab51d080f3…</a></td>
                                        <td><a href="#">5068703</a></td>
                                        <td>1 sec ago</td>
                                        <td><a href="#">0xc50489a925e9c8…</a></td>
                                        <td> <a href="#">0xc50489a925e9c8…</a> </td>
                                        <td>306,460 FTM</td>
                                        <td>0.1 FTM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default TransactionsPage;
