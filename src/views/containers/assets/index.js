import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import tableMockData from "./tableMockData";
import Pagination from "src/views/components/Pagination";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "src/views/components/IconsSvg";
const TableHeadArrows = ({ up = false, down = false }) => (
  <div className={`arrowWrapper ${up ? "up" : ""} ${down ? "down" : ""}`}>
    <ArrowUp />
    <ArrowDown />
  </div>
);
export default () => (
  <section className="page-section">
    <Container>
      <Row>
        <Col>
          <div className="d-flex align-items-center justify-content-end">
            <div>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li class="breadcrumb-item">Assets</li>
              </ul>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h2 className="text-grey mb-0">Assets</h2>
            <Pagination />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Table className="ftm-table">
              <thead>
                <tr>
                  <th>
                    <div className="with-arrow">
                      Name
                      <TableHeadArrows />
                    </div>
                  </th>
                  <th>
                    <div className="with-arrow">
                      Price
                      <TableHeadArrows />
                    </div>
                  </th>
                  <th>
                    <div className="with-arrow">
                      Market cap
                      <TableHeadArrows down />
                    </div>
                  </th>
                  <th>
                    <div className="with-arrow">
                      Supply
                      <TableHeadArrows />
                    </div>
                  </th>
                  <th>
                    <div className="with-arrow">
                      Holders
                      <TableHeadArrows />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableMockData.map(
                  ({
                    assetName,
                    assetFullName,
                    price,
                    marketCap,
                    supply,
                    holders
                  }) => (
                    <tr>
                      <td>
                        <p className="assetName text-primary mb-0 d-inline">
                          {assetName}
                        </p>
                        <p className="assetFullName mb-0 ml-1 d-inline">
                          {assetFullName}
                        </p>
                      </td>
                      <td>{price}</td>
                      <td>{marketCap}</td>
                      <td>{supply}</td>
                      <td>{holders}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </div>
          <div className="d-flex align-items-center justify-content-end mb-4">
            <Pagination />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);
