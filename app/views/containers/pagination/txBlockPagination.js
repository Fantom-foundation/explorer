import React from 'react';
import { Button } from 'reactstrap';

import iconFirst from './ic-first.svg';
import iconPrev from './ic-prev.svg';
import iconNext from './ic-next.svg';
import iconLast from './ic-last.svg';

export default class TxBlockPagination extends React.PureComponent {
  render() {
    const { onChangePage, isSearching } = this.props;
    if (isSearching) {
      return null;
    }
    return (
      <div id="tx-block-pagination">
        <div>
          {/* <Button style={{backgroundImage:`url(${iconFirst})`}} className="left">First</Button> */}
          <Button
            // disabled={!hasPrevPage}
            style={{ backgroundImage: `url(${iconPrev})` }}
            className="left m"
            onClick={() => onChangePage('prev')}
          >
            Prev
          </Button>
          <Button
            // disabled={!hasNextPage}
            style={{ backgroundImage: `url(${iconNext})` }}
            className="right m"
            onClick={() => onChangePage('next')}
          >
            Next
          </Button>
          {/* <Button style={{backgroundImage:`url(${iconLast})`}} className="right">Last</Button> */}
        </div>
        <div>
          <p>Page 1 of 27335</p>
        </div>
      </div>
    );
  }
}
