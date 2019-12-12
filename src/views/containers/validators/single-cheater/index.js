import React from "react";
import { Container, Row, Col, Card, Table } from "reactstrap";
import { Link, Route, withRouter } from "react-router-dom";
import { card, tableMockData, cheaterData } from "./mokeData";
import qrInon from "src/assets/images/icons/qr.svg";

const base = "validators/single";

export default withRouter(({ location }) => {
  const currentPath = location.pathname;
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <h2 className="text-grey mb-0">Validator</h2>
                <h3 className="font-weight-bold text-navy ml-1 ml-lg-0 mb-0 pl-3 pl-lg-5">
                  Fantom Validator{" "}
                  <span className="d-none d-lg-inline">123</span>
                </h3>
              </div>
              <div className="d-none d-lg-block">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link href="/">Validators</Link>
                  </li>
                  <li class="breadcrumb-item">Fantom Validator 123</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="card-row mb-3 mb-lg-4 pb-3">
          <Col>
            <Card className="detail-card validator-card danger h-100">
              <h3 className="text-grey">Overview</h3>
              <table>
                {card.map(({ title, value, valueClass = "" }, index) => (
                  <tr key={index}>
                    <td className="title-col">
                      <h4>{title}</h4>
                    </td>
                    <td className="info-col  pl-2 pl-lg-5">
                      <div className="d-flex align-items-center">
                        <h4 className={valueClass}>{value}</h4>
                        {index === 0 && (
                          <div className="hashBtnWrapper">
                            <button className="ml-0 ml-lg-4">
                              <i className="far fa-copy" />
                            </button>
                            <button className="d-none d-lg-block">
                              <img src={qrInon} alt="QR" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
              <div className="mt-3 pt-4">
                <h3 className="text-danger">Cheater</h3>
                <table className="cheater">
                  {cheaterData.map(({ title, value }, index) => (
                    <tr key={index}>
                      <td className="title-col">
                        <h4>{title}</h4>
                      </td>
                      <td className="info-col pl-1 pl-lg-5">
                        <div className="d-flex align-items-center">
                          <h4 className="text-danger">{value}</h4>
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="font-weight-bold text-navy mb-4">Delegations</h3>
            <p className="total-tranactions mb-3 mb-lg-4">10 delegates</p>

            <div>
              <Table className="ftm-table responsive single-validator">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tableMockData.map(data => (
                    <tr>
                      <td className="title">
                        <p className="text-ellipsis">
                          <a className="text-primary">
                            ftm1mt9ye3g0u72dlvyf6j68f2u78s0zaurjftpe28
                          </a>
                        </p>
                      </td>

                      <td className="value" heading="Delegated">
                        306,460 FTM
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="d-flex align-items-center justify-content-end mb-4"></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
