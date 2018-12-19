import React, { Component } from 'react';
import Header from 'views/components/header/header';
import Footer from 'views/components/footer/footer';
import TransactionHeader from '../components/header/tranactionBlockHeader';
import SearchBar from '../components/search/searchBar/index';
import TitleIcon from '../../images/icons/latest-blocks.svg';
import TxBlockPagination from '../containers/pagination/txBlockPagination';
import { Container, Row, Col, Table, Button } from 'reactstrap';

class Wrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <SearchBar
          searchHandler={(e) => this.props.searchHandler(e)}
          setSearchText={(e) => this.props.setSearchText(e)}
          searchText={this.props.searchText}
        />
        <section className="bg-theme full-height-conatainer">
          <Container>
            <TransactionHeader
              onChangePage={this.props.onChangePage}
              icon={TitleIcon}
              title="Blocks"
              block="Block #683387 To #683390"
              total="(Total of 683391 Blocks)"
              isSearching={this.props.isSearching}
              onShowList={this.props.onShowList}
              currentPage={this.props.currentPage}
              isRoute={this.props.isRoute}
            />
            {this.props.children}
            {!this.props.isSearching && !this.props.isRoute ? (
              <TxBlockPagination
                onChangePage={this.props.onChangePage}
                isSearching={this.props.isSearch}
                currentPage={this.props.currentPage}
              />
            ) : null}
          </Container>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default Wrapper;
