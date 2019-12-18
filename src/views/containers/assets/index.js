import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import tableMockData from "./tableMockData";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown } from "src/views/components/IconsSvg";
import first from 'src/assets/images/icons/gotoendbutton.svg';
import last from 'src/assets/images/icons/gotoendbutton.svg';
import prev from 'src/assets/images/icons/back-button-active.svg';
import next from 'src/assets/images/icons/forward-button.svg';
import separaterIcon from 'src/assets/images/icons/chevron.svg';
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
          <div className="breacrumb">
            <Container>
              <ul className="d-flex justify-content-end">
                <li><Link to={`/`}>Home</Link></li>
                <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                <li className="active">Assets</li>
              </ul>
            </Container>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3 mb-lg-5">
            <h2 className="text-grey mb-0 title-top title-top">Assets</h2>
            <div className="d-none d-lg-block">
              <div className="pagination-section">

              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Table className="ftm-table responsive assest-transactions">
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
                        <td className="title">
                          <p className="assetName text-primary mb-0 d-inline">
                            {assetName}
                          </p>
                          <p className="assetFullName mb-0 ml-1 d-inline">
                            {assetFullName}
                          </p>
                        </td>
                        <td className="value" heading="Price">
                          {price}
                        </td>
                        <td className="value" heading="Market cap">
                          {marketCap}
                        </td>
                        <td className="value" heading="Supply">
                          {supply}
                        </td>
                        <td className="value" heading="Holders">
                          {holders}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          </div>
          <div className="d-flex align-items-center justify-content-center justify-content-lg-end mb-4">
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);
