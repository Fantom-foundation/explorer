import React from "react";
import { Container, Row, Col } from "reactstrap";
import AddressDetails from "src/views/components/AddressDetails";
import Assets from "./assets";
import Transactions from "./transactions";
import { Link, Route, withRouter } from "react-router-dom";
const base = "address";
export default withRouter(({ location }) => {
  const currentPath = location.pathname;
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col>
            <div>
              <AddressDetails />
            </div>
            <div className="fantom-tabs-wrapper">
              <Link
                className={`f-t-btn ${
                  currentPath === `/${base}/assets` ? "active" : ""
                }`}
                to={`/${base}/assets`}
              >
                Assets
              </Link>
              <Link
                className={`f-t-btn ${
                  currentPath === `/${base}/transactions` ? "active" : ""
                }`}
                to={`/${base}/transactions`}
              >
                Transactions
              </Link>
            </div>
            <div>
              <Route path={`/${base}/assets`} render={Assets} />
              <Route path={`/${base}/transactions`} render={Transactions} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
