// @flow

import * as React from 'react';
import moment from 'moment';

import type { Block } from 'src/utils/types';

type SearchForBlockProps = {
    showDetail: (height: number) => void,
    blocks: Array<Block>,
};

/**
 * SearchForBlock :  A component meant for searching details of particular Block, on entering valid index in search field.
 */

function SearchForBlock(props: SearchForBlockProps) {
    const { showDetail, blocks: [block] } = props;
    const showDetailCallback = React.useCallback((e: SyntheticEvent<HTMLSpanElement>) => {
        const { dataset: { number } } = e.currentTarget;

        showDetail(parseInt(number, 10));
    }, [showDetail]);

    if (!block) {
        return null;
    }

    const {
        number,
        hash,
        transactions,
        timestamp,
    } = block;

    let transactionText = 'transactions';

    if (transactions <= 1) {
        transactionText = 'transaction';
    }

    return (
        <React.Fragment>
            <hr />
            <div className="tran-blk-details">
                <div>
                    <p>Height :</p>
                    <p className="text-ellipsis">{number}</p>
                </div>
                <div>
                    <p>Transactions : </p>
                    <p className="text-ellipsis pointer">
                      <span
                          aria-hidden
                          className="text-primary"
                          style={{ cursor: `${transactions >= 1 ? 'pointer' : ''}` }}
                          data-number={number}
                          onClick={showDetailCallback}
                      >
                        {transactions} {transactionText}
                      </span>
                    </p>
                </div>
                <div>
                    <p>Hash :</p>
                    <p className="text-ellipsis">{hash}</p>
                </div>
                <div>
                    <p>Time :</p>
                    <p className="text-ellipsis">
                        { moment(new Date(timestamp * 1000)).fromNow() }
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SearchForBlock;
