
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from 'common/utility';
import HomePage from 'views/containers/home/';
import Blocks from 'views/containers/home/blocks';
import Details from 'views/containers/home/details';
import VerifyEmail from 'views/containers/Pages/verify-email';
import Register from 'views/containers/Pages/register';
import Login from 'views/containers/login/index';

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
      <Route exact path="/" component={HomePage} />
      <Route path="/blocks" component={Blocks} />
      <Route path="/details" component={Details} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
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

