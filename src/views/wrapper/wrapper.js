import React, { Component } from 'react';
import {
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

import Header from 'src/views/components/header/header';
import Footer from 'src/views/components/footer/footer';
import TransactionHeader from '../components/header/tranactionBlockHeader';
import SearchBar from '../components/search/searchBar/index';
import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';
import TxBlockPagination from '../containers/pagination/txBlockPagination';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  isValidHash(hash) {
    const validHashLength = 66;
    if (hash && hash.length === validHashLength) {
      return { isValid: true, type: 'hash' };
    } else if (/^\d+$/.test(hash)) {
      return { isValid: true, type: 'number' };
    }
    return { isValid: false };
  }

  searchHandler(e) {
    e.preventDefault();
    const { searchText } = this.props;

    if (searchText && searchText !== '') {
      const { isValid, type } = this.isValidHash(searchText);
      if (isValid) {
        if (type === 'number') {
          this.props.history.push({
            pathname: `/blocks/${searchText}`,
          });
        } else if (type === 'hash') {
          this.props.history.push({
            pathname: `/transactions/${searchText}`,
          });
        }
      } else {
        this.toggle();
      }
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      searchText,
      placeHolder,
      onChangePage,
      title,
      block,
      total,
      onShowList,
      currentPage,
      pagination,
      setSearchText,
    } = this.props;

    return (
      <React.Fragment>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
            <div className="content">
              <h2 className="title">Error</h2>
              <p className="error">
                Invalid Block Number or Transaction Hash. Please enter a valid
                Block Number or Transaction Hash.
              </p>
            </div>
            <Button color="primary" className="w-100" onClick={this.toggle}>
              OK
            </Button>
          </ModalBody>
        </Modal>

        <Header />
        <SearchBar
          searchHandler={(e) => {
            this.searchHandler(e);
          }}
          setSearchText={(e) => setSearchText(e)}
          searchText={searchText}
          placeHolder={placeHolder}
        />
        <section className="bg-theme full-height-conatainer">
          <Container>
            <TransactionHeader
              onChangePage={onChangePage}
              icon={TitleIcon}
              title={title}
              block={block}
              total={total}
              onShowList={onShowList}
              currentPage={currentPage}
              pagination={pagination}
            />
            {this.props.children}
            {pagination ? (
              <TxBlockPagination
                onChangePage={onChangePage}
                currentPage={currentPage}
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
