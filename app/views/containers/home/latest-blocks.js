import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import _ from 'lodash';
import blockIcon from 'images/icons/block-icon.svg';
import { Title } from 'views/components/coreComponent/index';

export default class LatestBlocks extends React.Component {
  render() {
    return (
      <Col className="right">
        <Row className="header bg-white mb-3 pt-2 pb-3">
          <Col><Title h2 className="text-uppercase mb-0">Latest Blocks</Title></Col>
          <Col className="link-column"><a hredf="#" className="link pt-2">View all</a></Col>
        </Row>
        <Row className="blocks">
          {_.times(5, (i) =>
              (<Col xs={12} className="bg-white mb-3">
                <Row>
                  <Col className="pr-0">
                    <p className="text-black"><img src={blockIcon} className="block-icon" />062791</p>
                  </Col>
                  <Col className="time-date-col pl-0">
                    <p><span className="text-primary">23 mins 42 secs</span></p>
                  </Col>
                </Row>
                <p>
                  <span className="text-gray">Hash</span>&nbsp;
                  <span className="text-primary">0X42BB307E4C04F0BF13B7952</span>
                </p>
                <p>
                  <span className="text-gray">Mined by</span>&nbsp;
                  <span className="text-primary">John Doe</span>
                </p>
                <p className="mb-0">
                  <span className="text-gray">Txns</span>&nbsp;
                  <span className="text-primary">30</span>
                </p>
              </Col>)
            )}
        </Row>
      </Col>
    );
  }
}
