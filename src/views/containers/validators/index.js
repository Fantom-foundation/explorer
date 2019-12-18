import React from "react";
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Card } from 'reactstrap';
import { Link, Route, withRouter } from "react-router-dom";
import { card1, card2 } from "./mokeData";
import Active from "./active";
import Cheaters from "./cheaters";
import classnames from 'classnames';
import separaterIcon from 'src/assets/images/icons/chevron.svg';
const base = "validators";

export default withRouter(({ location }) => {
  const currentPath = location.pathname;
  const [activeTab, setActiveTab] = React.useState('1');

  const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
  }
  return (
    <section className="page-section ">
      <Container>
        <Row className="top-row">
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-grey mb-0 title-top">Validators</h2>
              <div className="d-none d-lg-block">
              <div className="breacrumb">
                  <ul className="d-flex justify-content-end">
                    <li><Link to={`/`}>Home</Link></li>
                    <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                    <li className="active">Validators</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="card-row validator-card-row mb-2 mb-lg-4 pb-lg-3">
          <Col lg={6}>
            <Card className="detail-card validator-card h-100">
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
            <Card className="detail-card validator-card h-100">
              <h3 className="text-grey">Current epoch</h3>
              <table>
                {card2.map(({ title, value }, index) => (
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
        </Row>
        <Row>
          <Col>
            <div className="fantom-tabs-wrapper address-wrapper">
            <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}> Active </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }} >Cheaters </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                               <Active />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Cheaters />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
