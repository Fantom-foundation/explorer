
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HomePage from 'views/containers/HomePage/Loadable';
import HomePage from 'views/containers/Pages/FirstPage';
import AboutPage from 'views/containers/AboutPage/Loadable';
import NotFoundPage from 'views/containers/NotFoundPage/Loadable';

export default function Dashboard() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </div>
  );
}
