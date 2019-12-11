import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import searchIcon from "src/assets/images/icons/search-icon.svg";
import tableMockData from "./tableMockData";
import Pagination from "src/views/components/Pagination";
export default () => (
  <div>
    <Row>
      <Col>
        <div className="d-flex align-items-center justify-content-between mb-3 pb-1 pb-lg-0 mb-lg-5">
          <p className="total-tranactions mb-0">32 transactions found</p>
          <div className="d-none d-lg-block">
            <Pagination />
          </div>
        </div>
        <div>
          <Table className="ftm-table responsive address-transactions-table">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Block</th>
                <th>Age</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {tableMockData.map(data => (
                <tr>
                  <span className="d-lg-none date">Dec 07 2019 17:10:28</span>
                  <td className="m-100 hash">
                    <a className="text-primary">0x264dab51d080f3…</a>
                  </td>
                  <td heading="Height" className="value m-50 height">
                    <a className="text-primary">5068703</a>
                  </td>
                  <td className="no-mobile">1 sec ago</td>
                  <td heading="From" className="value m-50 from">
                    <a className="text-primary">0x54bf25af72ec93…</a>
                  </td>
                  <td heading="To" className="value m-50 to">
                    <a className="text-primary">0xc50489a925e9c8…</a>
                  </td>
                  <td heading="Value" className="value m-50 asset-value">
                    306,460 FTM
                  </td>
                  <td className="no-mobile">0.1 FTM</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex align-items-center justify-content-center justify-content-lg-end   mb-4">
          <Pagination />
        </div>
      </Col>
    </Row>
  </div>
);
