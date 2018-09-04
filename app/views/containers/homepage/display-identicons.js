import React from 'react';
import {
    Row,
    Col,
  } from 'reactstrap';
import { Identicons } from 'views/containers/homepage/identicons';
import refreshIcon from 'images/icons/refresh-icon.svg';

export default class DisplayIdenticons extends React.Component {
  render() {
    const index = this.props.index.toString();
    const date = this.props.date.toString();
    return (
      <Row className="m-auto" style={{ maxWidth: '635px' }}>
        <Col>
          <ul className="identicon m-0 p-0">
            <li>
              <label className="form-radio-label">
                <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
                <i className="form-radio-button"></i>
                <div className="d-inline-block" style={{ width: '40px', height: '45px', overflow: 'hidden' }}><Identicons id={index + date} width={40} size={3} /></div>
              </label>
            </li>
          </ul>
        </Col>
      </Row>
    );
  }
}
