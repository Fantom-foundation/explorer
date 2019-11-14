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
import SearchBar from '../components/SearchBar/index';
import TxBlockPagination from '../containers/pagination/txBlockPagination';

import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

class Wrapper extends React.Component<{||}, { modal: boolean }> { // TODO: component refactor
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
                    historyPush({
                        pathname: `/blocks/${searchText}`,
                    });
                } else if (type === 'hash') {
                    historyPush({
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
