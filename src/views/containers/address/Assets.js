// @flowimport * as React from 'react';
import * as React from 'react';

import Web3 from 'web3';
import searchIcon from "src/assets/images/icons/search-icon.svg";
import { Row, Col, Card, Table, Input } from 'reactstrap';
import tableMockData from "./tableMockData";
function AssetsPage() {
    return (
        <div>
            <Row className="card-row">
                <Col lg={6}>
                    <Card>
                        <div>
                            <h3 className="text-grey">Value in FTM</h3>
                            <h3 className="text-navy">
                                <b>4,203,704 FTM</b>
                            </h3>
                        </div>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <div>
                            <h3 className="text-grey">Value in FTM</h3>
                            <h3 className="text-navy">
                                <b>4,203,704 FTM</b>
                            </h3>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div>
                        <div className="ftm-table-search ml-auto mr-auto mr-lg-0">
                            <Input
                                type="search"
                                placeholder="Search for assets in wallet"
                                className="ftm-table-search-input"
                            />
                            <button className="search-btn">
                                <img src={searchIcon} alt="search" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <Table className="ftm-table responsive address-assets-table">
                            <thead>
                                <tr>
                                    <th>Asset</th>
                                    <th>Balance</th>
                                    <th>Value in FTM</th>
                                    <th>Value in USD</th>
                                    <th>Token price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableMockData.map(
                                    ({
                                        assetName,
                                        assetFullName,
                                        balance,
                                        ftm,
                                        usd,
                                        tokenPrice
                                    }) => (
                                            <tr>
                                                <td className="title">
                                                    <p className="assetName text-primary mb-0 d-inline">
                                                        {assetName}
                                                    </p>
                                                    <p className="assetFullName mb-0 ml-1 d-inline">
                                                        {assetFullName}
                                                    </p>
                                                </td>
                                                <td className="value" heading="Balance">
                                                    {balance}
                                                </td>
                                                <td className="value" heading="Value in FTM">
                                                    {ftm}
                                                </td>
                                                <td className="value" heading="Value in USD">
                                                    {usd}
                                                </td>
                                                <td className="value" heading="Token price">
                                                    {tokenPrice}
                                                </td>
                                            </tr>
                                        )
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </div>
    );
} export default AssetsPage;