

import React from 'react';
import arrowLeft from 'images/icons/arrow-left.svg';
import arrowRight from 'images/icons/arrow-right.svg';
import cross from 'images/icons/cross.svg';
import { isAbsolute } from 'path';

export default class FooterButtons extends React.Component {
  render() {
    console.log('pppp', this.props);
    return (
      <ul className="form-footer-buttons">
        <li>
          <span style={{ backgroundImage: `url(${cross})` }}>Close</span>
        </li>
        <li>
          <span style={{ backgroundImage: `url(${arrowLeft})` }}>Back</span>
        </li>
        <li>
          <span aria-hidden className={`${this.props.isActive ? '' : 'disabled'}`} style={{ backgroundImage: `url(${arrowRight})` }} onClick={(event) => this.props.handleClick(event, this.props.isActive)}>Next</span>
        </li>
      </ul>

    );
  }
}