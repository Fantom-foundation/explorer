// @flow

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import TransactionDetail from './transactionDetail';
import { Title } from 'src/views/components/coreComponent';

/**
 * BlockTransactions :  A component meant for displaying transactions of particular block index
 *
 */

// TODO: Replace by universal transaction display component

function BlockDetail(props: {||}) {
    const { match, history } = props;
    const [state, setState] = useState<{
        error: string,
        transactions: Array<string>,
    }>({ transactions: [], error: '' });

    useEffect(() => {
        const { params: { id } } = match;

        if (id) {
            console.log(id);
        } else {
            history.push({
                pathname: '/blocks',
            });
        }

        setTimeout(() => {
            setState({ ...state, error: 'ahahah' });
        }, 1000);
    }, [match]);

    // getFantomBlocks(searchBlockIndex) {
    //     HttpDataProvider.post('https://graphql.fantom.services/graphql?', {
    //         query: `
    //       {
    //        block(index:${searchBlockIndex}) {
    //         id,payload
    //       }
    //       }`,
    //     })
    //
    //         .then((response) => {
    //             if (
    //                 response &&
    //                 response.data &&
    //                 response.data.data &&
    //                 response.data.data.block
    //             ) {
    //                 this.loadFantomBlockData(response.data.data);
    //             } else {
    //                 this.setState({
    //                     blockData: [],
    //                     error: 'No Record Found',
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             this.setState({
    //                 blockData: [],
    //                 error: error.message || 'Internal Server Error',
    //             });
    //         });
    // }

    /**
     * loadFantomBlockData() :  Function to create array of objects from response of Api calling for storing blocks.
     * @param {*} responseJson : Json of block response data from Api.
     */
    // loadFantomBlockData(allData) {
    //     let transactionData = [];
    //     const result = allData.block.payload;
    //     if (result.transactions !== null) {
    //         result.transactions.map((transaction) => {
    //             transactionData.push({
    //                 transaction_hash: transaction.transactionHash,
    //                 block_id: result.index,
    //                 address_from: transaction.from,
    //                 address_to: transaction.to,
    //                 value: transaction.value,
    //                 txFee: '',
    //                 createdAt: '',
    //                 gasUsed: transaction.gasUsed !== null ? transaction.gasUsed : '',
    //             });
    //         });
    //         transactionData = transactionData.reverse();
    //         this.setState({
    //             transactionData,
    //         });
    //     } else {
    //         this.setState({
    //             error: 'No Record Found!',
    //         });
    //     }
    // }

    // loadFantomBlockData(allData) {
    //   const result = allData.payload;
    //   let blockData = [];
    //   const txLength =
    //     allData.payload.transactions !== null
    //       ? allData.payload.transactions.length
    //       : 0;
    //   blockData.push({
    //     height: result.index,
    //     hash: result.hash,
    //     round: result.round,
    //     transactions: txLength,
    //   });
    //   blockData = blockData.reverse();
    //   this.setState({
    //     blockData,
    //   });
    // }

    const { transactions, error } = state;

    return (
        <section className="bg-theme full-height-conatainer">
            <Container>
                <Row className="title-header pt-3">
                    <Col className="pt-3">
                        <Title className="text-white" h2>
                            Transactions
                        </Title>
                    </Col>
                </Row>
                <Row>
                    {transactions.length > 0 && (
                        <TransactionDetail transactions={transactions} />
                    )}
                    {error !== '' && <p>{error}</p>}
                </Row>
            </Container>
        </section>
    );
}

export default BlockDetail;
