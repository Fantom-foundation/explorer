// @flow

import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "src/views/containers/home";
import Blocks from "src/views/containers/BlocksPage";
import Transactions from "src/views/containers/transactions";
import Details from "src/views/containers/BlocksPage/details";
// import Address from "src/views/containers/address";
import BlockTransactionDetail from "src/views/components/search/searchForBlock/viewBlockDetail";
import Resources from "src/views/containers/resources";
import BlockDetail from "src/views/containers/blockDetail";
import TransactionDetail from "src/views/containers/TransactionDetail";
import Address from "src/views/containers/address";
import Assets from "src/views/containers/assets";
import SingleAssets from "src/views/containers/assets/singleAssets";
import SearchBar from "src/views/components/SearchBar";
import Validators from "src/views/containers/validators";
import SingleValidators from "src/views/containers/validators/single";
import SingleValidatorCheater from "src/views/containers/validators/single-cheater";

export default function Dashboard() {
  return (
    <>
      <Route path="/(blocks|transactions|block)" component={SearchBar} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/address" component={Address} />
        <Route exact path="/assets" component={Assets} />
        <Route path="/assets/detail" component={SingleAssets} />
        <Route path="/validators" component={Validators} />
        <Route path="/validators-single" component={SingleValidators} />
        <Route
          path="/validators-single-cheater"
          component={SingleValidatorCheater}
        />
        <Route path="/blocks" exact component={Blocks} />
        <Route path="/blocks/:id" component={BlockDetail} />
        {/*<Route path="/address" component={Address} />*/}
        <Route path="/transactions" exact component={Transactions} />
        <Route path="/transactions/:id" component={TransactionDetail} />
        <Route path="/details" component={Details} />
        <Route path="/block/:id?" component={BlockTransactionDetail} />
        <Route path="/resources" component={Resources} />
      </Switch>
    </>
  );
}
