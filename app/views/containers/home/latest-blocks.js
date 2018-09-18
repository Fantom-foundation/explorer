import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import blockIcon from 'images/icons/block-icon.svg';
import { Title } from 'views/components/coreComponent/index';


export default class LatestBlocks extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      blockArray: [],
    };
  }
  componentWillMount() {
    fetch(
      'http://localhost:3000/api/get-blocks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: 'qscvfgrtmncefiur2345',
        },
        body: JSON.stringify(),
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
      <Col xs={12} md={6} className="right">
        <Row className="header bg-white mb-3 pt-2 pb-3">
          <Col><Title h2 className="text-uppercase mb-0">Latest Blocks</Title></Col>
          <Col className="link-column"><a href="/blocks" className="link pt-2 text-black">View all</a></Col>
        </Row>
        <Row className="blocks">
         {blocks && blocks.length && blocks.length > 0 && blocks.map((data, index) => (
          <Col key={index} xs={12} className="bg-white mb-3">
                <Row>
                  <Col className="pr-0">
                    <p className="text-black"><img src={blockIcon} className="block-icon" />{data.block_number}</p>
                  </Col>
                  <Col className="time-date-col pl-0">
                    <p><span className="text-primary">{moment(parseInt(data.timestamp, 10)).fromNow()}</span></p>
                  </Col>
                </Row>
                <p className="hash-holder">
                  <span className="text-gray">Hash</span>&nbsp;
                  <span className="text-primary hash-value">{data.hash}</span>
                </p>
                <p>
                  <span className="text-gray">Mined by</span>&nbsp;
                  <span className="text-primary">John Doe</span>
                </p>
                <p className="mb-0">
                  <span className="text-gray">Txns</span>&nbsp;
                  <span className="text-primary">{data.size}</span>
                </p>
              </Col>
         ))}
        </Row>
      </Col>
    );
  }
}
