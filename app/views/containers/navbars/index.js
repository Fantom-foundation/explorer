import React from 'react';
import {
   Row,
   Col,
   Nav, NavItem, NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'views/components/core/core';

export default class NavBars extends React.Component {
 render() {
   return (
     <Row>
       <Col className="px-0">
         <Nav tabs className="tab-full tab-theme text-center">
           {/* <NavItem>
                 <NavLink
                   className={classnames({ active: this.state.activeTab === '1' })}
                   onClick={() => { this.toggle('1'); }}
                 >
                   Creation type
                 </NavLink>
               </NavItem> */}
           <NavItem>
             <NavLink
               className={classnames({ active: this.props.activeTab === '1' })}
             >
                               Creat account
                 </NavLink>
           </NavItem>

           <NavItem>
             <NavLink
               className={classnames({ active: this.props.activeTab === '2' })}
             >
                               Account information
                 </NavLink>

           </NavItem>
           <NavItem>
             <NavLink
               className={classnames({ active: this.props.activeTab === '3' })}
             >
                               Confirm
                 </NavLink>
           </NavItem>
         </Nav>
         <Progress type="theme-blue" value={this.props.progressValue} />
       </Col>
     </Row>
   );
 }
}