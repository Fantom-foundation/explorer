// @flow

import * as React from 'react';
import { Container } from 'reactstrap';

import TransactionHeader from '../components/header/tranactionBlockHeader';
import TxBlockPagination from '../containers/pagination/txBlockPagination';

import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

type WrapperProps = {|
    +onChangePage: (string) => void,
    +title: string,
    +block: string,
    +total: string,
    +currentPage: number,
    +children: React.Node,
|};

class Wrapper extends React.Component<WrapperProps> { // TODO: component refactor
    render() {
        const {
            onChangePage,
            title,
            block,
            total,
            currentPage,
            children,
        } = this.props;

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
                            currentPage={currentPage}
                        />
                        { children }
                        <TxBlockPagination
                            onChangePage={onChangePage}
                            currentPage={currentPage}
                        />
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}
export default Wrapper;
