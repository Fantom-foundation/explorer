import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
// import moment from 'moment';
import { Title } from 'views/components/coreComponent/index';
import TitleIcon from '../../../images/icons/latest-blocks.svg';
import blockIcon from '../../../images/icons/block.svg';

function onBlockClick(dataHash) {
  console.log('onBlockClick', dataHash);
}
/**
 * @method LatestBlocks : To display list of latest blocks of transactions.
 * @param {array} latestBlocksArr : List of latest blocks.
 */
export default function LatestBlocks(props) {
  const blocks = props.latestBlocksArr;
  return (
    <Col xs={12} md={6} className="right">
      <div className="header">
        <Title
          h2
          className="text-uppercase l-b"
          style={{ backgroundImage: `url(${TitleIcon})` }}
        >
          Latest Blocks
        </Title>
        <a href="/blocks" className="btn">
          View all
        </a>
      </div>
      <Row className="blocks">
        {blocks &&
          blocks.length &&
          blocks.map((data, index) => (
            <Col
              key={index}
              xs={12}
              className="details"
              onClick={() => onBlockClick(data.hash)}
            >
              {/* <p className="text-white"><img src={blockIcon} className="block-icon" />{data.block_number}</p> */}
              <p
                className="text-white ico"
                style={{ backgroundImage: `url(${blockIcon})` }}
              >
                {data.height}
              </p>

              <p className="text-ellipsis">
                <span className="text-white">Hash</span>
                &nbsp;
                <span className="text-primary hash-value">{data.hash}</span>
              </p>
              <p className="text-ellipsis">
                <span className="text-white">Round</span>
                &nbsp;
                <span className="text-primary">{data.round}</span>
              </p>
              <div className="ammount-date">
                <p className="mb-0">
                  <span className="text-white">Txns</span>
                  &nbsp;
                  <span className="text-primary">{data.transactionLength}</span>
                </p>
                {/* <p className="time-date text-white">
                    {moment(parseInt(data.timestamp, 10)).fromNow()}
                  </p> */}
              </div>
            </Col>
          ))}
      </Row>
    </Col>
  );
}

LatestBlocks.propTypes = {
  latestBlocksArr: PropTypes.array,
};
