// @flow
import * as React from 'react';
import { Row, Col, Table } from 'reactstrap';

type StructureElem = {
    key: string,
    header: string,
    render?: (data: any) => React$Node,
    ...
};

type DataTableProps<A> = {|
    data: Array<A>,
    structure: Array<StructureElem>,
    rowKey: string,
|};

    export function DataTable<A: { [string]: any }>(props: DataTableProps<A>) {
    const { structure, data, rowKey } = props;
    return (
        <Table className="blocks-table">
            <thead>
                <tr>
                    {structure.map(({ header, key }) => <th key={key}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((dataElem) => (
                    <tr key={dataElem[rowKey]}>
                        {structure.map(({ key, render, header, ...props }) => (
                            <td {...props} key={key}>{render ? render(dataElem[key]) : dataElem[key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};