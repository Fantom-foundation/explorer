import React from 'react';

export default class VerifyEmail extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.history.push('login');
    }, 2000);
  }
  render() {
    return (
      <div><p>Welcome Fantom</p></div>

    );
  }
}
