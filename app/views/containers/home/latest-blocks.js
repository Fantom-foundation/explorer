import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Title } from 'views/components/coreComponent/index';
import TitleIcon from '../../../images/icons/latest-blocks.svg';
import blockIcon from '../../../images/icons/block.svg';
import moment from 'moment';

/**
 * @method onBlockClick() :  Function to show block details
 * @param {object} data : Block detail object
 */
function onBlockClick(props, data) {
  console.log('Data****', data);
  props.history.push({
    pathname: `/blocks/${data.height}`,
    state: { data, type: 'block' },
  });
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
        <Link to="/blocks" className="btn">
          View all
        </Link>
      </div>
      <Row className="blocks">
        {blocks &&
          blocks.length &&
          blocks.map((data, index) => (
            <Col
              key={index}
              xs={12}
              className="details"
              onClick={() => onBlockClick(props, data)}
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
                <p className="time-date text-white">
                  {moment(new Date(data.createdTime * 1000)).fromNow()}
                </p>
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
