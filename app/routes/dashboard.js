
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'views/containers/home/';
import Blocks from 'views/containers/home/blocks';
import VerifyEmail from 'views/containers/pages/verify-email';
import Register from 'views/containers/pages/register';
import Login from 'views/containers/pages/login';
import account_management from 'views/containers/account-management/account-management.js';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/blocks" component={Blocks} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/account-management" component={account_management} />
      </Switch>
    </div>
  );
}
