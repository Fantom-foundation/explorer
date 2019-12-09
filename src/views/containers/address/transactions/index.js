import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import searchIcon from "src/assets/images/icons/search-icon.svg";
import tableMockData from "./tableMockData";
export default () => (
  <div>
    <Row>
      <Col>
        <div>
          <Table className="ftm-table">
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
                  <td>0x264dab51d080f3…</td>
                  <td>5068703</td>
                  <td>1 sec ago</td>
                  <td>0x54bf25af72ec93…</td>
                  <td>0xc50489a925e9c8…</td>
                  <td>306,460 FTM</td>
                  <td>0.1 FTM</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Row>
  </div>
);
