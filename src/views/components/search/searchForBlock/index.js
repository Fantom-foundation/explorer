// @flow

import * as React from 'react';
import moment from 'moment';

type SearchForBlockProps = {
    showDetail: (height: number) => void,
    blocks: Array<{
        height: number,
        hash: string,
        round: number,
        transactions: number,
        createdAt: number,
    }>,
};

/**
 * SearchForBlock :  A component meant for searching details of particuler Block , on entering valid index in search field.
 */

function SearchForBlock(props: SearchForBlockProps) {
    const { showDetail, blocks: [block] } = props;
    const showDetailCallback = React.useCallback((e: SyntheticEvent<HTMLSpanElement>) => {
        const { dataset: { height } } = e.currentTarget;

        showDetail(parseInt(height, 10));
    }, [showDetail]);

    if (!block) {
        return null;
    }

    const {
        height,
        hash,
        round,
        transactions,
        createdAt,
    } = block || {};

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
                    <p className="text-ellipsis">{height}</p>
                </div>
                <div>
                    <p>Transactions : </p>
                    <p className="text-ellipsis pointer">
                      <span
                          aria-hidden
                          className="text-primary"
                          style={{ cursor: `${transactions >= 1 ? 'pointer' : ''}` }}
                          data-height={height}
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
                    <p>Round :</p>
                    <p className="text-ellipsis">
                        <span className="text-primary">{round}</span>
                    </p>
                </div>
                <div>
                    <p>Time :</p>
                    <p className="text-ellipsis">
                        { moment(new Date(createdAt * 1000)).fromNow() }
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default SearchForBlock;
