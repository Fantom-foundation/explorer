// @flowimport * as React from 'react';
import * as React from 'react';

import Web3 from 'web3';
import searchIcon from "src/assets/images/icons/search-icon.svg";
import { Row, Col, Card, Table, Input } from 'reactstrap';
import { useRouteMatch, useHistory, Link } from 'react-router-dom';
import { api_get_address, api_get_price } from 'src/utils/Utlity';
import axios from "axios";
function AssetsPage() {
    const match = useRouteMatch('/address/:addressid');
    const { params: { addressid } } = match;
    const [addressBalance, setaddressBalance] = React.useState(0);
    const [currentPrice, setcurrentPrice] = React.useState(0);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_address}${addressid}&offset=0&count=30`,
        })
            .then(function (response) {
                // console.log(response.data.data.account);
                setaddressBalance(response.data.data.account.balance)
            }).catch(function (error) {
                //console.log(error.message);
            });
        axios({
            method: 'get',
            url: `${api_get_price}`,
        })
            .then(function (response) {
                const priceParsed = JSON.parse(response.data.body);
                //console.log(priceParsed);
                if (priceParsed && priceParsed.price) {
                    const price3d = parseFloat(priceParsed.price).toFixed(3);
                    setcurrentPrice(price3d);
                }
            });
    }, []);
    return (
        <div>
            <Row className="card-row">
                <Col lg={6}>
                    <Card>
                        <div>
                            <h3 className="text-grey">Value in FTM</h3>
                            <h3 className="text-navy">
                                <b>{addressBalance.toFixed(2)} FTM</b>
                            </h3>
                        </div>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card>
                        <div>
                            <h3 className="text-grey">Value in USD</h3>
                            <h3 className="text-navy">
                                <b>${(parseFloat(addressBalance) * parseFloat(currentPrice)).toFixed(3)} USD</b>
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
                                <tr>
                                    <td className="title">
                                        <p className="assetName text-primary mb-0 d-inline">
                                        FTM
                                        </p>
                                        <p className="assetFullName mb-0 ml-1 d-inline">
                                        Fantom
                                        </p>
                                    </td>
                                    <td className="value" heading="Balance">
                                    {addressBalance.toFixed(2)} 
                                    </td>
                                    <td className="value" heading="Value in FTM">
                                    {addressBalance.toFixed(2)} FTM
                                    </td>
                                    <td className="value" heading="Value in USD">
                                    ${(parseFloat(addressBalance) * parseFloat(currentPrice)).toFixed(3)} USD
                                    </td>
                                    <td className="value" heading="Token price">
                                    ${currentPrice}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </div>
    );
} export default AssetsPage;