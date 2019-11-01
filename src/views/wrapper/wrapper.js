// @flow

import React from 'react';
import {
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

import TransactionHeader from '../components/header/tranactionBlockHeader';
import SearchBar from '../components/search/searchBar/index';
import TxBlockPagination from '../containers/pagination/txBlockPagination';

import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

class Wrapper extends React.Component<any, { modal: boolean }> { // TODO: component refactor
    state = {
        modal: false,
    }

    isValidHash(hash: string) {
        const validHashLength = 66;

        if (hash && hash.length === validHashLength) {
            return { isValid: true, type: 'hash' };
        } else if (/^\d+$/.test(hash)) {
            return { isValid: true, type: 'number' };
        }

        return { isValid: false };
    }

    searchHandler = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { searchText } = this.props;

        if (searchText && searchText !== '') {
            const { isValid, type = 'hash' } = this.isValidHash(searchText);

            if (isValid) {
                const { history: historyPush } = this.props;

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

    toggle = () => {
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
            children,
        } = this.props;
        const { modal } = this.state;

        return (
            <React.Fragment>
                <Modal
                    isOpen={modal}
                    toggle={this.toggle}
                >
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
                <SearchBar
                    searchHandler={this.searchHandler}
                    setSearchText={setSearchText}
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
                        {children}
                        {pagination ? (
                            <TxBlockPagination
                                onChangePage={onChangePage}
                                currentPage={currentPage}
                            />
                        ) : null}
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
export default Wrapper;
