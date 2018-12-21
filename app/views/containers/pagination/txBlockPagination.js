import React from 'react';
import { Button } from 'reactstrap';

import iconFirst from './ic-first.svg';
import iconPrev from './ic-prev.svg';
import iconNext from './ic-next.svg';
import iconLast from './ic-last.svg';

export default class TxBlockPagination extends React.PureComponent {
  render() {
    const {
      onChangePage,

      currentPage,
      className,
    } = this.props;

    return (
      <div id="tx-block-pagination" className={className}>
        <div>
          <Button
            style={{ backgroundImage: `url(${iconPrev})` }}
            className="left m"
            onClick={() => onChangePage('prev')}
          >
            Prev
          </Button>
          <Button
            style={{ backgroundImage: `url(${iconNext})` }}
            className="right m"
            onClick={() => onChangePage('next')}
          >
            Next
          </Button>
        </div>
        <div>
          <p> Page {this.props.currentPage + 1}</p>
        </div>
      </div>
    );
  }
}
