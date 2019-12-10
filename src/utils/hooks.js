// @flow

import * as React from "react";

export const usePagination = (initialPage: number = 0, initialMaxPages?: number) => {
    const [ currentPage, setCurrentPage ] = React.useState(initialPage);
    const [ maxPages, setMaxPages ] = React.useState<number | null>(initialMaxPages || null);
    const setCurrentPageHandler = React.useCallback((value: 'next'|'prev') => setCurrentPage((prevState) => {
        let nextState = prevState;

        switch (value) {
            case 'next': {
                nextState += 1;
                break;
            }
            case 'prev': {
                nextState -= 1;
                break;
            }
            default:
        }

        if (nextState < 0 || (maxPages !== null && nextState > maxPages)) {
            return prevState;
        }

        return nextState;
    }), [maxPages]);

    return [currentPage, setCurrentPageHandler, setMaxPages];
};