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
          <Table className="ftm-table">
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
                    <td>{index + 1}</td>
                    <td>
                      <a className="text-primary">{name}</a>
                    </td>
                    <td>{tokeProofOfImportancensSlashed}</td>
                    <td>{validatingPower}</td>
                    <td>{uptime}</td>
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
