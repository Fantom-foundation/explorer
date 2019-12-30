// @flow

import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import { Link } from "react-router-dom";
import { useDataProvider } from 'src/utils/DataProvider';
import { usePagination } from 'src/utils/hooks';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Wrapper from 'src/views/wrapper/wrapper';
import { DataTable } from 'src/views/components/DataTable';
import TableData from 'src/views/containers/BlockTransactions/TableData';
import separaterIcon from 'src/assets/images/icons/chevron.svg';

function BlockTransPage() {

    const match = useRouteMatch('/blocks-transactions/:blockNumber');
    const { params: { blockNumber } } = match;
    const hash = blockNumber.replace('', '');
    console.log(hash);
    return (
        <div>
            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><Link to="/">Home</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li className="active"><Link to={`/blocks/${hash}`}>Block</Link></li>
                        <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                        <li className="active">Transactions</li>
                    </ul>
                </Container>
            </div>
            <Container>
                <TableData />
            </Container>
        </div>
    );
}

export default BlockTransPage;
