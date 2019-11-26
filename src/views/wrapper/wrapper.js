// @flow

import * as React from 'react';
import { Container, Col } from 'reactstrap';

import TransactionHeader from '../components/header/tranactionBlockHeader';
import TxBlockPagination from '../containers/pagination/txBlockPagination';

import TitleIcon from 'src/assets/images/icons/latest-blocks.svg';

type WrapperProps = {|
    +onChangePage: ('next'|'prev') => void,
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
            <section className="bg-theme full-height-conatainer">
                <Container>
                    <TransactionHeader
                        icon={TitleIcon}
                        title={title}
                        block={block}
                        total={total}
                    >
                        <Col md={6}>
                        {/*<Col md={6} className={!pagination ? 'text-right' : ''}>*/}
                            <TxBlockPagination
                                className="mr-0"
                                onChangePage={onChangePage}
                                currentPage={currentPage}
                            />
                        </Col>
                    </TransactionHeader>
                    { children }
                    <TxBlockPagination
                        onChangePage={onChangePage}
                        currentPage={currentPage}
                    />
                </Container>
            </section>
        );
    }
}
export default Wrapper;
