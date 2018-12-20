import React from 'react';
import Navigation from './nav/navigation';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Navigation {...this.props} />
      </header>
    );
  }
}
