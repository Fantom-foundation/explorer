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
      currentPageVal: 0,
    };

    this.maxPageVal = 0;
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
          isRoute: true,

          blockData: data,
        };
      }
    }

    return {
      ...state,
      isSearch: false,
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
        blockData: [],
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

  renderBlockList() {
    const { currentPageVal } = this.state;
    const from = currentPageVal * 10;
    const to = from + 10;

    if (this.props.blockDetails && this.props.blockDetails.allBlockData) {
      const transformedBlockArray = this.props.blockDetails.allBlockData.slice(
        from,
        to
      );
      if (true) {
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
                            pathname: `/blocks/${data.height}`,
                            state: { data, type: 'block' },
                          })
                        }
                      >
                        <td
                          data-head="Height"
                          className="text-primary full head"
                        >
                          <span className="icon icon-block">{data.height}</span>
                        </td>
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
    }
    return null;
  }

  onShowList = () => {
    this.props.history.push('/blocks');
    this.setState({
      searchText: '',
      isSearch: false,
      error: '',
      isRoute: false,
    });
  };

  render() {
    const blocks = this.state.blockArray; // eslint-disable-line
    const { searchText, isSearch, isRoute, currentPageVal } = this.state;
    let descriptionBlock = '';
    const from = currentPageVal * 10;
    const to = from + 10;
    let totalBlocks = '';

    if (this.props.blockDetails && this.props.blockDetails.allBlockData) {
      const transformedBlockArray = this.props.blockDetails.allBlockData.slice(
        from,
        to
      );

      const {
        blockDetails: { allBlockData },
      } = this.props;
      if (allBlockData.length) {
        const firstBlock = allBlockData[0];
        totalBlocks = ` (Total of ${firstBlock.height} Blocks)`;
      }

      if (transformedBlockArray && transformedBlockArray.length) {
        const firstBlock = transformedBlockArray[0];
        const lastBlock =
          transformedBlockArray[transformedBlockArray.length - 1];
        descriptionBlock = `Block #${lastBlock.height} To #${
          firstBlock.height
        } `;
      }
    }
    return (
      <div>
        <Wrapper
          setSearchText={(e) => this.setSearchText(e)}
          searchText={searchText}
          onChangePage={this.onChangePage}
          icon={TitleIcon}
          title="Blocks"
          block={descriptionBlock}
          total={totalBlocks}
          isSearching={isSearch}
          isRoute={isRoute}
          onShowList={this.onShowList}
          currentPage={this.state.currentPageVal}
          history={this.props.history}
          placeHolder="Search by Transaction Hash / Block Number"
        >
          {this.state.error ? (
            <p className="text-white">{this.state.error}</p>
          ) : (
            this.renderBlockList()
          )}
        </Wrapper>
      </div>
    );
  }
}

Blocks.propTypes = {
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
)(Blocks);
