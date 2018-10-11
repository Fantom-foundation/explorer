import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  // Table,
} from 'reactstrap';
import moment from 'moment'; // eslint-disable-line
import Header from 'views/components/header/header';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';  // eslint-disable-line


import SearchForBlock from '../../components/search/searchForBlock/index';

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockArray: [],
      searchText: '',
      blockData: [],
      error: '',
    };

    this.showDetail = this.showDetail.bind(this);
  }
  /**
   * @api_key: send private key for security purpose
   * here call a api get-blocks and get data from blocks table.
   */
  componentWillMount() {
    fetch(
      'http://localhost:3000/api/get-blocks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: 'qscvfgrtmncefiur2345',
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ blockArray: res.result });
      }).catch((error) => {
        console.log('error is !!!', error);
      });
  }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
  }


  /**
     * getFantomBlocks():  Api to fetch blocks for given index of block of Fantom own endpoint.
     * @param {String} searchBlockIndex : Index to fetch block.
     */
  getFantomBlocks(searchBlockIndex) {
    const url = 'http://18.224.109.107:8080';
    fetch(`${url}/blockById/${searchBlockIndex}`)
      .then((response) => {
        if (response && response.status < 400) {
          return response.json();
        }
        throw new Error((response.statusText || 'Internal Server Error'));
      })
      .then((responseJson) => {
        if (responseJson) {
          console.log('responseJson : ', responseJson);
          this.loadFantomBlockData(responseJson);
        } else {
          this.setState({
            blockData: [],
            error: 'No Record Found',
          });
        }
        return responseJson;
      })
      .catch((error) => {
        this.setState({
          blockData: [],
          error: error.message || 'Internal Server Error',
        });
      });
  }

  /**
    * loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
    * @param {*} responseJson : Json of block response data from Api.
    */
  loadFantomBlockData(result) {
    let blockData = [];
    const txLength = result.transactions !== null ? result.transactions.length : 0;
    blockData.push({
      height: result.index,
      hash: result.hash,
      parentHash: result.frameHash,
      transactions: txLength,
    });
    blockData = blockData.reverse();
    this.setState({
      blockData,
    });
  }

  isValidHash(index) {
    const indexVal = Number(index);
    if (indexVal >= 0 && Number.isInteger(indexVal)) {
      return true;
    }
    return false;
  }

  searchHandler(e) {
    e.preventDefault();
    const { searchText } = this.state;

    if (searchText && searchText !== '') {
      const isValid = this.isValidHash(searchText);
      if (isValid) {
        this.getFantomBlocks(searchText);
        this.setState({
          error: '',
        });
      } else {
        this.setState({
          blockData: [],
          error: 'Please enter valid hash.',
        });
      }
    }
  }

  showDetail(blockNumber) {
    if (blockNumber === '') {
      return;
    }

    this.props.history.push(`/block/${blockNumber}`); // eslint-disable-line
  }

  render() {
    const blocks = this.state.blockArray; // eslint-disable-line
    const { searchText, blockData, error } = this.state;

    let blockNumberText = '';
    let hashSymbol = '';
    if (blockData && blockData.length) {
      blockNumberText = blockData[0].height;
      hashSymbol = '#';
    }
    return (
      <div>
        <Header />
        <section className="bg-theme full-height-conatainer">
          <Container>


            {/*= ========= make this title-header component start=================*/}

            <Row className="title-header pt-3">
              <Col className="pt-3">
                  <Title h2 className="d-inline  mr-4 mb-0" >Blocks</Title>
                  <Title h2 className="token d-inline mb-0"><span className="">{hashSymbol}{blockNumberText}</span></Title>
                </Col>
              <Col xs={12} lg={3}>
                <div className="form-element form-input">
                  <form autoComplete="off" onSubmit={(e) => this.searchHandler(e)}>
                    <input
                      id="search"
                      value={searchText}
                      className="form-element-field"
                      placeholder=" "
                      type="search"
                      required=""
                      onChange={(e) => this.setSearchText(e)}
                    />
                    <div className="form-element-bar"></div>
                    {/* <label className="form-element-label" htmlFor="search">Search by Address / Txhash / Block Heights</label> */}
                    <label className="form-element-label" htmlFor="search">Search Block Number</label>
                  </form>
                </div>
              </Col>
            </Row>


            {/*= ========= make this title-header component end=================*/}
            {blockData.length > 0 && <SearchForBlock blocks={blockData} showDetail={this.showDetail} />}
            {error !== '' && <p>{error}</p>}
            {/* <Row>
              <Col>
                <Table className="transactions-table">
                  <thead className="dark">
                    <tr>
                      <th>Height</th>
                      <th>Age</th>
                      <th>Txn</th>
                      <th>hash</th>
                    </tr>
                  </thead>
                  <tbody className="scroll-theme-1">
                    {blocks && blocks.length && blocks.length > 0 && blocks.map((data, index) => (
                      <tr key={index}>
                        <td className="text-black">{data.block_number}</td>
                        <td className="text-black">{moment(parseInt(data.timestamp, 10)).fromNow()}</td>
                        <td className="text-black">{data.size}</td>
                        <td className="text-black">{data.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row> */}
          </Container>
        </section>
      </div >
    );
  }
}
