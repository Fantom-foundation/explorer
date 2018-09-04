import React from 'react';
import {
    Row,
    Col,
  } from 'reactstrap';
import IdenticonsIcon from 'views/containers/homepage/identicons-list';
import { Identicons } from 'views/containers/homepage/identicons';
import refreshIcon from 'images/icons/refresh-icon.svg';

export default class DisplayIdenticons extends React.Component {
  render() {
    let items = [];
    for(let i = 0; i < 6; i++) {
      const item = <IdenticonsIcon index={i} date={this.props.date} />;
      items.push(item);
    }
    return (
      <Row className="m-auto" style={{ maxWidth: '635px' }}>
        <Col>
          <ul className="identicon m-0 p-0">
            {items}
          </ul>
        </Col>
        <Col className="identicon-refresh"> <img aria-hidden src={refreshIcon} alt="Refresh" onClick={this.refreshData} /> </Col>
      </Row>
      
    );
  }
}
