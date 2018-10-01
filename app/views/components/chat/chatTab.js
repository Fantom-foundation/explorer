import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import Comments from './comments';

export default class ChatTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div id="theme-connents-tab">
        <Nav tabs className="theme-connents-nav">
          <NavItem>
            <NavLink
              className={` pl-0 ${classnames({ active: this.state.activeTab === '1' })}`}
              onClick={() => { this.toggle('1'); }}
            >
              14 Comments
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink 
              className={`${classnames({ active: this.state.activeTab === '2' })}`}
              onClick={() => { this.toggle('2'); }}
            >
              The Disqus Blog
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="theme-connents-nav-tab-content" activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                                            <Comments />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col >
                empty
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}