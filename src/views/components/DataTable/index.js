// @flow

import * as React from 'react';
import { Table } from 'reactstrap';

import DataTableRow from 'src/views/components/DataTable/DataTableRow';

export type StructureElem = {
    key: string,
    header: string,
    render?: (data: any) => React$Node,
    ...
};

type DataTableProps<A> = {
    data: Array<A>,
    structure: Array<StructureElem>,
    rowKey: string,
    ...
};

export function DataTable<A: { [string]: any }>(props: DataTableProps<A>) {
    const { structure, data, rowKey, ...rest } = props;
    return (
        <Table className="blocks-table">
            <thead>
                <tr>
                    {structure.map(({ header, key }) => <th key={key}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((dataElem) => (
                    <DataTableRow
                        {...rest}
                        key={dataElem[rowKey]}
                        data={dataElem}
                        structure={structure}
                    />
                ))}
            </tbody>
        </Table>
    );
}