import React from 'react';
import {
   Row,
   Col,
   TabPane,
   Button,
 } from 'reactstrap';
import ReactToPrint from 'react-to-print';
import AccountFooter from 'views/components/footer/account-footer';
import AccountInfo from 'views/containers/tabs/account-data/account-info';
import FooterButtons from 'views/components/footer/footer-buttons';

export default class AccountInformation extends React.Component {
 render() {
   return (
     <TabPane tabId="2">
       <Row>
         <Col sm="12" style={{ paddingTop: '76px', paddingBottom: '31px' }}>
           <div className="cs-container forms-container theme-blue-shadow inner mb-4">
             <Row className="mx-0">
               <Col style={{ paddingTop: '46px', paddingBottom: '46px', paddingLeft: '66px', paddingRight: '69px' }}>

                 <AccountInfo mnemonic={this.props.mnemonic} {...this.props} address={this.props.address} ref={(el) => (this.componentRef = el)} />
                 <Row className="my-3 ">
                   <Col className="text-center">
                     <ReactToPrint
                       trigger={() => <Button color="primary">Print Phrase</Button>}
                       content={() => this.componentRef}
                     />
                     {/* <Button color="primary">Print Phrase</Button> */}
                   </Col>
                 </Row>
                 <Row>
                   <Col>
                     <p className="text mb-3 black-text">Please back up the recovery phase now. Make sure to keep it private and secure, it allows full and unlimited access to your account.</p>

                     <p className="text small mb-0 black-text">Type ‘’ I have written down the phrase’’  below to confirm it is backed up.</p>
                   </Col>
                 </Row>
               </Col>
             </Row>
             <FooterButtons {...this.props} isEnabled={this.props.mnemonic}/>
           </div>
           <AccountFooter />
         </Col>
       </Row>
     </TabPane>
   );
 }
}