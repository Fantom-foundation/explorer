import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { isUserLoggedIn } from 'src/common/utility';
import HomePage from 'src/views/containers/home';
import Blocks from 'src/views/containers/blocks/index';
import Transactions from 'src/views/containers/transactions/index';
import Details from 'src/views/containers/blocks/details';
import VerifyEmail from 'src/views/containers/pages/verify-email';
// import Register from 'views/containers/register/index';
// import Login from 'views/containers/login/index';
import Address from 'src/views/containers/address/index';
// import ModalComponent from 'views/containers/modal/index';
import BlockTransactionDetail from 'src/views/components/search/searchForBlock/viewBlockDetail/index';
import Resources from 'src/views/containers/resources/index';
import BlockDetail from 'src/views/containers/blockDetail/index';
import TransactionDetail from 'src/views/containers/transactionDetail/index';

function renderLoggedInRoutes() {
  return (
    <Switch>
      <Route path="/verify-email" component={VerifyEmail} />
      <Redirect to="/" />
    </Switch>
  );
}

function renderLoggedOutRoutes() {
  return (
    <Switch>
      <Route path="/blocks" exact component={Blocks} />
      <Route path="/blocks/:id" component={BlockDetail} />
      <Route path="/address" component={Address} />
      <Route path="/transactions" exact component={Transactions} />
      <Route path="/transactions/:id" component={TransactionDetail} />
      <Route path="/details" component={Details} />
      <Route path="/block/:id" component={BlockTransactionDetail} />
      <Route path="/resources" component={Resources} />
      {/* <Route path="/login" component={Login} />
      <Route path="/register" component={Register} /> */}
      {/* <Route path="/login-modal" component={ModalComponent} /> */}
      <Redirect to="/" />
    </Switch>
  );
}

function renderAuthRoutes() {
  const isLoggedIn = isUserLoggedIn();
  if (isLoggedIn) {
    return renderLoggedInRoutes();
  }
  return renderLoggedOutRoutes();
}
export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      {renderAuthRoutes()}
    </div>
  );
}
