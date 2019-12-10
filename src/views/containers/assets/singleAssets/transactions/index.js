import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import searchIcon from "src/assets/images/icons/search-icon.svg";
import tableMockData from "./tableMockData";
import Pagination from "src/views/components/Pagination";
export default () => (
  <div>
    <Row>
      <Col>
        <div className="d-flex align-items-center justify-content-between mb-5">
          <p className="total-tranactions mb-0">543,212 transactions found</p>
          <Pagination />
        </div>
        <div>
          <Table className="ftm-table">
            <thead>
              <tr>
                <th>Tx Hash</th>
                <th>Age</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableMockData.map(data => (
                <tr>
                  <td>
                    <a className="text-primary">0x264dab51d080f3…</a>
                  </td>

                  <td>1 sec ago</td>
                  <td>
                    <a className="text-primary">0x54bf25af72ec93…</a>
                  </td>
                  <td>
                    <a className="text-primary">0xc50489a925e9c8…</a>
                  </td>
                  <td>306,460 FTM</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex align-items-center justify-content-end mb-4">
          <Pagination />
        </div>
      </Col>
    </Row>
  </div>
);
