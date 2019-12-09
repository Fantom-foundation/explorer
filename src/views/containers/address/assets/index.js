import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import searchIcon from "src/assets/images/icons/search-icon.svg";
import tableMockData from "./tableMockData";
export default () => (
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
          <div className="ftm-table-search ml-auto mr-0">
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
          <Table className="ftm-table">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Balance</th>
                <th>Value in 3,643,255</th>
                <th>Value in USD</th>
                <th>Token price</th>
              </tr>
            </thead>
            <tbody>
              {tableMockData.map(({ asset, balance, ftm, usd, tokenPrice }) => (
                <tr>
                  <td>{asset}</td>
                  <td>{balance}</td>
                  <td>{ftm}</td>
                  <td>{usd}</td>
                  <td>{tokenPrice}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  </div>
);
