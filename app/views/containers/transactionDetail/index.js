import React, { Component } from 'react';
import Web3 from 'web3';
import TitleIcon from '../../../images/icons/latest-transaction.svg';
import SearchForTransaction from '../../components/search/searchForTransaction/index';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';
import Wrapper from '../../wrapper/wrapper';
import { setBlockData } from '../../controllers/blocks/action';
import HttpDataProvider from '../../../../app/utils/httpProvider';

class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      transactionData: [],
      error: '',
    };
    this.getFantomTransactionsFromApiAsync(props.match.params.id);
    this.onShowList = this.onShowList.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      this.getFantomTransactionsFromApiAsync(match.params.id);
    }
  }

  /**
   * @method onShowList() :  Function to show list of all transactions
   */
  onShowList() {
    const { history, blockDetails } = this.props;
    history.push('/transactions');
    // this.setState({
    //   searchText: '',
    //   error: '',
    // });
  }

  /**
   * getFantomTransactionsFromApiAsync():  Api to fetch transactions for given address of Fantom own endpoint.
   * @param {String} address : address to fetch transactions.
   */
  getFantomTransactionsFromApiAsync(searchTransactionHash) {
    const transactionHash = `"${searchTransactionHash}"`;

    HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
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

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  /**
   * @method loadFantomTransactionData() :  Function to create array of objects from response of Api calling for storing transactions.
   * @param {*} responseJson : Json of transaction response data from Api.
   */
  loadFantomTransactionData(result) {
    const transactionData = [];
    console.log('result.value', result);
    let newVal = '';
    if (result.value) {
      newVal = Web3.utils.fromWei(`${result.value}`, 'ether');
    }

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
      error: '',
    });
  }

  renderTransactionSearchView() {
    const { transactionData, error, searchText } = this.state;
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

  render() {
    const { searchText } = this.state;
    let descriptionBlock = '';

    let totalBlocks = '';
    const { blockDetails, history, match } = this.props;
    const {
      blockDetails: { allBlockData },
    } = this.props;

    if (allBlockData && allBlockData.length) {
      const firstBlock = allBlockData[0];
      totalBlocks = ` (Total of ${firstBlock.height} Blocks)`;
    }

    if (blockDetails && blockDetails.allBlockData) {
      descriptionBlock = 'Txn Hash: ';
      totalBlocks = `${match.params.id}`;
      return (
        <div>
          <Wrapper
            onShowList={this.onShowList}
            icon={TitleIcon}
            title="Transactions"
            block={descriptionBlock}
            total={totalBlocks}
            pagination={false}
            setSearchText={(e) => this.setSearchText(e)}
            searchText={searchText}
            history={history}
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
