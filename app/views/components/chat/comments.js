import React from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import { Title } from '../../components/coreComponent';

// import profileIcon from '../../../images/icons/profile.png';

export default class Comments extends React.Component {

  render() {
    return (
      <div id="comments">

        <div className="main-comments">
          <Row>
            {/* <Col className="image-col"><img src={profileIcon} /></Col> */}
            <Col>
              <FormGroup>
                <Input type="text" name="join" placeholder="Join the discussion…" />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            {/* <Col className="image-col"><img src={profileIcon} /></Col> */}
            <Col>
              <Title h2>Jason Sandifer</Title>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

              <div className="options">
                <ul>
                  <li>9 <span className="up" /> | <span className="down" /></li>
                  <li><span>Reply</span></li>
                  <li><span>Share</span></li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>


      </div>
    );
  }
}
