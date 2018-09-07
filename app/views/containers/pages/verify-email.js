import React from 'react';
import { verifyEmailTokenApi } from 'views/containers/apis/verify-token';

export default class VerifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: '',
        };
      }
  componentWillMount() {
    const emailTokenPromise = verifyEmailTokenApi({ ...this.props });
    emailTokenPromise.then((result) => {
        if (result.text === 'success') {
          this.props.history.push('/login');
            // setTimeout(() => {
            //     this.props.history.push('/login');
            // }, 5000);
        }
      this.setState(result);
    });
  }
  render() {
      if (this.state.text === 'success') {
          return null;
      }
    return (
      <div><p>Verify Your Email Again</p></div>

    );
  }
}
