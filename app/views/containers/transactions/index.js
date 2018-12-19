import React, { Component } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import moment from 'moment';
import { Title } from '../../components/coreComponent';
import _ from 'lodash';
import Header from 'views/components/header/header';
import HttpDataProvider from '../../../../app/utils/httpProvider';
import TxBlockPagination from '../pagination/txBlockPagination';
import TranactionBlockHeader from '../../components/header/tranactionBlockHeader';
// import Web3 from 'web3';
import TitleIcon from '../../../images/icons/latest-transaction.svg';
import SearchBar from '../../components/search/searchBar/index';
import SearchForTransaction from '../../components/search/searchForTransaction/index';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // transactionArray: [],
      searchText: '',
      transactionData: [],
      error: '',
      isSearch: false,
      cursor: '',
      lastFetchedPage: 0,
      currentPage: 0,
      hasNextPage: true,
      hasPrevPage: false,
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
    const { cursor, lastFetchedPage, currentPage, hasNextPage } = this.state;
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
    // if (type === 'next' && fetch) {
    //   if (hasNextPage) {
    //     HttpDataProvider.post('http://18.216.205.167:5000/graphql?', {
    //       query: `
    //     {
    //       transactions(first:10,after:"${cursor}") {
    //         pageInfo {
    //           hasNextPage
    //         }
    //         edges {
    //           cursor
    //           node {
    //             hash
    //             from
    //             to
    //             block
    //             value
    //             gas
    //             cumulative
    //             contract
    //             root
    //             logs
    //             status
    //           }
    //         }
    //       }
    //     }`,
    //     })
    //       .then(
    //         (res) => {
    //           if (res && res.data) {
    //             // this.formatTransactionList(res.data);
    //             const allTransactionData = [];
    //             const edges = res.data.data.transactions.edges;
    //             const changedNextPage =
    //               res.data.data.transactions.pageInfo.hasNextPage;
    //             const changedPrevPage =
    //               res.data.data.transactions.pageInfo.hasPreviousPage;
    //             let changedCursor;
    //             edges.forEach((val) => {
    //               const {
    //                 block,
    //                 from,
    //                 hash,
    //                 to,
    //                 value,
    //                 gas,
    //                 cumulative,
    //                 contract,
    //                 root,
    //                 logs,
    //                 status,
    //               } = val.node;
    //               changedCursor = val.cursor;
    //               allTransactionData.push({
    //                 block_id: block,
    //                 address_from: from,
    //                 transaction_hash: hash,
    //                 address_to: to,
    //                 value,
    //                 gasUsed: gas,
    //                 cumulativeGasUsed: cumulative,
    //                 contractAddress: contract,
    //                 root,
    //                 logs,
    //                 status,
    //               });
    //             });
    //             this.setState((prevState) => ({
    //               transactionArray: [
    //                 ...prevState.transactionArray,
    //                 ...allTransactionData,
    //               ],
    //               cursor: changedCursor,
    //               lastFetchedPage: prevState.lastFetchedPage + 1,
    //               hasNextPage: changedNextPage,
    //               hasPrevPage: changedPrevPage,
    //             }));
    //           }
    //           return null;
    //         },
    //         () => {
    //           console.log('1');
    //         }
    //       )
    //       .catch((err) => {
    //         console.log(err, 'err in graphql');
    //       });
    //   }
    // }
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
    transactionData.push({
      transaction_hash: result.hash,
      Block_id: '',
      address_from: result.from,
      address_to: result.to,
      value: result.value,
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
    console.log(
      'hash.length === validHashLength : ',
      hash.length === validHashLength
    );
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
    const { isSearch, currentPage } = this.state;
    // const txFee = '0.0001';
    const from = currentPage * 10;
    const to = from + 10;
    const { latestTransactions } = this.props.blockDetails;
    console.log(
      'this.props.blockDetails787',
      this.props.blockDetails.latestTransactions
    );
    const transformedArray = latestTransactions.slice(from, to);
    if (!isSearch) {
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
                        pathname: `/detail/${data.transactionHash}`,
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
                    {/* <td className="text-black">
                      {moment(parseInt(data.createdAt, 10)).fromNow()}
                    </td> */}
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
                      <span className="o-5">{data.value}</span>
                    </td>
                    {/* <td className="text-black">{txFee}</td> */}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      );
    }
    return null;
  }

  renderTransactionSearchView() {
    const { transactionData, error, searchText } = this.state;

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
    this.setState({
      searchText: '',
      isSearch: false,
    });
  };
  render() {
    const { searchText, transactionData, hasNextPage } = this.state;
    console.log('this.props.blockDetails11', this.props.blockDetails);
    const { isSearch } = this.state;
    let txnHashText = '';
    if (transactionData && transactionData.length) {
      txnHashText = transactionData[0].transaction_hash;
    }
    return (
      <div>
        <Header />
        <SearchBar
          searchHandler={(e) => this.searchHandler(e)}
          setSearchText={(e) => this.setSearchText(e)}
          searchText={searchText}
        />
        <section className="bg-theme full-height-conatainer">
          <Container>
            {/*= ========= make this title-header component start=================*/}

            {/* <Row className="title-header">
              <Col>

                  <form
                    autoComplete="off"
                    onSubmit={(e) => this.searchHandler(e)}
                  >
                    <input
                      value={searchText}
                      id="search"
                      className="form-element-field"
                      placeholder=" "
                      type="search"
                      required=""
                      onChange={(e) => this.setSearchText(e)}
                    />
                    <div className="form-element-bar" />

                  </form>

              </Col>
            </Row> */}

            {/*= ========= make this title-header component end=================*/}
            <TranactionBlockHeader
              onChangePage={this.onChangePage}
              onShowList={this.onShowList}
              icon={TitleIcon}
              title="Transactions"
              block="Block #683387 To #683390"
              total="(Total of 683391 Blocks)"
              isSearching={isSearch}
              currentPage={this.state.currentPage}
            />
            {isSearch ? (
              <Row>{this.renderTransactionSearchView()}</Row>
            ) : (
              <Row>{this.renderTransactionList()}</Row>
            )}

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
)(Transactions);
