import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import moment from 'moment'; // eslint-disable-line
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import HttpDataProvider from '../../../../app/utils/httpProvider';
import { Title } from '../../components/coreComponent';
import Web3 from 'web3';
import _ from 'lodash'; // eslint-disable-line
import { createSelector } from 'reselect';
import TxBlockPagination from '../pagination/txBlockPagination';
import SearchForBlock from '../../components/search/searchForBlock/index';
import TranactionBlockHeader from '../../components/header/tranactionBlockHeader';
import TitleIcon from '../../../images/icons/latest-blocks.svg';
import PropTypes from 'prop-types';
import { setBlockData } from '../../controllers/blocks/action';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';
import SearchBar from '../../components/search/searchBar/index';
import { connect } from 'react-redux';
import Wrapper from '../../wrapper/wrapper';

class BlockDetail extends Component {
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
      currentPageVal: 0,
    };

    this.maxPageVal = 0;

    this.showDetail = this.showDetail.bind(this);

    this.getFantomBlocks(props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getFantomBlocks(this.props.match.params.id);
    }
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
    if (props.match.params.id) {
      if (props.location.state) {
        const data = [
          {
            ...props.location.state.data,
            transactions: props.location.state.data.transaction,
          },
        ];
        return {
          blockData: data,
        };
      }
    }

    return {
      ...state,
      isSearch: false,
    };
  }

  onChangePage = (type) => {
    const { currentPageVal } = this.state;
    const { allBlockData } = this.props.blockDetails;
    const { setBlocksData } = this.props;
    const updatePageVal =
      type === 'next' ? currentPageVal + 1 : currentPageVal - 1;
    if (updatePageVal < 0) {
      return;
    }

    const currentBlockDataLength = allBlockData.length;
    if (
      type === 'next' &&
      (currentPageVal + 1) * 10 >= currentBlockDataLength
    ) {
      return;
    }
    const prevPageVal = currentPageVal;

    this.setState({
      currentPageVal: updatePageVal,
    });
    const cursor = allBlockData[allBlockData.length - 1].cursor;
    if (type === 'next' && this.maxPageVal < updatePageVal) {
      if (true) {
        HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
          query: `
          {
            blocks(first: 10, byDirection: "desc", after: "${cursor}") {
              pageInfo {
                hasNextPage
              }
              edges {
                cursor,
                node {
                  id,
                  payload
                }
              }
            }
          }`,
        })
          .then(
            (res) => {
              if (res && res.data) {
                this.maxPageVal = updatePageVal;
                const allData = res.data;
                if (
                  allData.data &&
                  allData.data.blocks &&
                  allData.data.blocks.edges &&
                  allData.data.blocks.edges.length
                ) {
                  const blockDetails = {
                    payload: allData.data.blocks.edges,
                  };
                  setBlocksData(blockDetails);
                  this.setState((prevState) => ({
                    lastFetchedPage: allData.data.blocks.pageInfo.hasNextPage
                      ? prevState.lastFetchedPage + 1
                      : prevState.lastFetchedPage,
                    hasNextPage: allData.data.blocks.pageInfo.hasNextPage,
                  }));
                } else {
                  console.log('else part');
                }
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
   * loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
   * @param {*} responseJson : Json of block response data from Api.
   */
  loadFantomBlockData(allData) {
    const result = allData.payload;
    const blockData = [];
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

    this.setState({
      blockData,
    });
  }

  /**
   * getFantomBlocks():  Api to fetch blocks for given index of block of Fantom own endpoint.
   * @param {String} searchBlockIndex : Index to fetch block.
   */
  getFantomBlocks(searchText) {
    const searchQuery = `index:${searchText}`;

    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
          {
           block(${searchQuery}) {
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

  isValidHash(hash) {
    const validHashLength = 66;
    const indexVal = Number(hash);
    if (hash && hash.length === validHashLength) {
      return { isValid: true, type: 'hash' };
    } else if (indexVal >= 0 && Number.isInteger(indexVal)) {
      return { isValid: true, type: 'number' };
    }
    return { isValid: false };
  }

  searchHandler(e) {
    e.preventDefault();
    const { searchText } = this.state;
    if (searchText && searchText !== '') {
      const { isValid, type } = this.isValidHash(searchText);
      if (isValid) {
        this.setState({ isSearchActive: true });
        if (type === 'number') {
          this.getFantomBlocks(searchText);
        } else if (type === 'hash') {
          this.getFantomTransactionsFromApiAsync(searchText);
        }

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

  renderBlockSearchView() {
    const { error, searchText, blockData, isSearch } = this.state;
    if (error) {
      return <p className="text-white">{error}</p>;
    }

    if (blockData.length <= 0) {
      return (
        <div className="loader">
          <div className="holder">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        {blockData.length > 0 && (
          <SearchForBlock blocks={blockData} showDetail={this.showDetail} />
        )}
        {error !== '' &&
          searchText !== '' && <p className="text-white">{error}</p>}
      </React.Fragment>
    );

    return null;
  }

  onShowList = () => {
    this.props.history.push('/blocks');
    this.setState({
      searchText: '',
      isSearch: false,
      error: '',
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
      currentPageVal,
    } = this.state;

    let blockNumberText = '';
    let hashSymbol = '';
    if (blockData && blockData.length) {
      blockNumberText = blockData[0].height;
      hashSymbol = '#';
    }
    let descriptionBlock = '';
    const from = currentPageVal * 10;
    const to = from + 10;
    let totalBlocks = '';
    if (this.props.blockDetails && this.props.blockDetails.allBlockData) {
      const transformedBlockArray = this.props.blockDetails.allBlockData.slice(
        from,
        to
      );

      descriptionBlock = 'Block Number: ';
      totalBlocks = `${this.props.match.params.id}`;

      //
    }
    return (
      <div>
        <Wrapper
          searchHandler={(e) => this.searchHandler(e)}
          setSearchText={(e) => this.setSearchText(e)}
          searchText={searchText}
          onChangePage={this.onChangePage}
          icon={TitleIcon}
          title="Blocks"
          block={descriptionBlock}
          total={totalBlocks}
          isRoute
          onShowList={this.onShowList}
          history={this.props.history}
          currentPage={this.state.currentPageVal}
          placeHolder="Search by Transaction Hash / Block Number"
        >
          {this.renderBlockSearchView()}
        </Wrapper>
      </div>
    );
  }
}

BlockDetail.propTypes = {
  setBlockData: PropTypes.func,
};

const mapStateToProps = createSelector(
  getBlockUpdateDetails(),
  (blockDetails) => ({ blockDetails })
);

const mapDispatchToProps = (dispatch) => ({
  setBlocksData: (blockData) => dispatch(setBlockData(blockData)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlockDetail);
