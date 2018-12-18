import React from 'react';
import { Col, Table, Row, TabContent, TabPane } from 'reactstrap';
import Header from '../../components/header/header'
import SearchForBlock from '../../components/search/searchForBlock'
import SearchForTransaction from '../../components/search/searchForTransaction'


export default class DetailView extends React.PureComponent {
  showDetail(height, transactions) {
    if (transactions <= 0) {
      return;
    }
    const { showDetail } = this.props; // eslint-disable-line
    if (showDetail) {
      showDetail(height);
    }
  }
  render() {
    const location = this.props.location;
    const state = location.state;
    const data = state.data;
    const type = state.type;
    if (type === 'transaction') {
      let txnStatus = 'Failed';
      if (data.status === 0) {
        txnStatus = 'Success';
      }
      return (
        <SearchForTransaction transactions={[data]}/>
  
      );
    } else if (type === 'block') {
      let transactionText = 'transactions';
      let blocks =[];
      const block  ={};
      block.height = data.height;
      block.hash = data.hash;
      block.round = data.round;
      block.transactions = data.transactions.length;
      blocks.push(block);
      if (data.transactions.length <= 1) {
        transactionText = 'transaction';
      }

      return (
       
        <SearchForBlock blocks={blocks}/>
      );
    }
  }
}
