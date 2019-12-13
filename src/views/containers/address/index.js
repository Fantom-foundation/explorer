import React from "react";
import { Container, Row, Col } from "reactstrap";
import AddressDetails from "src/views/components/AddressDetails";
import Assets from "./assets";
import Transactions from "./transactions";
import { Link, Route, useRouteMatch } from "react-router-dom";

export default () => {
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-content-center">
              <AddressDetails />
              <div className="d-none d-lg-block">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item">Library</li>
                </ul>
              </div>
            </div>
            <div className="fantom-tabs-wrapper">
              <Link
                className={`f-t-btn ${
                  useRouteMatch(`/address/assets`) ? "active" : ""
                }`}
                to={`/address/assets`}
              >
                Assets
              </Link>
              <Link
                className={`f-t-btn ${
                  useRouteMatch(`/address/transactions`) ? "active" : ""
                }`}
                to={`/address/transactions`}
              >
                Transactions
              </Link>
            </div>
            <div>
              <Route path={`/address/assets`} render={Assets} />
              <Route path={`/address/transactions`} render={Transactions} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
