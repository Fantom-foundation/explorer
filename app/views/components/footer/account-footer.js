import React from 'react';
import { Row, Col } from 'reactstrap';

export default class accountFooter extends React.Component{
    render()
    {
        return (
            <Row className="account-footer">
                <Col>
                    <p className="text-center">This password encrypts your private key. This does not act as a speed to generate your keys. You will need this password + Mnemonic to unlock your wallet</p>
                    <ul className="text-center">
                        <li><span>How to Create a Wallet</span></li>
                        <li className="pl-3"><span>Getting Started</span></li>
                    </ul>
                </Col>
            </Row>
        );
    }
}
