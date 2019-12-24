// @flowimport * as React from 'react';
import * as React from 'react';

import Web3 from 'web3';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import io from 'socket.io-client';
import Web3Provider from 'src/utils/DataProvider/web3Provider';
import { usePagination } from 'src/utils/hooks';
import { toFixed } from 'src/common/utility'; import { DataTable } from 'src/views/components/DataTable';
import Wrapper from 'src/views/wrapper/wrapper';
import Loader from 'src/views/components/Loader';
import TableData from 'src/views/containers/address/TableData';
import type { Transaction } from 'src/utils/types';
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import qrIcon from 'src/assets/images/icons/qr.svg';
import classnames from 'classnames';
import axios from "axios";
import AssetsPage from 'src/views/containers/address/Assets';
import TransactionsassetsPageData from 'src/views/containers/address/TableData';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { api_get_address } from 'src/utils/Utlity';
import { CopyToClipboard } from 'react-copy-to-clipboard';
function AddressPage() {
    const [activeTab, setActiveTab] = React.useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const [txCopied, setTxCopied] = React.useState(false);
    const match = useRouteMatch('/address/:addressid');
    const { params: { addressid } } = match;
    function fntxCopied() {
        setTxCopied(true)
        setTimeout(() => {
            setTxCopied(false)
        }, 20000);
    }
    return (
        <div className=" address-wrapper ">
            <div className="breacrumb address-wrapper ">
                <Container>
                    <Row className=" d-flex align-items-center top-row">
                        <Col className=" col-12 col-sm-9">
                            <div className="title-section d-flex align-items-center">
                                <h2>Address</h2>
                                <span>{addressid}</span>
                                <span> <CopyToClipboard
                                    text={addressid}
                                    onCopy={fntxCopied} ><i className="far fa-copy"></i>
                                </CopyToClipboard>
                                </span>
                                <span>
                                    <img src={qrIcon} alt="qr-icon" />
                                </span>

                                <label className="copied-text">
                                {txCopied ? (<span style={{ color: '#777' }}>  <i class="far fa-check-circle" aria-hidden="true"></i>   Copied.</span>) : null}
                                </label>
                            </div>
                        </Col>
                        <Col className="col-12 col-sm-3">
                            <ul className="d-flex justify-content-end">
                                <li><Link to={`/`}>Home</Link></li>
                                <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                                <li className="active">Address</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}> Assets </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }} >Transactions </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <AssetsPage />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <TransactionsassetsPageData />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        </div>
    );
} export default AddressPage;