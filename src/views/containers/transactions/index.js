// @flowimport * as React from 'react';
import * as React from 'react';
import Web3 from 'web3';
import { Container, Row, Col } from 'reactstrap';
import io from 'socket.io-client';
import Web3Provider from 'src/utils/DataProvider/web3Provider';
import { usePagination } from 'src/utils/hooks';
import { toFixed } from 'src/common/utility'; import { DataTable } from 'src/views/components/DataTable';
import Wrapper from 'src/views/wrapper/wrapper';
import Loader from 'src/views/components/Loader';
import TableData from 'src/views/containers/transactions/TableData'; import type { RouterHistory } from 'react-router-dom';
import type { Transaction } from 'src/utils/types';
import {Link} from "react-router-dom";
import separaterIcon from 'src/assets/images/icons/chevron.svg';
 function TransactionsPage() {

    return (
        <div>
            <div className="breacrumb">
                <Container>
                    <ul className="d-flex justify-content-end">
                        <li><Link to={`/`}>Home</Link></li>
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
} export default TransactionsPage;