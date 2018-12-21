import React, { Component } from 'react';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { createSelector } from 'reselect';
import { Row, Col, Table } from 'reactstrap';
import HttpDataProvider from '../../../../app/utils/httpProvider';
import TitleIcon from '../../../images/icons/latest-transaction.svg';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';
import Wrapper from '../../wrapper/wrapper';
import { setBlockData } from '../../controllers/blocks/action';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      error: '',
      lastFetchedPage: 2,
      currentPage: 0,
      hasNextPage: true,
      currentPageVal: 0,
    };
  }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
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

  renderTransactionList() {
    const { currentPageVal } = this.state;
    const from = currentPageVal * 10;
    const to = from + 10;
    const { latestTransactions } = this.props.blockDetails;
    const { blockDetails } = this.props;
    if (blockDetails && blockDetails.allBlockData) {
      const transformedBlockArray = blockDetails.allBlockData.slice(from, to);
      const transformedArray = [];
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
      if (blockDetails && blockDetails.allBlockData) {
        return (
          <Col>
            <Table className="transactions-table">
              <thead>
                <tr>
                  <th>TxHash</th>
                  <th>Block</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Value</th>
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
      return null;
    }
    return null;
  }

  onShowList = () => {
    const { history } = this.props;
    history.push('/transactions');
    this.setState({
      searchText: '',
      error: '',
    });
  };

  render() {
    const { searchText, currentPageVal } = this.state;
    const { history, blockDetails } = this.props;
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

    if (blockDetails && blockDetails.allBlockData) {
      const transformedBlockArray = blockDetails.allBlockData.slice(from, to);
      if (transformedBlockArray && transformedBlockArray.length) {
        const firstBlock = transformedBlockArray[0];
        const lastBlock =
          transformedBlockArray[transformedBlockArray.length - 1];
        descriptionBlock = `Transactions of Block #${lastBlock.height} To #${
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
            pagination
            currentPage={this.state.currentPageVal}
            setSearchText={(e) => this.setSearchText(e)}
            searchText={searchText}
            history={history}
            placeHolder="Search by Transaction Hash / Block Number"
          >
            {this.state.error ? (
              <p className="text-white">{this.state.error}</p>
            ) : (
              <Row>{this.renderTransactionList()}</Row>
            )}
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
