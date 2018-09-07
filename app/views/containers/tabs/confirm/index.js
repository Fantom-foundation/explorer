import React from 'react';
import {
   Container,
   Row,
   Col,
   TabContent, TabPane,
   Form, FormGroup, Input, Button,
 } from 'reactstrap';
import AccountFooter from 'views/components/footer/account-footer';
import FooterButtons from 'views/components/footer/footer-buttons';

export default class Confirm extends React.Component {
   render() {
       return (
           <TabPane tabId="3">
           <Row>
             <Col sm="12" style={{ paddingTop: '52px', paddingBottom: '52px' }}>
               <div className="cs-container forms-container theme-blue-shadow inner mb-4">


                 <Row className="mx-0">
                   <Col style={{ paddingTop: '46px', paddingBottom: '46px' }}>

                     <div className="m-auto" style={{ maxWidth: '488px' }}>
                       <Row>
                         <Col>

                           <h2 className="title large text-center black-text">Enter Your Mnemonic</h2>

                           <p className="text text-center black-text">Entering your Mnemonic phrase on a website is dangerous. If our website is compromised or you accidentally visit a different website, your funds will be stolen. Please consider:</p>
                           <div className="text-center">
                             <ul className="text w-thin text-left d-inline-block pl-4 px-sm-0">
                               <li ><a href="#">MetaMask</a> or <a href="#">A Hardware Wallet</a> or <a href="#">Running MEW Offline & Locally</a></li>
                               <li ><a href="#">Learning How to Protect Yourself and Your Funds</a></li>
                             </ul>
                           </div>

                           <p className="text text-center black-text">If you must, please double-check the URL & SSL cert. It should say <a href="https://fantom.foundation/" target="_blank">https://fantom.foundation/</a> & MYFANTOMWALLET INC in your URL bar.</p>
                         </Col>
                       </Row>

                       <Row>
                         <Col>
                           <Form>
                             <FormGroup>
                               <Input type="textarea" name="text" id="exampleText" placeholder="Enter Mnemonic Phrase" />
                             </FormGroup>
                             <center><Button color="primary">Unlock</Button></center>
                           </Form>


                         </Col>
                       </Row>

                     </div>

                   </Col>
                 </Row>

                 <FooterButtons />
               </div>
               <AccountFooter />
             </Col>
           </Row>
         </TabPane>
       );
   }
}