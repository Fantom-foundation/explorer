
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'views/containers/homepage/Loadable';
import account_management from 'views/containers/account-management/account-management.js';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/account-management" component={account_management} />
      </Switch>
    </div>
  );
}
