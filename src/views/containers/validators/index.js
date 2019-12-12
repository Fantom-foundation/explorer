import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { Link, Route, withRouter } from "react-router-dom";
import { card1, card2 } from "./mokeData";
import Active from "./active";
import Cheaters from "./cheaters";

const base = "validators";

export default withRouter(({ location }) => {
  const currentPath = location.pathname;
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-grey mb-0">Validators</h2>
              <div className="d-none d-lg-block">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>

                  <li class="breadcrumb-item">Validators</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="card-row mb-4 pb-3">
          <Col lg={6}>
            <Card className="detail-card validator-card h-100">
              <h3 className="text-grey">Overview</h3>
              <table>
                {card1.map(({ title, value }, index) => (
                  <tr key={index}>
                    <td className="title-col" style={{ width: 150 }}>
                      <h4>{title}</h4>
                    </td>
                    <td className="info-col">
                      <h4>{value}</h4>
                    </td>
                  </tr>
                ))}
              </table>
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="detail-card validator-card h-100">
              <h3 className="text-grey">Current epoch</h3>
              <table>
                {card2.map(({ title, value }, index) => (
                  <tr key={index}>
                    <td className="title-col" style={{ width: 150 }}>
                      <h4>{title}</h4>
                    </td>
                    <td className="info-col">
                      <h4>{value}</h4>
                    </td>
                  </tr>
                ))}
              </table>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="fantom-tabs-wrapper">
              <Link
                className={`f-t-btn ${
                  currentPath === `/${base}/active` ? "active" : ""
                }`}
                to={`/${base}/active`}
              >
                Active
              </Link>
              <Link
                className={`f-t-btn ${
                  currentPath === `/${base}/cheaters` ? "active" : ""
                }`}
                to={`/${base}/cheaters`}
              >
                Cheaters
              </Link>
            </div>
            <Route path={`/${base}/active`} render={Active} />
            <Route path={`/${base}/cheaters`} render={Cheaters} />
          </Col>
        </Row>
      </Container>
    </section>
  );
});
