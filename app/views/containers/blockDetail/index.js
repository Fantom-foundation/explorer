import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import HttpDataProvider from '../../../../app/utils/httpProvider';
import _ from 'lodash'; // eslint-disable-line
import SearchForBlock from '../../components/search/searchForBlock/index';
import TitleIcon from '../../../images/icons/latest-blocks.svg';
import { setBlockData } from '../../controllers/blocks/action';
import { getBlockUpdateDetails } from '../../controllers/blocks/selector';
import Wrapper from '../../wrapper/wrapper';

class BlockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      blockData: [],
      allBlockData: [],
      error: '',
    };

    this.showDetail = this.showDetail.bind(this);
    this.onShowList = this.onShowList.bind(this);
    this.getFantomBlocks(props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    if (match.params.id !== prevProps.match.params.id) {
      this.getFantomBlocks(match.params.id);
    }
  }

  /**
   * @method onShowList():  Function to show list of blocks
   */
  onShowList() {
    const { history } = this.props;
    history.push('/blocks');
  }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  /**
   * @method getFantomBlocks():  Api to fetch blocks for given index of block of Fantom own endpoint.
   * @param {String} searchText : Text to fetch block.
   */
  getFantomBlocks(searchText) {
    const searchQuery = `index:${searchText}`;

    HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
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

  /**
   * @method loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
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
      error: '',
    });
  }

  /**
   * @method showDetail() :  Function to show details of particular block number
   * @param {String} blockNumber : Block number used for getting details
   */
  showDetail(blockNumber) {
    if (blockNumber === '') {
      return;
    }
    const { history } = this.props;
    history.push(`/block/${blockNumber}`); // eslint-disable-line
  }

  renderBlockSearchView() {
    const { error, searchText, blockData } = this.state;
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
  }

  render() {
    const { searchText } = this.state;
    const { blockDetails, match, history } = this.props;
    let descriptionBlock = '';

    let totalBlocks = '';
    if (blockDetails && blockDetails.allBlockData) {
      descriptionBlock = 'Block Number: ';
      totalBlocks = `${match.params.id}`;
    }
    return (
      <div>
        <Wrapper
          setSearchText={(e) => this.setSearchText(e)}
          searchText={searchText}
          icon={TitleIcon}
          title="Blocks"
          block={descriptionBlock}
          total={totalBlocks}
          pagination={false}
          onShowList={this.onShowList}
          history={history}
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
