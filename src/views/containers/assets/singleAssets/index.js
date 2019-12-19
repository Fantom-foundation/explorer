import React from "react";
import { Container, Row, Col, Card , TabContent, TabPane, Nav, NavItem, NavLink, } from "reactstrap";
import { Link, Route, withRouter } from "react-router-dom";
import { card1 } from "./mokeData";
import Transactions from "./transactions";
import Holders from "./holders";
import ProfileSocial from "src/views/components/ProfileSocial";
import assetLogo from "src/assets/images/Logo/fantom-logo-small.svg";
import separaterIcon from 'src/assets/images/icons/chevron.svg';
import classnames from 'classnames';
import TransactionsAssets from 'src/views/containers/assets/singleAssets/transactions/';
import AssetsHolders from 'src/views/containers/assets/singleAssets/holders/';
const base = "assets/detail";
export default withRouter(({ location }) => {
  const currentPath = location.pathname;
  const [activeTab, setActiveTab] = React.useState('1');

  const toggle = tab => {
      if (activeTab !== tab) setActiveTab(tab);
  }
  return (
    <section className="page-section">
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-between mb-3  mb-lg-4 pb-3 top-row">
              <div className="d-flex align-items-center">
                <h2 className="text-grey mb-0 title-top">Asset</h2>
                <div className="ml-4 asset-logo">
                  <img src={assetLogo} alt="Fantom" />
                  <p>Fanton</p>
                </div>
              </div>
              <div className="d-none d-lg-block">
                <div className="breacrumb">
                  <ul className="d-flex justify-content-end">
                    <li><Link to={`/`}>Home</Link></li>
                    <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                    <li><Link to={`/assets/`}>Asset</Link></li>
                    <li><span><img alt="Search" src={separaterIcon} className="icon" /></span> </li>
                    <li className="active">FTM</li>
                  </ul>
                </div>
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
              <h3 className="text-grey">Profile summary</h3>
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
            <div className="fantom-tabs-wrapper address-wrapper">
            <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}> Transactions </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }} >Holders </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                               <TransactionsAssets />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                             <AssetsHolders />
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
