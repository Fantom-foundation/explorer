import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Footer extends React.Component {
  
  render() {
    return (
<footer>
<Container>
  <hr />
    <Row>
        <Col>
        <span className="text-white" style={{opacity:.7}}>Copyright © 2018 FANTOM. All Rights Reserved.</span>
        </Col>
        <Col className="text-right">
        <span>Ca #</span>
        </Col>
        </Row>
        </Container>
  </footer>
   
    );
  }
}