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

class Transactions extends Component {
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
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id) {
      if (state.isSearch) {
        return { ...state, isRoute: false };
      }
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
    return {
      ...state,
      isRoute: false,
    };
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
  getFantomTransactionsFromApiAsync(searchTransactionHash) {
    const transactionHash = `"${searchTransactionHash}"`;
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
    let transactionData = [];
    let txnStatus = 'Failed';
    if (result.status === 0) {
      txnStatus = 'Success';
    }
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
      txnStatus,
      contractAddress: result.contract,
      cumulativeGasUsed: result.cumulative,
      root: result.root,
      logsBloom: result.logs,
    });
    transactionData = transactionData.reverse();
    this.setState({
      transactionData,
    });
  }

  isValidHash(hash) {
    const validHashLength = 66;

    if (hash && hash.length === validHashLength) {
      return true;
    }
    return false;
  }
  searchHandler(e) {
    e.preventDefault();
    this.setState({
      isSearch: true,
    });
    const { searchText } = this.state;

    if (searchText && searchText !== '') {
      const isValid = this.isValidHash(searchText);
      if (isValid) {
        this.getFantomTransactionsFromApiAsync(searchText);
        this.setState({
          error: '',
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

  renderTransactionList() {
    const { isSearch, currentPageVal, isRoute } = this.state;
    const from = currentPageVal * 10;
    const to = from + 10;
    const { latestTransactions } = this.props.blockDetails;

    if (this.props.blockDetails && this.props.blockDetails.allBlockData) {
      const transformedBlockArray = this.props.blockDetails.allBlockData.slice(
        from,
        to
      );
      const transformedArray = [];
      const newTransformedArr = [];
      let newValue = '';
      if (transformedBlockArray.length) {
        for (const block of transformedBlockArray) {
          block.transactions.forEach((transac) => {
            const value = Web3.utils.fromWei(`${transac.value}`, 'ether');
            newValue = Number(value).toFixed(4);
            transformedArray.push({
              block_id: block.hash,
              address_from: transac.from,
              transaction_hash: transac.transactionHash,
              address_to: transac.to,
              value,
              gasUsed: transac.gas,
              cumulativeGasUsed: transac.cumulativeGasUsed,
              contractAddress: transac.contractAddress,
              root: transac.root,
              logsBloom: transac.logsBloom,
              status: transac.status,
            });
          });
        }
      }
      if (this.props.blockDetails && this.props.blockDetails.allBlockData) {
        if (!isSearch && !isRoute) {
          return (
            <Col>
              <Table className="transactions-table">
                <thead>
                  <tr>
                    <th>TxHash</th>
                    <th>Block</th>
                    {/* <th>Age</th> */}
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    {/* <th>[TxFee]</th> */}
                  </tr>
                </thead>
                <tbody>
                  {transformedArray &&
                    transformedArray.length > 0 &&
                    transformedArray.map((data, index) => (
                      <tr
                        key={`tx_${index}`}
                        onClick={() =>
                          this.props.history.push({
                            pathname: `/transactions/${data.transaction_hash}`,
                            state: { data, type: 'transaction' },
                          })
                        }
                      >
                        <td
                          data-head="TxHash"
                          className="text-primary  text-ellipsis full head"
                        >
                          <span className="icon icon-transaction">
                            {data.transaction_hash}
                          </span>
                        </td>
                        <td
                          data-head="Block"
                          className="text-primary  text-ellipsis half"
                        >
                          {data.block_id}
                        </td>

                        <td
                          data-head="From"
                          className="text-primary  text-ellipsis half"
                        >
                          {data.address_from}
                        </td>
                        <td
                          data-head="To"
                          className="text-primary  text-ellipsis half"
                        >
                          {data.address_to}
                        </td>
                        <td data-head="Value" className="half">
                          <span className="o-5">{newValue}</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          );
        }
      }
      return null;
    }
    return null;
  }

  renderTransactionSearchView() {
    const {
      transactionData,
      error,
      searchText,
      isRoute,
      isSearch,
    } = this.state;
    if (isSearch) {
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
    if (isRoute) {
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
  }
  onShowList = () => {
    this.props.history.push('/transactions');
    this.setState({
      searchText: '',
      isSearch: false,
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
      if (transformedBlockArray && transformedBlockArray.length) {
        const firstBlock = transformedBlockArray[0];
        const lastBlock =
          transformedBlockArray[transformedBlockArray.length - 1];
        descriptionBlock = `Block #${lastBlock.height} To #${
          firstBlock.height
        } `;
      }
      return (
        <div>
          <Wrapper
            onChangePage={this.onChangePage}
            onShowList={this.onShowList}
            icon={TitleIcon}
            title="Transactions"
            block={descriptionBlock}
            total={totalBlocks}
            isSearching={isSearch}
            isRoute={isRoute}
            currentPage={this.state.currentPageVal}
            searchHandler={(e) => this.searchHandler(e)}
            setSearchText={(e) => this.setSearchText(e)}
            searchText={searchText}
          >
            {this.renderTransactionSearchView()}
            <Row>{this.renderTransactionList()}</Row>
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
)(Transactions);
