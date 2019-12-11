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
                <h3 className="font-weight-bold text-navy mb-0 pl-5">
                  Fantom Validator 123
                </h3>
              </div>
              <div>
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
        <Row className="card-row mb-4 pb-3">
          <Col>
            <Card className="detail-card danger h-100">
              <h3 className="text-grey">Overview</h3>
              <table>
                {card.map(({ title, value }, index) => (
                  <tr key={index}>
                    <td className="title-col" style={{ width: 176 }}>
                      <h4>{title}</h4>
                    </td>
                    <td className="info-col  pl-5">
                      <div className="d-flex align-items-center">
                        <h4>{value}</h4>
                        {index === 0 && (
                          <div className="hashBtnWrapper">
                            <button>
                              <i className="far fa-copy" />
                            </button>
                            <button>
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
                <table>
                  {cheaterData.map(({ title, value }, index) => (
                    <tr key={index}>
                      <td className="title-col" style={{ width: 176 }}>
                        <h4>{title}</h4>
                      </td>
                      <td className="info-col  pl-5">
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
            <p className="total-tranactions mb-4">10 delegates</p>

            <div>
              <Table className="ftm-table">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tableMockData.map(data => (
                    <tr>
                      <td>
                        <a className="text-primary">
                          ftm1mt9ye3g0u72dlvyf6j68f2u78s0zaurjftpe28
                        </a>
                      </td>

                      <td>306,460 FTM</td>
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
