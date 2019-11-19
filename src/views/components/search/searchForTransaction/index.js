import React, { Component } from 'react';

/**
 * SearchForTransaction :  A component meant for searching details of particuler transaction , on entering valid transaction hash in search field.
 */

class SearchForTransaction extends Component {
    renderDetail = () => {
        const { transactions } = this.props;
        let transactionHash = '';
        let txnStatus = '';
        let addressFrom = '';
        let addressTo = '';
        let value = '';
        let gasUsed = '';
        let cumulativeGasUsed = '';
        let contractAddress = '';
        let root = '';
        let inputData = '';

        if (transactions && transactions.length) {
            const data = transactions.map((txData, index) => {
                transactionHash = txData.transaction_hash || '--';
                txnStatus = txData.status === 0 ? 'Success' : 'Failed';
                addressFrom = txData.address_from || '--';
                addressTo = txData.address_to || '--';
                value = `${txData.value}` || '--';
                // if (value !== '--') {
                //   value = Web3.utils.fromWei(`${value}`, 'ether');
                //   value = Number(value).toFixed(4);
                // }
                gasUsed = `${txData.gasUsed}` || '--';
                cumulativeGasUsed = `${txData.cumulativeGasUsed}` || '--';
                contractAddress = `${txData.contractAddress}` || '--';
                root = `${txData.root}` || '--';
                inputData = `${txData.logsBloom}` || '--';

                return null;
            });
            return data;
        }
        return null;
    };
    render() {
        return this.renderDetail();
    }
}

export default SearchForTransaction;
