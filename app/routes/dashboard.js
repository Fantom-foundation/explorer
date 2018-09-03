
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'views/containers/homepage/Loadable';
import SecondPage from 'views/containers/pages/SecondPage.js';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/second-page" component={SecondPage} />
      </Switch>
    </div>
  );
}
