import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Table,
} from 'reactstrap';
import moment from 'moment';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockArray: [],
    };
  }
  /**
   * @api_key: send private key for security purpose
   * here call a api get-blocks and get data from blocks table.
   */
  componentWillMount() {
    fetch(
          'http://localhost:3000/api/get-blocks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: 'qscvfgrtmncefiur2345',
        },
      },
        )
        .then((res) => res.json())
        .then((res) => {
          this.setState({ blockArray: res.result });
        }).catch((error) => {
          console.log('error is !!!', error);
        });
  }
  render() {
      const blocks = this.state.blockArray;
    return (
      <div>
        <Header />
        <section className="bg-theme full-height-conatainer">
          <Container>


            {/*========== make this title-header component start=================*/}

            <Row className="title-header pt-3">
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


            {/*========== make this title-header component end=================*/}

            <Row>
              <Col>
                <Table className="transactions-table">
                  <thead className="dark">
                    <tr>
                      <th>Height</th>
                      <th>Age</th>
                      <th>Txn</th>
                      <th>hash</th>
                    </tr>
                  </thead>
                  <tbody className="scroll-theme-1">
                    {blocks && blocks.length && blocks.length > 0 && blocks.map((data, index) => (
                      <tr key={index}>
                        <td className="text-black">{data.block_number}</td>
                        <td className="text-black">{moment(parseInt(data.timestamp, 10)).fromNow()}</td>
                        <td className="text-black">{data.size}</td>
                        <td className="text-black">{data.hash}</td>
                      </tr>
                                        ))}
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