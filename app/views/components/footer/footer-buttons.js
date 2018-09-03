

import React from 'react';
import arrowLeft from 'images/icons/arrow-left.svg';
import arrowRight from 'images/icons/arrow-right.svg';
import cross from 'images/icons/cross.svg';

export default class FooterButtons extends React.Component{
    render()
    {
        return (
            <ul className="form-footer-buttons">
            <li>
              <span style={{ backgroundImage: `url(${cross})` }}>Close</span>
            </li>
            <li>
              <span style={{ backgroundImage: `url(${arrowLeft})` }}>Back</span>
            </li>
            <li>
              <span aria-hidden className="disabled" style={{ backgroundImage: `url(${arrowRight})` }} onClick={(event) => this.handleClick(event)}>Next</span>
            </li>
          </ul>

        );
    }
}