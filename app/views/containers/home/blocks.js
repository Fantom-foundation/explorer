import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Table
} from 'reactstrap';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';

export default class Blocks extends Component {

    render() {
        return (
            <div>
                <Header />
                <section className="bg-theme">
                    <Container>
                        <Row className="header-title pt-3">
                            <Col className="pt-3">
                            <Title h2>Blocks</Title>
                                </Col>
                            <Col>
                                <div className="form-element form-input">
                                    <input id="search" className="form-element-field" placeholder=" " type="search" required="" />
                                    <div className="form-element-bar"></div>
                                    <label className="form-element-label" htmlFor="search">Search by Address / Txhash / Block Heights</label>

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Table >
                                    <thead className="dark">
                                        <tr>
                                            <th>Height</th>
                                            <th>Age</th>
                                            <th>Txn</th>
                                            <th>Uncles</th>
                                            <th>Miner</th>
                                            <th>GasUsed</th>
                                            <th>GasLimit</th>
                                            <th>Avg.GasPrice</th>
                                            <th>Reward</th>
                                        </tr>
                                    </thead>
                                    <tbody className="scroll-theme-1">
                                    {_.times(20, (i) =>
                                        <tr>
                                            <td className="text-primary">6197846</td>
                                            <td className="text-gray-dark">30 secs ago</td>
                                            <td className="text-black">101</td>
                                            <td className="text-primary">1</td>
                                            <td className="text-gray">Ethermine</td>
                                            <td className="text-black">7987286 (99.84%)</td>
                                            <td className="text-primary">0.00000524</td>
                                            <td className="text-gray">0.00000524</td>
                                            <td className="text-black">3.07095 FTM</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        );
    }
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(HomePage);
