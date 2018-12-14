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
      <React.Fragment>
      <hr />
        <div className="details">

                            <div>
                              <p>Height :</p>
                              <p className="text-ellipsis">{height}</p>
                            </div>
                            <div>
                              <p>Transactions :</p>
                              <p className="text-ellipsis"><span aria-hidden className="text-primary" style={{ cursor: `${transactions >= 1 ? 'pointer' : ''}` }} onClick={() => this.showDetail(height, transactions)}>{transactions} {transactionText}</span></p>
                            </div>
                            <div>
                              <p>Hash :</p>
                              <p className="text-ellipsis">{hash}</p>
                            </div>
                            <div>
                              <p>Parent Hash :</p>
                              <p className="text-ellipsis"><span className="text-primary">{parentHash}</span></p>
                            </div>
        </div>
        </React.Fragment>
    );
  }
}

export default SearchForBlock;
