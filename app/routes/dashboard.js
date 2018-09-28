
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from 'common/utility';
import HomePage from 'views/containers/home/';
import Blocks from 'views/containers/blocks/index';
import Transactions from 'views/containers/transactions/index';
import Details from 'views/containers/blocks/details';
import VerifyEmail from 'views/containers/Pages/verify-email';
// import Register from 'views/containers/register/index';
// import Login from 'views/containers/login/index';
import Address from 'views/containers/address/index';
import ModalComponent from 'views/containers/modal/index';

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
      {/* <Route path="/blocks" component={Blocks} /> */}
      <Route path="/address" component={Address} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/details" component={Details} />
      {/* <Route path="/login" component={Login} />
      <Route path="/register" component={Register} /> */}
      <Route path="/login-modal" component={ModalComponent} />
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

ModalComponent