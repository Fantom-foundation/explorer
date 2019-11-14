// @flow

import * as React from 'react';
import { Button } from 'reactstrap';

import iconPrev from './ic-prev.svg';
import iconNext from './ic-next.svg';

type TxBlockPaginationProps = {
    onChangePage: (direction: 'next' | 'prev') => void,
    currentPage: number,
    className?: ?string,
}

function TxBlockPagination(props: TxBlockPaginationProps) {
    const {
        onChangePage,
        currentPage,
        className,
    } = props;



    return (
        <div id="tx-block-pagination" className={className}>
            <div>
                <Button
                    style={{ backgroundImage: `url(${iconPrev})` }}
                    className="left m"
                    onClick={() => onChangePage('prev')}
                >
                    Prev
                </Button>
                <Button
                    style={{ backgroundImage: `url(${iconNext})` }}
                    className="right m"
                    onClick={() => onChangePage('next')}
                >
                    Next
                </Button>
            </div>
            <div>
                <p> Page {currentPage + 1}</p>
            </div>
        </div>
    );
}

export default TxBlockPagination;
