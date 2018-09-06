
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'views/containers/homepage/Loadable';
import VerifyEmail from 'views/containers/pages/verify-email';
import account_management from 'views/containers/account-management/account-management.js';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route exact path="/account-management" component={account_management} />
      </Switch>
    </div>
  );
}
