// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'src/views/containers/home';
import Blocks from 'src/views/containers/BlocksPage';
import TransactionsPage from 'src/views/containers/TransactionsPage';
import Details from 'src/views/containers/BlocksPage/details';
import Address from 'src/views/containers/address';
import BlockTransactionDetail from 'src/views/components/search/searchForBlock/viewBlockDetail';
import Resources from 'src/views/containers/resources';
import BlockDetail from 'src/views/containers/BlockDetail';
import TransactionDetail from 'src/views/containers/TransactionDetail';

import SearchBar from 'src/views/components/SearchBar';

export default function Dashboard() {
    return (
        <>
            <Route path="/(blocks|transactions|block)" component={SearchBar} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/blocks" component={Blocks} />
                <Route path="/blocks/:id" component={BlockDetail} />
                {/*<Route path="/address" component={Address} />*/}
                <Route exact path="/transactions" component={TransactionsPage} />
                <Route path="/transactions/:id" component={TransactionDetail} />
                <Route path="/details" component={Details} />
                <Route path="/block/:id?" component={BlockTransactionDetail} />
                <Route path="/resources" component={Resources} />
            </Switch>
        </>
    );
};

