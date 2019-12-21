// @flow

import * as React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import {api_get_block, api_get_price} from 'src/utils/Utlity';

function ExplorerDetails() {
    const [TotalBlocks, setTotalBlocks] = React.useState(0);
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
                    if (priceParsed && priceParsed.price) {
                      const price3d = parseFloat(priceParsed.price).toFixed(3);
                      setcurrentPrice(price3d);
                    }
                });
    }, [TotalBlocks]);
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
                                <label>Block Time</label>
                                <span>0.97s</span>
                            </li>
                            <li>
                                <label>Active Validators</label>
                                <span>99</span>
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