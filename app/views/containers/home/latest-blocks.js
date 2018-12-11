import React from 'react';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import blockIcon from 'images/icons/block-icon.svg';
import { Title } from 'views/components/coreComponent/index';
import TitleIcon from  '../../../images/icons/latest-blocks.svg';

import HttpDataProvider from '../../../../app/utils/httpProvider';

export default class LatestBlocks extends React.Component {
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
  // componentWillMount() {
  //   fetch(
  //     'http://localhost:3000/api/get-blocks',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         api_key: 'qscvfgrtmncefiur2345',
  //       },
  //     },
  //   )
  //   .then((res) => res.json())
  //   .then((res) => {
  //     this.setState({ blockArray: res.result });
  //   }).catch((error) => {
  //     console.log('error is !!!', error);
  //   });
  // }

  componentDidMount() {
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
          {
            blocks(first:10) {
              pageInfo {
                hasNextPage
              }
              edges {
                cursor
                node {
                  payload
                }
              }
            }
          }`,
    })
      .then(
        (res) => {
          if (res && res.data) {
            // this.formatTransactionList(res.data);
            const allBlockData = [];
            const edges = res.data.data.blocks.edges;
            let cursor;
            edges.forEach((val) => {
              const { hash, index, stateHash, transactions } = val.node.payload;
              cursor = val.cursor;
              allBlockData.push({
                hash,
                height: index,
                parentHash: stateHash,
                transactions: transactions.length,
              });
            });
            this.setState({
              blockArray: allBlockData,
              cursor,
            });
            console.log('allBlockData', allBlockData);
          }
          return null;
        },
        () => {
          console.log('1');
        }
      )
      .catch((err) => {
        console.log(err, 'err in graphql');
      });
  }
  render() {
    const blocks = this.state.blockArray;
    return (
      <Col xs={12} md={6}>
        <Row className="header">
          <Col className="icon"  style={{backgroundImage:`url(${TitleIcon})`}}><Title h2 className=" blacks text-uppercase mb-0"   >Latest Blocks</Title></Col>
          <Col className="link-column"><a href="/blocks" className="btn">View all</a></Col>
        </Row>
        <Row className="blocks">
          {blocks && blocks.length && blocks.length > 0 && blocks.map((data, index) => (
            <Col key={index} xs={12} className=" mb-3">
              <Row>
                <Col className="pr-0">
                  <p className="text-white"><img src={blockIcon} className="block-icon" />{data.block_number}</p>
                </Col>
                <Col className="time-date-col pl-0">
                  <p><span className="text-primary">{moment(parseInt(data.timestamp, 10)).fromNow()}</span></p>
                </Col> */}
                </Row>
                <p className="hash-holder">
                  <span className="text-gray">Hash</span>
                  &nbsp;
                  <span className="text-primary hash-value">{data.hash}</span>
                </p>
                <p>
                  <span className="text-gray">Mined by</span>
                  &nbsp;
                  <span className="text-primary">John Doe</span>
                </p>
                <p className="mb-0">
                  <span className="text-gray">Txns</span>
                  &nbsp;
                  <span className="text-primary">{data.size}</span>
                </p>
              </Col>
            ))}
        </Row>
      </Col>
    );
  }
}
