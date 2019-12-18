import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import searchIcon from "src/assets/images/icons/search-icon.svg";
import tableMockData from "./tableMockData";
function TransactionsAssets (){
  return (
  <div>
    <Row>
      <Col>
        <div className="d-flex align-items-center justify-content-between mb-3 mb-lg-5">
          <p className="total-tranactions mb-0">543,212 transactions found</p>
          <div className="d-none d-lg-block">
   
          </div>
        </div>
        <div>
          <Table className="ftm-table responsive assest-single-transactions">
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
                  <span className="d-lg-none date">Dec 07 2019 17:10:28</span>
                  <td className="m-100 hash">
                    <p className="text-ellipsis">
                      <a className="text-primary">0x264dab51d080f3…</a>
                    </p>
                  </td>

                  <td heading="Height" className="value m-50 height d-lg-none">
                    5068703
                  </td>
                  <td className="no-mobile">1 sec ago</td>
                  <td heading="From" className="value m-50 from">
                    <p className="text-ellipsis">
                      <a className="text-primary">0x54bf25af72ec93…</a>
                    </p>
                  </td>

                  <td heading="To" className="value m-50 to">
                    <p className="text-ellipsis">
                      <a className="text-primary">0xc50489a925e9c8…</a>
                    </p>
                  </td>
                  <td heading="Value" className="value m-50 asset-value">
                    306,460 FTM
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex align-items-center justify-content-center justify-content-lg-end mb-4">
        
        </div>
      </Col>
    </Row>
  </div>
  )
}
export default TransactionsAssets;