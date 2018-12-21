import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import moment from 'moment';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import HttpDataProvider from '../../../../app/utils/httpProvider';
import TxBlockPagination from '../pagination/txBlockPagination';
import TranactionBlockHeader from '../../components/header/tranactionBlockHeader';
import TitleIcon from '../../../images/icons/latest-transaction.svg';
import SearchForTransaction from '../../components/search/searchForTransaction/index';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';
import Wrapper from '../../wrapper/wrapper';
import { setBlockData } from '../../controllers/blocks/action';
import Web3 from 'web3';

class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      transactionData: [],
      error: '',
      isSearch: false,
      cursor: '',
      lastFetchedPage: 2,
      currentPage: 0,
      hasNextPage: true,
      hasPrevPage: false,
      isRoute: false,
      currentPageVal: 0,
    };
    this.getFantomTransactionsFromApiAsync(props.match.params.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id) {
      // if (state.isSearch) {
      //   return { ...state, isRoute: false };
      // }
      if (props.location.state) {
        const data = [
          {
            ...props.location.state.data,
          },
        ];
        return {
          isRoute: true,
          transactionData: data,
        };
      }
    }
    return {
      ...state,
      isRoute: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getFantomTransactionsFromApiAsync(this.props.match.params.id);
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
        transactionData: [],
      });
    }
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
   * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
   * @param {String} address : address to fetch transactions.
   */
  getFantomTransactionsFromApiAsync(searchTransactionHash, type) {
    const transactionHash = `"${searchTransactionHash}"`;
    // this.setState({
    //   transactionData: [],
    // });
    HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
      query: `
      query{
        transaction(hash: ${transactionHash}) {
          id,
          hash,
          root
          from,
          to,
          value,
          gas,
          used,
          price,
          cumulative,
          contract,
          logs,
          status,
          block,
          error
        }  
        }`,
    })

      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.transaction) {
          this.loadFantomTransactionData(res.data.data.transaction);
        } else {
          this.setState({
            transactionData: [],
            error: 'No Record Found',
          });
        }
      })
      .catch((error) => {
        this.setState({
          transactionData: [],
          error: error.message || 'Internal Server Error',
        });
      });
  }

  /**
   * loadFantomTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
   * @param {*} responseJson : Json of transaction response data from Api.
   */
  loadFantomTransactionData(result) {
    const transactionData = [];

    const newVal = Web3.utils.fromWei(`${result.value}`, 'ether');
    transactionData.push({
      transaction_hash: result.hash,
      Block_id: '',
      address_from: result.from,
      address_to: result.to,
      value: newVal,
      txFee: '',
      createdAt: '',
      gasUsed: result.gas,
      status: result.status,
      contractAddress: result.contract,
      cumulativeGasUsed: result.cumulative,
      root: result.root,
      logsBloom: result.logs,
    });
    this.setState({
      transactionData,
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
    // this.setState({
    //   isSearch: true,
    // });
    const { searchText } = this.state;
    if (searchText && searchText !== '') {
      const { isValid, type } = this.isValidHash(searchText);
      if (isValid) {
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
          transactionData: [],
          error: 'Please enter valid hash.',
          isSearch: true,
        });
      }
    } else {
      this.setState({
        transactionData: [],
        error: '',
        isSearch: false,
      });
    }
  }

  renderTransactionSearchView() {
    const {
      transactionData,
      error,
      searchText,
      isRoute,
      isSearch,
    } = this.state;
    if (error) {
      return <p className="text-white">{error}</p>;
    }
    if (transactionData.length <= 0) {
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
        {transactionData.length > 0 && (
          <SearchForTransaction transactions={transactionData} />
        )}
        {error !== '' &&
          searchText !== '' && <p className="text-white">{error}</p>}
      </React.Fragment>
    );
  }
  onShowList = () => {
    this.props.history.push('/transactions');
    this.setState({
      searchText: '',
      isSearch: false,
      error: '',
      isRoute: false,
    });
  };
  render() {
    const {
      searchText,
      transactionData,
      hasNextPage,
      currentPageVal,
    } = this.state;
    const { isSearch, isRoute } = this.state;
    let txnHashText = '';
    if (transactionData && transactionData.length) {
      txnHashText = transactionData[0].transaction_hash;
    }
    let descriptionBlock = '';
    const from = currentPageVal * 10;
    const to = from + 10;
    let totalBlocks = '';
    const {
      blockDetails: { allBlockData },
    } = this.props;
    if (allBlockData && allBlockData.length) {
      const firstBlock = allBlockData[0];
      totalBlocks = ` (Total of ${firstBlock.height} Blocks)`;
    }

    if (this.props.blockDetails && this.props.blockDetails.allBlockData) {
      const transformedBlockArray = this.props.blockDetails.allBlockData.slice(
        from,
        to
      );
      descriptionBlock = 'Txn Hash: ';
      totalBlocks = `${this.props.match.params.id}`;
      return (
        <div>
          <Wrapper
            onChangePage={this.onChangePage}
            onShowList={this.onShowList}
            icon={TitleIcon}
            title="Transactions"
            block={descriptionBlock}
            total={totalBlocks}
            isSearching
            isRoute
            currentPage={this.state.currentPageVal}
            searchHandler={(e) => this.searchHandler(e)}
            setSearchText={(e) => this.setSearchText(e)}
            searchText={searchText}
            history={this.props.history}
            placeHolder="Search by Transaction Hash / Block Number"
          >
            {this.renderTransactionSearchView()}
          </Wrapper>
        </div>
      );
    }
    return null;
  }
}
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
)(TransactionDetail);
