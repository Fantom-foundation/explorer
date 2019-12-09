// @flow
import logo from "src/assets/images/Logo/logo.svg";
import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Search from "./search";
import Navigation from "./nav/navigation";

const Header = () => (
  <header id="header">
    <Container>
      <nav>
        <div className="logo">
          <img src={logo} alt="Fontam" />
        </div>
        <div className="menu-search-wrapper">
          <Navigation />
          <Search />
        </div>
      </nav>
    </Container>

    {/* <Container>
      <Row>
        <Col>
          <Navigation />
        </Col>
      </Row>
    </Container> */}
  </header>
);

export default Header;
