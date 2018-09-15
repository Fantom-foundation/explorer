import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import LatestTransactions from 'views/containers/home/latest-transactions';
import LatestBlocks from 'views/containers/home/latest-blocks';
// import { createSelector } from 'reselect';
// import { setUserDetails, updateUserDetails } from 'views/controllers/user-details/action';
// import { getUserDetails } from 'views/controllers/user-details/selector';
import { Title } from 'views/components/coreComponent/index';
import logoIcon from 'images/Logo/Fantom-Logo-icon.svg';
import _ from 'lodash';
import StartWhite from 'images/temp/stats-white.png';
import blockIcon from 'images/icons/block-icon.svg';
import Chart from 'views/containers/chart/index';
//const helper = new ValidateHelper();
export default class HomePage extends Component {

    render() {
        return (
            <div>
                <Header />
                <section className="bg-dark intro" style={{ paddingTop: '89px', paddingBottom: '112px' }}>

                    <Container>
                        <Row>
                            <Col xs={12} md={6} className="discription">
                                <Title h2 className="text-white mb-0"><strong>Beyond</strong></Title>
                                <Title h2 className="text-white"><strong>Blockchain</strong></Title>
                                <p className="text-white mb-0">The Future of Decentralized</p>
                                <p className="text-white">Ecosystem</p>
                            </Col>
                            <Col xs={12} md={6} className="graph-info">
                                <Row className="title-info">
                                    <Col className="logo-column pt-1"><img src={logoIcon} className="logo" alt="logo" /></Col>
                                    <Col className="">
                                        <Title h2 className="mb-0 text-primary">MARKET CAP OF $28.956 BILLION</Title>
                                        <Title h2 className="text-white text-primary mb-0">$285.47 @ 0.04267 FTM/ETH <span style={{ color: '#00ff72' }}>1.13%</span></Title>
                                    </Col>
                                </Row>
                                <Row className="result-info top">
                                    <Col>
                                        <Title h2 className="text-white text-uppercase mb-0"><strong>Last Block</strong></Title>
                                        <Title h2 className="text-white mb-0">6192596 (14.2s)</Title>
                                    </Col>
                                    <Col className="text-right">
                                        <Title h2 className="text-white text-uppercase mb-0"><strong>Transactions</strong></Title>
                                        <Title h2 className="text-white mb-0">296.24 M (7.9 TPS)</Title>
                                    </Col>
                                </Row>
                                <hr className="light" />
                                <Row className="result-info bottom">
                                    <Col className="pr-0">
                                        <Title h2 className="text-uppercase mb-0"><strong>Hash Rate</strong></Title>
                                        <Title h2 className="mb-0">286,235.71 GH/s</Title>
                                    </Col>
                                    <Col className="px-0">

                                        <Title h2 className="text-uppercase text-center balance mb-0"><strong>Your Balance</strong> 149.00FTM</Title>
                                    </Col>
                                    <Col className="text-right pl-0">
                                        <Title h2 className="text-uppercase mb-0"><strong>Network Difficulty</strong></Title>
                                        <Title h2 className="mb-0">3,583.35 TH</Title>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Chart />
                                {/* <img src={StartWhite} className="w-100" /> */}
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section id="latest-blocks" className="bg-theme">
                    <Container>
                        <Row>
                         <LatestTransactions />
                            <LatestBlocks />
                        </Row>
                    </Container>
                </section>

                <Footer />
            </div>
        );
    }
}
// const mapStateToProps = createSelector(
//     getUserDetails(),
//     (userDetails) => ({ userDetails }),
// );
// const mapDispatchToProps = {
//     setUserDetails,
//     updateUserDetails,
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(HomePage);
