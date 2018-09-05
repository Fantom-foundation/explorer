import React from 'react';
import { Identicons } from 'views/containers/identicons/identicons';

export default class IdenticonsIcon extends React.Component {
  render() {
    console.log('this.props', this.props);
    const index = this.props.index.toString();
    const date = this.props.date.toString();
    let identiconsId = index + date;
    return (
      <li>
        <label className="form-radio-label">
          <input name="name" className="form-radio-field" type="radio" value={identiconsId} onChange={(event) => this.props.getRadioData(event, identiconsId)} />
          <i className="form-radio-button"></i>
          <div className="d-inline-block theme-blue-shadow identicon-boxes-container" >
            <Identicons id={identiconsId} width={40} size={3} />
          </div>
        </label>
      </li>
    );
  }
}
