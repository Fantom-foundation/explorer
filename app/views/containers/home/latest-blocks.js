import React from 'react';
import {
    Row,
    Col,
} from 'reactstrap';
import _ from 'lodash';
import blockIcon from 'images/icons/block-icon.svg';
import { Title } from 'views/components/coreComponent/index';

export default class LatestBlocks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     transactionArray: [],
  //   };
  // }
  // componentWillMount() {
  //   fetch(
  //     'http://localhost:3000/public/api/transactions?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&sort=asc&apikey=$2a$10$CDxkjkpQIVhi9R/LSqu8eekpaUpyOAaGRoUlEqOphJkI8jFjCsAK21536916662372',
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   )
  //   .then((res) => res.json())
  //   .then((res) => {
  //    // debugger;
  //     console.log('Res is !!!', res);
  //     this.setState({ transactionArray: res.result });
  //   }).catch((error) => {
  //     console.log('error is !!!', error);
  //   });
  // }
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
