// @flow

import * as React from 'react';
import { Row, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import moment from 'moment';
import { push } from 'connected-react-router';

import { getBlockUpdateDetails } from 'src/storage/selectors/blocks';
import Wrapper from 'src/views/wrapper/wrapper';
import { DataTable } from 'src/views/components/DataTable';

type BlocksProps = {
    historyPush: (string) => void,
    blockDetails: { allBlockData: Array<{ cursor: string }> },
};

type BlocksState = {
    blockData: Array<string>,
    error: string,
    lastFetchedPage: number,
    currentPage: number,
    hasNextPage: boolean,
    currentPageVal: number,
};

const blockPageStructure = [
    {
        key: 'number',
        header: 'Height',
        render: (height: number) => <span className="icon icon-block">{height}</span>,
        className: "text-primary full head",
    },
    {
        key: 'timestamp',
        header: 'Time',
        render: (timestamp: number) => moment(new Date(timestamp * 1000)).fromNow(),
        className: "text-primary full-wrap txn",
    },
    {
        key: 'transactions',
        header: 'Txn',
        render: (transactions: Array<any>) => transactions.length,
        className: "text-primary full-wrap txn",
    },
    {
        key: 'hash',
        header: 'Hash',
        className: "text-primary full-wrap hash text-ellipsis"
    },
];

function BlocksPage(props: BlocksProps) {

    /**
     * @method onChangePage() :  Function to handle pagination
     * @param {String} type : Type defines whether it is previous page or next page
     */
/*    onChangePage = (type: string) => {
        // TODO: code duplicate

        const { currentPageVal } = this.state;
        const { setBlocksData, blockDetails } = this.props;
        const { allBlockData } = blockDetails;
        const updatePageVal = type === 'next' ? currentPageVal + 1 : currentPageVal - 1;

        if (updatePageVal < 0) {
            return;
        }

        const currentBlockDataLength = allBlockData.length;

        if (type === 'next' && updatePageVal * 10 >= currentBlockDataLength) {
            return;
        }

        // ----------------------------------

        this.setState({
            currentPageVal: updatePageVal,
        });
        const cursor = allBlockData[allBlockData.length - 1].cursor;

        if (type === 'next' && this.maxPageVal < updatePageVal) {
            if (true) {
                HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
                    query: `
          {
            blocks(first: 10, byDirection: "desc", after: "${cursor}") {
              pageInfo {
                hasNextPage
              }
              edges {
                cursor,
                node {
                  id,
                  payload
                }
              }
            }
          }`,
                })
                    .then(
                        (res) => {
                            if (res && res.data) {
                                this.maxPageVal = updatePageVal;
                                const allData = res.data;
                                if (
                                    allData.data &&
                                    allData.data.blocks &&
                                    allData.data.blocks.edges &&
                                    allData.data.blocks.edges.length
                                ) {
                                    const blockDetails = {
                                        payload: allData.data.blocks.edges,
                                    };
                                    setBlocksData(blockDetails);
                                    this.setState((prevState) => ({
                                        lastFetchedPage: allData.data.blocks.pageInfo.hasNextPage
                                            ? prevState.lastFetchedPage + 1
                                            : prevState.lastFetchedPage,
                                        hasNextPage: allData.data.blocks.pageInfo.hasNextPage,
                                    }));
                                }
                            }
                            return null;
                        },
                        () => {
                            console.log('1');
                        }
                    )
                    .catch((err) => {
                        console.log(err, 'err in graphql');
                    });
            }
        }
    };*/

    /**
     * @method renderBlockList() :  Function to render all list of blocks
     */
/*    renderBlockList() {
        const { currentPageVal } = this.state;
        const { blockDetails, history } = this.props;
        const { allBlockData } = blockDetails;
        const from = currentPageVal * 10;
        const to = from + 10;

        if (blockDetails && allBlockData) {
            const transformedBlockArray = allBlockData.slice(from, to);

            return (
                <Row>
                    <Col>
                        <Table className="blocks-table">
                            <thead>
                                <tr>
                                    <th>Height</th>
                                    <th>Time</th>
                                    <th>Txn</th>
                                    <th>hash</th>
                                    <th>Round</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transformedBlockArray &&
                                transformedBlockArray.length > 0 &&
                                transformedBlockArray.map((data, index) => (
                                    <tr
                                        key={index}
                                        onClick={() =>
                                            history.push({
                                                pathname: `/blocks/${data.height}`,
                                                state: { data, type: 'block' },
                                            })
                                        }
                                    >
                                        <td data-head="Height" className="text-primary full head">
                                            <span className="icon icon-block">{data.height}</span>
                                        </td>
                                        <td
                                            data-head="Txn"
                                            className="text-primary full-wrap txn"
                                        >
                                            {moment(new Date(data.createdTime * 1000)).fromNow()}
                                        </td>
                                        <td
                                            data-head="Txn"
                                            className="text-primary full-wrap txn"
                                        >
                                            {data.transactions.length}
                                        </td>
                                        <td
                                            data-head="hash"
                                            className="text-primary full-wrap hash text-ellipsis"
                                        >
                                            {data.hash}
                                        </td>
                                        <td data-head="Round" className=" full-wrap round">
                                            <span className="o-5">{data.round}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            );
        }

        return null;
    }*/

    // render() {
    //     const { currentPageVal, error } = this.state;
    //     const { blockDetails } = this.props;
    //     let descriptionBlock = '';
    //     const from = currentPageVal * 10;
    //     const to = from + 10;
    //     let totalBlocks = '';
    //
    //     if (blockDetails && blockDetails.allBlockData) {
    //         const transformedBlockArray = blockDetails.allBlockData.slice(from, to);
    //         const {
    //             blockDetails: { allBlockData },
    //         } = this.props;
    //
    //         if (allBlockData.length) {
    //             const firstBlock = allBlockData[0];
    //             totalBlocks = ` (Total of ${firstBlock.height} Blocks)`;
    //         }
    //
    //         if (transformedBlockArray && transformedBlockArray.length) {
    //             const firstBlock = transformedBlockArray[0];
    //             const lastBlock = transformedBlockArray[transformedBlockArray.length - 1];
    //             descriptionBlock = `Block #${ lastBlock.height } To #${ firstBlock.height } `;
    //         }
    //     }

    const descriptionBlock = 'Block description';
    const totalBlocks = ' ( Total of {height} Blocks )';
    const currentPageVal = 1;
    const error = '';
    const onChangePage = React.useCallback((str: string) => {
        console.log(str);
    }, []);

    return (
        <Wrapper
            title="Blocks"
            onChangePage={onChangePage}
            block={descriptionBlock}
            total={totalBlocks}
            currentPage={currentPageVal}
        >
            {error ? (
                <p className="text-white">{error}</p>
            ) : (
                <Row>
                    <Col>
                        <DataTable
                            structure={blockPageStructure}
                            rowKey='number'
                            data={[]}
                        />
                    </Col>
                </Row>
            )}
        </Wrapper>
    );
    // }
}

const mapStateToProps = createSelector(
    getBlockUpdateDetails(),
    (blockDetails) => ({ blockDetails })
);

const mapDispatchToProps = ({
    historyPush: push,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlocksPage);
