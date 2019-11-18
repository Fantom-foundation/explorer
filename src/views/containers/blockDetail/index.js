// @flow

import * as React from 'react';
import { Container, Button, Col } from 'reactstrap';
import { useHistory, useRouteMatch } from 'react-router-dom';

import SearchForBlock from 'src/views/components/search/searchForBlock';
import TransactionBlockHeader from 'src/views/components/header/tranactionBlockHeader';

import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

type BlockDetailProps = {||};

/**
 *  Return block detail component
 * @param props
 * @returns {*}
 * @constructor
 */

function BlockDetail(props: BlockDetailProps) {
    const {
        blockData = [],
    } = props;
    const [error, setError] = React.useState('');
    const history = useHistory();
    const match = useRouteMatch('/blocks/:id');
    const { params: { id: blockHeight } } = match;
    const showDetail = React.useCallback((blockNumber) => {
        if (blockNumber === '') {
            return;
        }

        history.push(`/block/${blockNumber}`);
    }, [history]);

    /**
     * @method onShowList():  Function to show list of blocks
     */

    const onShowList = React.useCallback(() => {
        history.push('/blocks');
    }, [history]);

    React.useEffect(() => {
        console.log(blockHeight);

        return () => console.log('Unmount!');
    }, [blockHeight]);

    /**
     * @method getFantomBlocks():  Api to fetch blocks for given index of block of Fantom own endpoint.
     * @param {String} searchText : Text to fetch block.
     */
    // getFantomBlocks(searchText) {
    //     const searchQuery = `index:${searchText}`;
    //
    //     HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
    //         query: `
    //       {
    //        block(${searchQuery}) {
    //         id,payload
    //       }
    //       }`,
    //     })
    //         .then((response) => {
    //             if (
    //                 response &&
    //                 response.data &&
    //                 response.data.data &&
    //                 response.data.data.block
    //             ) {
    //                 this.loadFantomBlockData(response.data.data.block);
    //             } else {
    //                 this.setState({
    //                     blockData: [],
    //                     error: 'No Record Found',
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             this.setState({
    //                 blockData: [],
    //                 error: error.message || 'Internal Server Error',
    //             });
    //         });
    // }

    /**
     * @method loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
     * @param {*} responseJson : Json of block response data from Api.
     */
    // loadFantomBlockData(allData) {
    //     const result = allData.payload;
    //     const blockData = [];
    //     const txLength =
    //         allData.payload.transactions !== null
    //             ? allData.payload.transactions.length
    //             : 0;
    //     blockData.push({
    //         height: result.index,
    //         hash: result.hash,
    //         round: result.round,
    //         transactions: txLength,
    //         createdTime: result.createdTime,
    //     });
    //
    //     this.setState({
    //         blockData,
    //         error: '',
    //     });
    // }

    /**
     * @method showDetail() :  Function to show details of particular block number
     * @param {String} blockNumber : Block number used for getting details
     */

    return (
        <section className="bg-theme full-height-conatainer">
            <Container>
                <TransactionBlockHeader
                    title="Block Number:"
                    block="Transactions"
                    total={blockHeight}
                    icon={TitleIcon}
                >
                    <Col md={6} className="text-right">
                        <Button
                            color="white"
                            className="list"
                            onClick={onShowList}
                        >
                            List
                        </Button>
                    </Col>
                </TransactionBlockHeader>
                {
                    error ? (<p className="text-white">{error}</p>) :
                        blockData.length <= 0 ? (
                            <div className="loader">
                                <div className="holder">
                                    <div className="lds-ellipsis">
                                        <div />
                                        <div />
                                        <div />
                                        <div />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <React.Fragment>
                                {blockData.length > 0 && (
                                    <SearchForBlock blocks={blockData} showDetail={showDetail} />
                                )}
                                {error !== '' && <p className="text-white">{error}</p>}
                            </React.Fragment>
                        )
                }
            </Container>
        </section>
    );
}

export default BlockDetail;
