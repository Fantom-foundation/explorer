import React, { Component } from 'react';
import { Row, Col, Table, TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';

/**
 * SearchForBlock :  A component meant for searching details of particuler Block , on entering valid index in search field.
 */

class SearchForBlock extends Component {

  showDetail(height, transactions) {
    if (transactions <= 0) {
      return;
    }
    const { showDetail } = this.props; // eslint-disable-line
    if (showDetail) {
      showDetail(height);
    }
  }
  render() {
    const { blocks } = this.props; // eslint-disable-line

    let height = '';
    let hash = '';
    let parentHash = '';
    let transactions = '';

    if (blocks && blocks.length) {
      height = blocks[0].height;
      hash = blocks[0].hash;
      parentHash = blocks[0].parentHash;
      transactions = blocks[0].transactions;
    }
    let transactionText = 'transactions';
    if (transactions <= 1) {
      transactionText = 'transaction';
    }

    return (
      <Row >
        <Col>
          <div id="theme-tab">
            <Nav tabs className="mb-3 theme-nav">
              <NavItem>
                <NavLink
                  className={classnames({ active: true })}
                >Overview </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="theme-nav-tab-content" activeTab={'1'}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Row>
                      <Col>
                        <Table className="information-table" >
                          <thead>
                            <tr>
                              <th>Block Information</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Height:</td>
                              <td>{height}</td>
                            </tr>
                            <tr>
                              <td>Transactions:</td>
                              <td><span aria-hidden className="text-primary" style={{ cursor: `${transactions >= 1 ? 'pointer' : ''}` }} onClick={() => this.showDetail(height, transactions)}>{transactions} {transactionText}</span></td>
                            </tr>
                            <tr>
                              <td>Hash:</td>
                              <td>{hash}</td>
                            </tr>
                            <tr>
                              <td>Parent Hash:</td>
                              <td><span className="text-primary">{parentHash}</span></td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row >
    );
  }
}

export default SearchForBlock;
