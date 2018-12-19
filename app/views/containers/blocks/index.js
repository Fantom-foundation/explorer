import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import moment from 'moment'; // eslint-disable-line
import Header from 'views/components/header/header';
import HttpDataProvider from '../../../../app/utils/httpProvider';
import { Title } from '../../components/coreComponent';
import _ from 'lodash'; // eslint-disable-line
import { createSelector } from 'reselect';
import TxBlockPagination from '../pagination/txBlockPagination';
import SearchForBlock from '../../components/search/searchForBlock/index';
import TranactionBlockHeader from '../../components/header/tranactionBlockHeader';
import TitleIcon from '../../../images/icons/latest-blocks.svg';

import SearchBar from '../../components/search/searchBar/index';
import { connect } from 'react-redux';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockArray: [],
      searchText: '',
      blockData: [],
      allBlockData: [],
      error: '',
      cursor: '',
      lastFetchedPage: 2,
      currentPage: 0,
      isSearch: false,
      hasNextPage: true,
      hasPrevPage: false,
    };

    this.showDetail = this.showDetail.bind(this);
  }
  /**
   * @api_key: send private key for security purpose
   * here call a api get-blocks and get data from blocks table.
   */
  // componentWillMount() {
  //   fetch('http://localhost:3000/api/get-blocks', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       api_key: 'qscvfgrtmncefiur2345',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       this.setState({ blockArray: res.result });
  //     })
  //     .catch((error) => {
  //       console.log('error is !!!', error);
  //     });
  // }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });

    if (e.target.value === '') {
      this.setState({
        error: '',
        isSearch: false,
        blockData: [],
      });
    }
  }

  // fetchNext(page) {
  //   const { lastFetchedPage } = this.state;
  //   let { cursor } = this.state;
  //   if (page < lastFetchedPage) {
  //     return;
  //   }
  //   HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
  //     query: `
  //         {
  //           blocks(after:${cursor}) {
  //             pageInfo {
  //               hasNextPage
  //             }
  //             edges {
  //               cursor
  //               node {
  //                 payload
  //               }
  //             }
  //           }
  //         }`,
  //   })
  //     .then(
  //       (res) => {
  //         if (res && res.data) {
  //           // this.formatTransactionList(res.data);
  //           const allBlockData = [];
  //           const edges = res.data.data.blocks.edges;

  //           edges.forEach((val) => {
  //             const {
  //               hash,
  //               index,

  //               stateHash,
  //               transactions,
  //             } = val.node.payload;
  //             cursor = val.cursor;
  //             allBlockData.push({
  //               hash,
  //               height: index,
  //               parentHash: stateHash,
  //               transactions: transactions.length,
  //             });
  //           });
  //           this.setState({
  //             allBlockData,
  //             cursor,
  //           });
  //           console.log('allBlockData', allBlockData);
  //         }
  //         return null;
  //       },
  //       () => {
  //         console.log('1');
  //       }
  //     )
  //     .catch((err) => {
  //       console.log(err, 'err in graphql');
  //     });
  // }

  // componentDidMount() {
  //   HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
  //     query: `
  //         {
  //           blocks(first:30, byDirection: "desc") {
  //             pageInfo {
  //               hasNextPage
  //               hasPreviousPage
  //             }
  //             edges {
  //               cursor
  //               node {
  //                 payload
  //               }
  //             }
  //           }
  //         }`,
  //   })
  //     .then(
  //       (res) => {
  //         if (res && res.data) {
  //           // this.formatTransactionList(res.data);
  //           const allBlockData = [];
  //           const edges = res.data.data.blocks.edges;
  //           const hasNextPage = res.data.data.blocks.pageInfo.hasNextPage;
  //           const hasPrevPage = res.data.data.blocks.pageInfo.hasPreviousPage;
  //           let cursor;
  //           edges.forEach((val) => {
  //             const {
  //               hash,
  //               index,
  //               stateHash,
  //               transactions,
  //               round,
  //             } = val.node.payload;
  //             cursor = val.cursor;
  //             allBlockData.push({
  //               hash,
  //               height: index,
  //               parentHash: stateHash,
  //               transactions: transactions.length,
  //               round,
  //             });
  //           });
  //           this.setState({
  //             blockArray: allBlockData,
  //             cursor,
  //             hasNextPage,
  //             hasPrevPage,
  //             lastFetchedPage: 2,
  //           });
  //         }
  //         return null;
  //       },
  //       () => {
  //         console.log('1');
  //       }
  //     )
  //     .catch((err) => {
  //       console.log(err, 'err in graphql');
  //     });
  // }

  onChangePage = (type) => {
    const { cursor, lastFetchedPage, currentPage, hasNextPage } = this.state;
    console.log('this.props.blockDetails66', this.props.blockDetails);
    let showPage = type === 'next' ? currentPage + 1 : currentPage - 1;
    if (showPage < 0) {
      showPage = 0;
    }
    if (showPage > lastFetchedPage) {
      return;
    }
    this.setState({
      currentPage: showPage,
    });

    const fetch = lastFetchedPage - showPage === 1;
    if (type === 'next' && fetch) {
      if (hasNextPage) {
        HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
          query: `
            {
              blocks(first:30,after:"${this.props.blockDetails.cursor}") {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  cursor
                  node {
                    payload
                  }
                }
              }
            }`,
        })
          .then(
            (res) => {
              if (res && res.data) {
                // this.formatTransactionList(res.data);
                const allBlockData = [];
                const edges = res.data.data.blocks.edges;
                const changedNextPage =
                  res.data.data.blocks.pageInfo.hasNextPage;
                const changedPrevPage =
                  res.data.data.blocks.pageInfo.hasPreviousPage;
                let changedCursor;
                edges.forEach((val) => {
                  const {
                    hash,
                    index,
                    stateHash,
                    transactions,
                  } = val.node.payload;
                  changedCursor = val.cursor;
                  allBlockData.push({
                    hash,
                    height: index,
                    parentHash: stateHash,
                    transactions: transactions.length,
                  });
                });
                this.setState((prevState) => ({
                  blockArray: [...prevState.blockArray, ...allBlockData],
                  cursor: changedCursor,
                  lastFetchedPage: prevState.lastFetchedPage + 3,
                  hasNextPage: changedNextPage,
                  hasPrevPage: changedPrevPage,
                }));
              }
              return null;
            },
            () => {
              console.log('1');
            }
          )
          .catch((err) => {
            console.log(err, 'err in graphql');
          });
      }
    }
  };
  /**
   * getFantomBlocks():  Api to fetch blocks for given index of block of Fantom own endpoint.
   * @param {String} searchBlockIndex : Index to fetch block.
   */
  getFantomBlocks(searchBlockIndex) {
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
          {
           block(index:${searchBlockIndex}) {
            id,payload
          }
          }`,
    })

      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.data &&
          response.data.data.block
        ) {
          this.loadFantomBlockData(response.data.data.block);
        } else {
          this.setState({
            blockData: [],
            error: 'No Record Found',
          });
        }
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
  loadFantomBlockData(allData) {
    const result = allData.payload;
    let blockData = [];
    const txLength =
      allData.payload.transactions !== null
        ? allData.payload.transactions.length
        : 0;
    blockData.push({
      height: result.index,
      hash: result.hash,
      round: result.round,
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
    this.setState({
      isSearch: true,
    });
    if (searchText && searchText !== '') {
      const isValid = this.isValidHash(searchText);
      if (isValid) {
        this.getFantomBlocks(searchText);
        this.setState({
          error: '',
          isSearch: true,
        });
      } else {
        this.setState({
          blockData: [],
          error: 'Please enter valid hash.',
          isSearch: true,
        });
      }
    } else {
      this.setState({
        blockData: [],
        error: '',
        isSearch: false,
      });
    }
  }

  showDetail(blockNumber) {
    if (blockNumber === '') {
      return;
    }
    this.props.history.push(`/block/${blockNumber}`); // eslint-disable-line
  }

  renderBlockList() {
    const { isSearch, blockArray, currentPage } = this.state;
    const { blockData } = this.props.blockDetails;
    console.log(
      ' this.props.blockDetails',
      this.props.blockDetails.allBlockData
    );
    const from = currentPage * 10;
    const to = from + 10;
    const transformedBlockArray = this.props.blockDetails.allBlockData.slice(
      from,
      to
    );
    if (!isSearch) {
      return (
        <Row>
          <Col>
            <Table className="blocks-table">
              <thead>
                <tr>
                  <th>Height</th>
                  {/* <th>Age</th> */}
                  <th>Txn</th>
                  <th>hash</th>
                  <th>Round</th>
                </tr>
              </thead>
              <tbody className="">
                {transformedBlockArray &&
                  transformedBlockArray.length > 0 &&
                  transformedBlockArray.map((data, index) => (
                    <tr
                      key={index}
                      onClick={() =>
                        this.props.history.push({
                          pathname: `/detail/${data.hash}`,
                          state: { data, type: 'block' },
                        })
                      }
                    >
                      <td data-head="Height" className="text-primary full head">
                        <span className="icon icon-block">{data.height}</span>
                      </td>
                      {/* <td className="">
                        {moment(parseInt(data.timestamp, 10)).fromNow()}
                      </td> */}
                      <td
                        data-head="Txn"
                        className="text-primary full-wrap txn"
                      >
                        {data.transactions.length}
                      </td>
                      <td
                        data-head="hash"
                        className="text-primary full-wrap hash text-ellipsis"
                      >
                        {data.hash}
                      </td>
                      <td data-head="Round" className=" full-wrap round">
                        <span className="o-5">{data.round}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      );
    }
    return null;
  }

  renderBlockSearchView() {
    const { error, searchText, blockData, isSearch } = this.state;
    if (isSearch) {
      return (
        <React.Fragment>
          {blockData.length > 0 && (
            <SearchForBlock blocks={blockData} showDetail={this.showDetail} />
          )}
          {error !== '' &&
            searchText !== '' && <p className="text-white">{error}</p>}
        </React.Fragment>
      );
    }
    return null;
  }

  onShowList = () => {
    this.setState({
      searchText: '',
      isSearch: false,
    });
  };

  render() {
    const blocks = this.state.blockArray; // eslint-disable-line
    const {
      searchText,
      blockData,
      error,
      allBlockData,
      hasNextPage,
      hasPrevPage,
      isSearch,
    } = this.state;

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
              {isSearch &&
                isSearch !== '' && (
                  <Col className="pt-3">
                    <Title h2 className="d-inline  mr-4 mb-0 text-white">
                      Block
                    </Title>

                    <Title h2 className="token d-inline mb-0">
                      <span className="">
                        {hashSymbol}
                        {blockNumberText}
                      </span>
                    </Title>
                  </Col>
                )}
              <Col xs={12} lg={3}>
                <div className="form-element form-input">
                  <form
                    autoComplete="off"
                    onSubmit={(e) => this.searchHandler(e)}
                  >
                    <input
                      id="search"
                      value={searchText}
                      className="form-element-field"
                      placeholder=" "
                      type="search"
                      required=""
                      onChange={(e) => this.setSearchText(e)}
                    />
                    <div className="form-element-bar" />

                    <label className="form-element-label" htmlFor="search">
                      Search Block Number
                    </label>
                  </form>
                </div>
              </Col>
            </Row>{' '}
            */}
            <SearchBar
              searchHandler={(e) => this.searchHandler(e)}
              setSearchText={(e) => this.setSearchText(e)}
              searchText={searchText}
            />
            {/*= ========= make this title-header component end=================*/}
            {/* <Row>
  <Col md={6} className="table-title">
   <Row>
   <Col xs={6} md={12}><h2>Blocks</h2></Col>
     <Col xs={6} md={12}><div className="info"><p>Block #683387 To #683390 </p><p>(Total of 683391 Blocks)</p></div></Col>
     </Row>
  </Col>
  {windowWidth >= 768 && <Col md={6}><TxBlockPagination onChangePage={this.onChangePage}/></Col>}
</Row> */}
            <TranactionBlockHeader
              onChangePage={this.onChangePage}
              icon={TitleIcon}
              title="Blocks"
              block="Block #683387 To #683390"
              total="(Total of 683391 Blocks)"
              isSearching={isSearch}
              onShowList={this.onShowList}
              currentPage={this.state.currentPage}
            />
            {this.renderBlockSearchView()}
            {this.renderBlockList()}
            {/* <div>
            <Button
              // disabled={!hasPrevPage}
              onClick={() => this.onChangePage('prev')}
            >
              Previous
            </Button>
            <Button
              // disabled={!hasNextPage}
              onClick={() => this.onChangePage('next')}
            >
              Next
            </Button>
          </div> */}
            <TxBlockPagination
              onChangePage={this.onChangePage}
              isSearching={isSearch}
              currentPage={this.state.currentPage}
            />
          </Container>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getBlockUpdateDetails(),
  (blockDetails) => ({ blockDetails })
);

export default connect(
  mapStateToProps,
  null
)(Blocks);
