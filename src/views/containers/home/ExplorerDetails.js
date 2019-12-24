// @flow

import * as React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { api_get_block, api_get_price, api_get_validators } from 'src/utils/Utlity';
import { connectSocketConnection, disconnectSocket } from '../../../utils/socketProvider';

function ExplorerDetails() {
    const [TotalBlocks, setTotalBlocks] = React.useState(0);
    const [ActiveValidators, setActiveValidators] = React.useState(0);
    const [currentPrice, setcurrentPrice] = React.useState(0);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: `${api_get_block}?count=1&order=-1`,
        })
            .then(function (response) {
                // console.log(response.data.data)
                setTotalBlocks(response.data.data.maxBlockHeight);

            });
        axios({
            method: 'get',
            url: `${api_get_price}`,
        })
            .then(function (response) {
                const priceParsed = JSON.parse(response.data.body);
                // console.log(priceParsed);
                if (priceParsed && priceParsed.price) {
                    const price3d = parseFloat(priceParsed.price).toFixed(3);
                    setcurrentPrice(price3d);
                }
            });
        axios({
            method: 'get',
            url: `${api_get_validators}`,
        })
            .then(function (response) {
                //console.log(response.data.data.stakers.length) 
                setActiveValidators(response.data.data.stakers.length);

            });
    });
    React.useEffect(() => {
        connectSocketConnection().then((socketClient) => {
            socketClient.on('message', (data) => {
                const eventData = JSON.parse(data);
                if (eventData.event === 'newBlock') {
                   // console.log(eventData.block.number);
                    setTotalBlocks(eventData.block.number);
                }
            });
        });
        return () => {
            console.log("Will unmount");
            disconnectSocket()
        };
    }, []);
    return (
        <div>
            <Container>
                <Row className="text-center">
                    <Col md={12} lg={12} className="home-wrapper-details">
                        <ul className="block-details">
                            <li>
                                <label>Block Height</label>
                                <span>{TotalBlocks}</span>
                            </li>
                            <li>
                                <label>Active Validators</label>
                                <span>{ActiveValidators}</span>
                            </li>
                            <li>
                                <label>FTM Price</label>
                                <span>${currentPrice}</span>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ExplorerDetails;