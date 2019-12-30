// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'src/views/containers/home';
import Blocks from 'src/views/containers/BlocksPage';
import Transactions from 'src/views/containers/transactions';
import Details from 'src/views/containers/BlocksPage/details';
import Address from 'src/views/containers/address';
import BlockTransactionDetail from 'src/views/components/search/searchForBlock/viewBlockDetail';
import Validators from 'src/views/containers/validators';
import BlockDetail from 'src/views/containers/blockDetail';
import TransactionDetail from 'src/views/containers/TransactionDetail';
import BlockTransPage from 'src/views/containers/BlockTransactions';
import AddressPage from 'src/views/containers/address';
import Assets from "src/views/containers/assets";
import SingleAssets from "src/views/containers/assets/singleAssets";
import SingleValidators from "src/views/containers/validators/single";
import SingleValidatorCheater from "src/views/containers/validators/single-cheater";


export default function Dashboard() {
    return (
        <>
            {/* <Route path="/(blocks|transactions|block|address|validators)" component={SearchBar} /> */}
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/blocks" exact component={Blocks} />
                <Route path="/blocks/:id" component={BlockDetail} />
                <Route exact path="/assets" component={Assets} />
                <Route path="/assets/detail" component={SingleAssets} />
                {/*<Route path="/address" component={Address} />*/}
                <Route path="/transactions" exact component={Transactions} />
                <Route path="/transactions/:id" component={TransactionDetail} />
                <Route path="/details" component={Details} />
                <Route path="/block/:id?" component={BlockTransactionDetail} />
                <Route path="/validators" component={Validators} />
                <Route path="/blocks-transactions/:id" component={BlockTransPage} />
                <Route path="/address/:id" component={AddressPage} />
                <Route path="/validator/:id" component={SingleValidators} />
                <Route path="/cheater/:id" component={SingleValidatorCheater} />

            </Switch>
        </>
    );
};

