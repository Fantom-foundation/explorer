import React from 'react';
import {
  Row,
  Col,
  Form,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { setUserDetails } from 'views/controllers/user-details/action';
import { getUserDetails } from 'views/controllers/user-details/selector';
import { verifyEmailTokenApi } from 'views/containers/apis/verify-token';
import { emailTokenApi } from 'views/containers/apis/email-token';

class VerifyEmail extends React.Component {
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
        this.props.history.push('/');
      }
      this.setState(result);
    });
  }
  resendEmail = (event) => {
    event.preventDefault();
    emailTokenApi({ ...this.props });
  }
  render() {
    return (
      <Row>
      <Col sm="12" style={{ paddingTop: '86px', minHeight: '100vh', backgroundColor: 'black' }}>
        <div style={{ width: '100%', maxWidth: '500px', margin: 'auto' }}>
          <Row className="mx-0" style={{ backgroundColor: 'white', paddingTop: '20px', paddingBottom: '10px'}}>
            <Col className="px-5 py-3">
              <Form>
              <div>
                  <p>Please Verify your email...</p>
                  <p>Either if email not received, or token expired then click on resend button</p>
              </div>
                    <Button style={{ marginLeft: '100px', backgroundColor: 'black', width: '200px' }} value={40} onClick={(event) => this.resendEmail(event)}>Resend</Button>
              </Form>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    );
  }
}
const mapStateToProps = createSelector(
  getUserDetails(),
  (userDetails) => ({ userDetails }),
);
const mapDispatchToProps = {
  setUserDetails,
};
export default connect(
mapStateToProps,
mapDispatchToProps,
)(VerifyEmail);
