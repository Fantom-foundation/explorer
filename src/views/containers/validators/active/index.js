import React from "react";
import { Row, Col, Card, Table, Input } from "reactstrap";

import tableMockData from "./tableMockData";
import { ArrowUp, ArrowDown } from "src/views/components/IconsSvg";
const TableHeadArrows = ({ up = false, down = false }) => (
  <div className={`arrowWrapper ${up ? "up" : ""} ${down ? "down" : ""}`}>
    <ArrowUp />
    <ArrowDown />
  </div>
);

export default () => (
  <div>
    <Row>
      <Col>
        <div>
          <Table className="ftm-table responsive validator-active">
            <thead>
              <tr>
                <th>
                  <div className="with-arrow">
                    Rank
                    <TableHeadArrows />
                  </div>
                </th>
                <th>
                  <div className="with-arrow">
                    Name
                    <TableHeadArrows />
                  </div>
                </th>
                <th>
                  <div className="with-arrow">
                    Proof of Importance
                    <TableHeadArrows />
                  </div>
                </th>
                <th>
                  <div className="with-arrow">
                    Validating power
                    <TableHeadArrows />
                  </div>
                </th>
                <th>
                  <div className="with-arrow">
                    Uptime
                    <TableHeadArrows />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableMockData.map(
                (
                  {
                    name,
                    tokeProofOfImportancensSlashed,
                    validatingPower,
                    uptime
                  },
                  index
                ) => (
                  <tr>
                    <td className="no-mobile">{index + 1}</td>
                    <td className="title">
                      <a className="text-primary">{name}</a>
                    </td>
                    <td className="value" heading="Proof of Importance">
                      {tokeProofOfImportancensSlashed}
                    </td>
                    <td className="value" heading="Validating power">
                      {validatingPower}
                    </td>
                    <td className="value" heading="Uptime">
                      {uptime}
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
