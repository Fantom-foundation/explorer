// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { push, createMatchSelector } from 'connected-react-router/immutable';

import SearchForBlock from 'src/views/components/search/searchForBlock/index';
import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';
import { getBlockUpdateDetails } from 'src/storage/selectors/blocks';
import Wrapper from 'src/views/wrapper/wrapper';

import type { Match } from 'react-router-dom';

type BlockDetailProps = {|
    historyPush: (path: string) => void,
    blockData: Array<string>,
    match: Match,
|};

/**
 *  Return block detail component
 * @param props
 * @returns {*}
 * @constructor
 */

function BlockDetail(props: BlockDetailProps) {
    const {
        historyPush,
        blockData = [],
        match,
    } = props;
    const { params: { id: blockHeight } } = match;
    const [searchText, setSearchText] = React.useState('');
    const [error, setError] = React.useState('');

    const setSearchTextCallback = React.useCallback((e: SyntheticEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;

        setSearchText(value);
    }, []);

    const showDetail = React.useCallback((blockNumber) => {
        if (blockNumber === '') {
            return;
        }

        historyPush(`/block/${blockNumber}`);
    }, [historyPush]);

    /**
     * @method onShowList():  Function to show list of blocks
     */

    const onShowList = React.useCallback(() => {
        historyPush('/blocks');
    }, [historyPush]);

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
        <div>
            <Wrapper
                setSearchText={setSearchTextCallback}
                searchText={searchText}
                icon={TitleIcon}
                title="Block Number:"
                block="Transactions"
                total={blockHeight}
                pagination={false}
                onShowList={onShowList}
                history={historyPush}
                placeHolder="Search by Transaction Hash / Block Number"
            >
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
                            {error !== '' &&
                            searchText !== '' && <p className="text-white">{error}</p>}
                        </React.Fragment>
                    )
                }
            </Wrapper>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    const matchSelector = createMatchSelector('/blocks/:id');
    const match = matchSelector(state);

    return {
        blockData: getBlockUpdateDetails()(state, props),
        match,
    };
};

const mapDispatchToProps = {
    historyPush: push,
};

export default connect<BlockDetailProps, {||}, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps
)(BlockDetail);
