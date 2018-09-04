import React from 'react';
import { Identicons } from 'views/containers/homepage/identicons';

export default class IdenticonsIcon extends React.Component {
  render() {
    const index = this.props.index.toString();
    const date = this.props.date.toString();
    return (
      <li>
        <label className="form-radio-label">
          <input name="name" className="form-radio-field" type="radio" value="vagatarian food" />
          <i className="form-radio-button"></i>
          <div className="d-inline-block" style={{ width: '40px', height: '45px', overflow: 'hidden' }}>
            <Identicons id={index + date} width={40} size={3} />
          </div>
        </label>
      </li>
    );
  }
}
