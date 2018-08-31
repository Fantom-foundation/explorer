import React from 'react';
import { Container, Card, CardBody, CardDeck, CardHeader, Badge } from 'reactstrap';
import QRCode from 'qrcode.react';
import HeaderNav from '../../components/Header';
import JumboSection from '../../components/jumbotron';
import ReactTable from '../../components/Table';


export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

 constructor(props) {
   super(props);
   this.onAboutPressed = this.onAboutPressed.bind(this);
 }

 onAboutPressed(e) {
   e.preventDefault();
   console.log('test');
 }

 render() {
   return (
     <div>
       <HeaderNav />
       <div>
        <h1>Heading <Badge color="secondary">New</Badge></h1>
        <h2>Heading <Badge color="secondary">New</Badge></h2>
        <h3>Heading <Badge color="secondary">New</Badge></h3>
        <h4>Heading <Badge color="secondary">New</Badge></h4>
        <h5>Heading <Badge color="secondary">New</Badge></h5>
        <h6>Heading <Badge color="secondary">New</Badge></h6>
      </div>
       <JumboSection />
       <Container>
         <CardDeck>
           <Card>
             <CardHeader>Heading</CardHeader>
             <CardBody>
               <QRCode value="Komal" />
             </CardBody>
           </Card>
           <Card>
             <CardHeader>Display headings</CardHeader>
             <CardBody>
               <h1 className="display-1">Display 1</h1>
               <h1 className="display-2">Display 2</h1>
               <h1 className="display-3">Display 3</h1>
               <h1 className="display-4">Display 4</h1>
             </CardBody>
           </Card>
         </CardDeck>
         <div className="clearfix">
           <br />
         </div>
         <Card>
           <CardHeader>Table</CardHeader>
           <CardBody>
             <ReactTable />
           </CardBody>
         </Card>
       </Container>
     </div>
   );
 }
}