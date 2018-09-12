
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'views/containers/home/';
import VerifyEmail from 'views/containers/pages/verify-email';
import Register from 'views/containers/pages/register';
import Login from 'views/containers/pages/login';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}
