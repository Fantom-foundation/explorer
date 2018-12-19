import React from 'react';
import Navigation from './nav/navigation';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Navigation {...this.props} />
        {/* <div className="loader">
          <div className="holder">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div> */}
      </header>
    );
  }
}
