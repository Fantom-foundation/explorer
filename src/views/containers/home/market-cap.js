import React from 'react';
import { Row, Col, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Title } from 'src/views/components/coreComponent/index';
import { setRealtimeUpdateDetails } from 'src/storage/actions/realtimeBlockchainUpdate';
import { getRealtimeUpdateDetails } from 'src/storage/selectors/realtimeBlockchainUpdate';

const tooltipEnabledText = 'Realtime Updates Enabled, Click to Disable';
const tooltipDisabledText = 'Realtime Updates Disabled, Click to Enable';

class MarketCap extends React.Component {
  constructor(props) {
    super(props);

    const { realtimeUpdate } = this.props;
    const { isRealtimeUpdate } = realtimeUpdate;
    this.realtimeUpdateInterval = null;

    let tooltipText = tooltipDisabledText;

    this.toggle = this.toggle.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);

    if (isRealtimeUpdate) {
      tooltipText = tooltipEnabledText;
    } else {
      // clearInterval(this.realtimeUpdateInterval);
    }

    this.state = {
      isOpenTooltip: false,
      tooltipText,
    };
  }

  /**
   * @method toggle : To toggle realtime update setting.
   */
  toggle() {
    const {
      // eslint-disable-next-line no-shadow
      setRealtimeUpdateDetails,
      realtimeUpdate,
    } = this.props;

    const { isRealtimeUpdate } = realtimeUpdate;
    if (!isRealtimeUpdate) {
      if (setRealtimeUpdateDetails) {
        setRealtimeUpdateDetails({ isRealtimeUpdate: true });
        this.setState({
          tooltipText: tooltipEnabledText,
        });
      }
    } else {
      if (setRealtimeUpdateDetails) {
        setRealtimeUpdateDetails({ isRealtimeUpdate: false });
        this.setState({
          tooltipText: tooltipDisabledText,
        });
      }
      // clearInterval(this.realtimeUpdateInterval);
    }
  }

  /**
   * @method toggleTooltip  : To toggle tooltip view.
   */

  toggleTooltip() {
    const { isOpenTooltip } = this.state;
    this.setState({
      isOpenTooltip: !isOpenTooltip,
    });
  }

  render() {
    const { realtimeUpdate } = this.props;
    const { isRealtimeUpdate } = realtimeUpdate;
    const { isOpenTooltip, tooltipText } = this.state;
    return (
      <Row className="market-cap">
        <div className="discription">
          <Title h2 className="text-white mb-0">
            Beyond
          </Title>
          <Title h2 className="text-white">
            Blockchain
          </Title>
          <p className="mb-0">The Future of Decentralized Ecosystem</p>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = createSelector(
  getRealtimeUpdateDetails(),
  (realtimeUpdate) => ({ realtimeUpdate })
);

const mapDispatchToProps = (dispatch) => ({
  setRealtimeUpdateDetails: (isRealtimeUpdate) =>
    dispatch(setRealtimeUpdateDetails(isRealtimeUpdate)),
});

MarketCap.propTypes = {
  setRealtimeUpdateDetails: PropTypes.func,
  realtimeUpdate: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketCap);
