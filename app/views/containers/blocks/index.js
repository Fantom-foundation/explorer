import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import moment from 'moment'; // eslint-disable-line
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
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
import Wrapper from '../../wrapper/wrapper';

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
      isRoute: false,
    };

    this.showDetail = this.showDetail.bind(this);
  }

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
  static getDerivedStateFromProps(props, state) {
    if (props.location.state) {
      if (state.isSearch) {
        return { ...state, isRoute: false };
      }
      const data = [
        {
          ...props.location.state.data,
          transactions: props.location.state.data.transaction,
        },
      ];
      return {
        isRoute: true,
        blockData: data,
      };
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
    const { isSearch, blockArray, currentPage, isRoute } = this.state;
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
    if (!isSearch && !isRoute) {
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
                          pathname: '/blocks',
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
    const { error, searchText, blockData, isSearch, isRoute } = this.state;
    console.log('isSearchblock', isSearch, isRoute);
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
    if (isRoute) {
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
      isRoute,
    } = this.state;

    let blockNumberText = '';
    let hashSymbol = '';
    if (blockData && blockData.length) {
      blockNumberText = blockData[0].height;
      hashSymbol = '#';
    }
    return (
      <div>
        {/* <Header />
        <SearchBar
          searchHandler={(e) => this.searchHandler(e)}
          setSearchText={(e) => this.setSearchText(e)}
          searchText={searchText}
        />
        <section className="bg-theme full-height-conatainer">
          <Container>
            <TranactionBlockHeader
              onChangePage={this.onChangePage}
              icon={TitleIcon}
              title="Blocks"
              block="Block #683387 To #683390"
              total="(Total of 683391 Blocks)"
              isSearching={isSearch}
              onShowList={this.onShowList}
              currentPage={this.state.currentPage}
            /> */}
        <Wrapper
          searchHandler={(e) => this.searchHandler(e)}
          setSearchText={(e) => this.setSearchText(e)}
          searchText={searchText}
          onChangePage={this.onChangePage}
          icon={TitleIcon}
          title="Blocks"
          block="Block #683387 To #683390"
          total="(Total of 683391 Blocks)"
          isSearching={isSearch}
          isRoute={isRoute}
          onShowList={this.onShowList}
          currentPage={this.state.currentPage}
        >
          {this.renderBlockSearchView()}
          {this.renderBlockList()}
        </Wrapper>
        {/* <TxBlockPagination
              onChangePage={this.onChangePage}
              isSearching={isSearch}
              currentPage={this.state.currentPage}
            />
          </Container>
        </section>
        <Footer /> */}
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
