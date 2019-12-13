import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { card1 } from "./mokeData";
import Transactions from "./transactions";
import Holders from "./holders";
import ProfileSocial from "src/views/components/ProfileSocial";
import assetLogo from "src/assets/images/Logo/fantom-logo-small.svg";

export default () => {
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-3  mb-lg-4 pb-3">
              <div className="d-flex align-items-center">
                <h2 className="text-grey mb-0">Asset</h2>
                <div className="ml-4 asset-logo">
                  <img src={assetLogo} alt="Fantom" />
                  <p>Fanton</p>
                </div>
              </div>
              <div className="d-none d-lg-block">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item">
                    <Link href="/">Assets</Link>
                  </li>
                  <li class="breadcrumb-item">FTM</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="card-row mb-4 pb-3">
          <Col lg={6}>
            <Card className="detail-card h-100">
              <h3 className="text-grey">Overview</h3>
              <table>
                {card1.map(({ title, value }, index) => (
                  <tr key={index}>
                    <td className="title-col">
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
            <Card className="detail-card contact h-100">
              <h3 className="text-grey">Overview</h3>
              <table>
                <tr>
                  <td className="title-col">
                    <h4>Contract:</h4>
                  </td>
                  <td className="info-col">
                    <p className="text-ellipsis">
                      <Link className="hash" to="/">
                        0x45804880De22913dAFE09f4980848ECE6EcbAf78
                      </Link>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="title-col">
                    <h4>Holders:</h4>
                  </td>
                  <td className="info-col">
                    <h4>64,381 addresses</h4>
                  </td>
                </tr>
                <tr>
                  <td className="title-col">
                    <h4>Social:</h4>
                  </td>
                  <td className="info-col">
                    <ProfileSocial />
                  </td>
                </tr>
                <tr>
                  <td className="title-col">
                    <h4>Website:</h4>
                  </td>
                  <td className="info-col">
                    <a
                      className="text-primary web-address"
                      href="https://fantom.foundation"
                      target="_blank"
                    >
                      https://fantom.foundation
                    </a>
                  </td>
                </tr>
              </table>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="fantom-tabs-wrapper">
              <Link
                className={`f-t-btn ${
                  useRouteMatch(`/assets/detail/transactions`) ? "active" : ""
                }`}
                to={`/assets/detail/transactions`}
              >
                Transactions
              </Link>
              <Link
                className={`f-t-btn ${
                  useRouteMatch(`/assets/detail/holders`) ? "active" : ""
                }`}
                to={`/assets/detail/holders`}
              >
                Holders
              </Link>
            </div>
            <Route path={`/assets/detail/transactions`} render={Transactions} />
            <Route path={`/assets/detail/holders`} render={Holders} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
