// @flow

import * as React from 'react';
import { Row, Col } from 'reactstrap';

import TransactionIcon from 'src/assets/images/icons/transactions.svg';

type TransactionBlockHeaderProps = {
    title: string,
    block: string,
    total: string,
    icon: string,
    children: React.Node,
}

// TODO: refactor to functional component
export default class TransactionBlockHeader extends React.PureComponent<TransactionBlockHeaderProps, any> { // TODO: add flow types
    static defaultProps = {
        icon: TransactionIcon,
        total: '',
        block: '',
    };

    state = {
        windowWidth: 1900,
    };

    // ** TODO: refactor to redux-resize or redux-responsive

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
        });
    }

    // ** --------------------------------------------------

    render() {
        const { windowWidth } = this.state;
        const {
            title,
            block,
            total,
            icon,
            children,
        } = this.props;

        return (
            <Row>
                <Col md={6} className="table-title">
                    <Row>
                        <Col xs={6} md={12}>
                            <h2 style={{ backgroundImage: `url(${icon})` }}>{title}</h2>
                        </Col>
                        <Col xs={6} md={12}>
                            <div className="info">
                                <p>{block} </p>
                                <p style={{ marginLeft: 5 }}>{total}</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
                {windowWidth >= 768 && children}
            </Row>
        );
    }
}
