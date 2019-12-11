// @flow

import * as React from 'react';
import { useHistory } from 'react-router-dom';
import noop from 'lodash/noop';

import type { RouterHistory } from 'react-router-dom';
import type { Transaction, Block } from 'src/utils/types';
import type { StructureElem } from 'src/views/components/DataTable';

type DataTableRowProps = {
    data: any,
    structure: Array<StructureElem>,
    historyCallback: (history: RouterHistory, data: Transaction | Block) => void,
    ...
}

function DataTableRow(props: DataTableRowProps) {
    const { data, structure, historyCallback } = props;
    const history = useHistory();
    const onClickHandler = React.useCallback(
        () => historyCallback(history, data),
        [data, history, historyCallback],
    );

    return (
        <tr onClick={onClickHandler}>
            {structure.map(({ key, render, header, ...props }) => (
                <td {...props} key={key}>{render ? render(data[key]) : data[key]}</td>
            ))}
        </tr>
    );
}

DataTableRow.defaultProps = {
    historyCallback: noop,
};

export default DataTableRow;