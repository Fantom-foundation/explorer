// @flow
import * as React from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import TimeAgo from 'react-timeago'
function TableData() {
    const [Blocks, setBlocks] = React.useState([]);
    const [TotalBlocks, setTotalBlocks] = React.useState(0);
    React.useEffect(() => {
        axios({
            method: 'get',
            url: 'http://18.222.120.223:3100/api/v1/get-blocks?count=10&order=-1',
        })
            .then(function (response) {
                console.log(response.data.data);
                setBlocks(response.data.data.blocks);
                setTotalBlocks(response.data.data.total);
            });
    }, [setBlocks, setTotalBlocks]);

    return (
        <div>
            <Container>
                <div className="transaction-wrapper">
                    <div className="d-flex">
                        <div className="title-section">
                            <h2>Blocks</h2>
                            <span>Block #53440842 to #53440856 (Total of {TotalBlocks} blocks)</span>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <table className="data-tables">
                                <thead>
                                    <tr>

                                        <th>Block</th>
                                        <th>Time</th>
                                        <th>Age</th>
                                        <th>Txns</th>
                                        <th>Fees</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {Blocks.map(Blocks => {
                                        const {
                                            number,
                                            timestamp,
                                            transactions,
                                            hash
                                        } = Blocks;

                                        let d = new Date(timestamp * 1000);
                                        let precision = 18;
                                        let dateString = new Date(d).toUTCString();
                                        dateString = dateString.split(' ').slice(0, 4).join(' ');
                                        let dates = ' ' + d
                                        //console.log(url);
                                        let url = "/blocks/:" + number
                                        return (
                                            <tr>
                                                <td><a  href={url}>{number}</a></td>
                                                <td>{dateString}</td>
                                                <td><TimeAgo date={d} /></td>
                                                <td><a  href={url}>{transactions}</a></td>
                                                <td>0.0000001 FTM</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default TableData;
