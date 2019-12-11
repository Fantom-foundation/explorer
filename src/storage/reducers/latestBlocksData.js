// @flow

import {
    List,
    Record,
} from 'immutable';

import {
    SET_LATEST_BLOCKS_DATA,
    LOADING_LATEST_BLOCKS_DATA,
    UPDATE_LATEST_BLOCKS_DATA,
    ERROR_LATEST_BLOCKS_DATA,
} from 'src/storage/constants';

import type {
    List as ListType,
    RecordOf,
} from 'immutable';
import type {
    LoadingLatestBlocksDataAction,
    SetLatestBlocksDataAction,
    UpdateLatestBlockDataAction,
    ErrorLatestBlocksDataAction,
    IntiAction,
} from 'src/storage/types';
import type {
    Block,
    Transaction,
    NewBlockTransaction,
} from 'src/utils/types';

type blocksDataAction =
    | LoadingLatestBlocksDataAction
    | SetLatestBlocksDataAction
    | UpdateLatestBlockDataAction
    | ErrorLatestBlocksDataAction
    | IntiAction;

type LatestBlocksDataType = {
    isLoading: boolean,
    blocks: ListType<Block>,
    transactions: ListType<Transaction | NewBlockTransaction>,
    error: ?string,
};

type StateType = RecordOf<LatestBlocksDataType>;

const LatestBlockDataRecord = Record({
    isLoading: false,
    blocks: List([]),
    transactions: List([]),
    error: null,
}, 'latestBlockData');

const initialState = LatestBlockDataRecord<LatestBlocksDataType>();

function latestBlockData(state: StateType = initialState, action: blocksDataAction): StateType {
    switch (action.type) {
        case SET_LATEST_BLOCKS_DATA: {
            const { blocks, transactions } = action.payload;

            return state.withMutations((mutate) => {
                if (blocks) {
                    mutate.set('blocks', List(blocks));
                }

                if (transactions) {
                    mutate.set('transactions', List(transactions));
                }

                return mutate;
            });
        }

        case ERROR_LATEST_BLOCKS_DATA: {
            const {
                error: { message },
            } = action.payload;

            return state.set('error', message);
        }

        case LOADING_LATEST_BLOCKS_DATA: {
            return state.set('isLoading', action.payload);
        }

        case UPDATE_LATEST_BLOCKS_DATA: {
            const { blocks, transactions } = action.payload;
            let needUpgradeTransactions = false;

            return state.withMutations((mutable) => {
                if (blocks) {
                    blocks.forEach((block) => {
                        if (mutable.get('blocks').findEntry((listElem) => listElem.number === block.number)) {
                            return;
                        }

                        needUpgradeTransactions = true;
                        mutable.update('blocks', (blockList) => blockList.unshift(block));
                    });

                    mutable.update('blocks', (blocksList) => {
                        return blocksList
                            .slice(0, 10);
                    });
                }

                if (transactions && needUpgradeTransactions) {
                    let newTransactions = List<Transaction>();

                    transactions.forEach((transaction) => {
                        if (mutable.get('transactions').findEntry((listElem) => listElem.hash === transaction.hash)) {
                            return;
                        }

                        newTransactions = newTransactions.push(transaction);
                    });

                    mutable.update('transactions', (transactionList) => {
                        return newTransactions.concat(transactionList)
                            .slice(0, 10);
                    });
                }

                return mutable;
            });
        }

        default: {
            return state;
        }
    }
}

export default latestBlockData;

export {
    initialState,
    LatestBlockDataRecord,
};

export type {
    StateType,
    LatestBlocksDataType,
};
