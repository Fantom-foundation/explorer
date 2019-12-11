import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import searchIcon from "src/assets/images/icons/search-icon.svg";
import tableMockData from "./tableMockData";
import Pagination from "src/views/components/Pagination";
export default () => (
  <div>
    <Row>
      <Col>
        <div className="d-flex align-items-center justify-content-between mb-3 mb-lg-5">
          <p className="total-tranactions mb-0">A total of 64,381 holders</p>
          <div className="d-none d-lg-block">
            <Pagination />
          </div>
        </div>
        <div>
          <Table className="ftm-table responsive asset-holder">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {tableMockData.map((data, index) => (
                <tr>
                  <td className="index">{index + 1}</td>
                  <td className="hash">
                    <a className="text-primary">
                      0x5195427ca88df768c298721da791b93ad11eca65
                    </a>
                  </td>
                  <td className="value" heading="Amount">
                    453,649,820.67643245
                  </td>
                  <td className="value" heading="Percentage">
                    46.6432%
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex align-items-center justify-content-center justify-content-lg-end mb-4">
          <Pagination />
        </div>
      </Col>
    </Row>
  </div>
);
