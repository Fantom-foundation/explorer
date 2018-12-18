import React from 'react';
import { Container, Col, Table, Row, TabContent, TabPane } from 'reactstrap';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import SearchForBlock from '../../components/search/searchForBlock'
import SearchForTransaction from '../../components/search/searchForTransaction'
import TranactionBlockHeader from '../../components/header/tranactionBlockHeader';
import SearchBar from '../../components/search/searchBar/index';
import TitleIconTransaction from '../../../images/icons/latest-transaction.svg';
import TitleIconBlock from '../../../images/icons/latest-blocks.svg';

export default class DetailView extends React.PureComponent {

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
        <React.Fragment>
          <Header />
          <SearchBar />
            <section>
              <Container>
              <TranactionBlockHeader
              onChangePage={this.onChangePage}
              onShowList={this.onShowList}
              icon={TitleIconTransaction}
              title="Transactions"
              block="Block #683387 To #683390"
              total="(Total of 683391 Blocks)"
              isSearching={false}
              currentPage={1}
            />
              </Container>
            </section>
            <section  className="pb-3">
              <Container>
                <SearchForTransaction transactions={[data]}/>
              </Container>
            </section>
          <Footer />
        </React.Fragment>
  
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
        <React.Fragment>
          <Header />
          {/* <SearchBar searchHandler={(e) => this.searchHandler(e) } setSearchText={ (e) => this.setSearchText(e)} searchText={searchText}/> */}
          <SearchBar />
          <section>
              <Container>  
          <TranactionBlockHeader
              onChangePage={this.onChangePage}
              onShowList={this.onShowList}
              icon={TitleIconBlock}
              title="Blocks"
              block="Block #683387 To #683390"
              total="(Total of 683391 Blocks)"
              isSearching={false}
              currentPage={ 1}
            />
             </Container>
            </section>
            <section className="pb-3"> 
              <Container>
                <SearchForBlock blocks={blocks}/>
              </Container>
            </section>
          <Footer />
        </React.Fragment>
      );
    }
  }
}
