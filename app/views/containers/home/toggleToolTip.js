import React from 'react';
import { Row, Col, Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import logoIcon from 'images/Logo/Fantom-Logo-icon.svg';
import { Title } from 'views/components/coreComponent/index';
import { setRealtimeUpdateDetails } from 'views/controllers/realtime-blockchain-update/action';
import { getRealtimeUpdateDetails } from 'views/controllers/realtime-blockchain-update/selector';

const tooltipEnabledText = 'Realtime Updates Enabled, Click to Disable';
const tooltipDisabledText = 'Realtime Updates Disabled, Click to Enable';

class ToggleToolTip extends React.Component {
  constructor(props) {
    super(props);

    const { realtimeUpdate } = this.props;
    const { isRealtimeUpdate } = realtimeUpdate;
    this.realtimeUpdateInterval = null;

    let tooltipText = tooltipDisabledText;

    this.toggle = this.toggle.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);

    if (isRealtimeUpdate) {
      this.handleRealTimeUpdate();
      tooltipText = tooltipEnabledText;
    } else {
      clearInterval(this.realtimeUpdateInterval);
    }

    this.state = {
      isOpenTooltip: false,
      tooltipText,
    };
  }

  /**
   * @method handleRealTimeUpdate  : To fetch real time updates of blockchain if realtime updataion is enabled.
   */
  handleRealTimeUpdate() {
    const { handleRealTimeUpdate } = this.props;
    if (handleRealTimeUpdate) {
      this.realtimeUpdateInterval = setInterval(() => {
        handleRealTimeUpdate();
      }, 4000);
    } else {
      clearInterval(this.realtimeUpdateInterval);
    }
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
      this.handleRealTimeUpdate();
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
      clearInterval(this.realtimeUpdateInterval);
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
      <React.Fragment>
        <div id="toggle_tooltip">
            <ToggleButton
              value={isRealtimeUpdate}
              onToggle={this.toggle}
              inactiveLabel={''}
              activeLabel={''}
              colors={{
                activeThumb: {
                  base: '#00b1ff',
                },
                inactiveThumb: {
                  base: '#7da5b7',
                },
                active: {
                  base: '#04759f',
                  hover: '#04759f',
                },
                inactive: {
                  base: '#045877',
                  hover: '#045877',
                },
              }}
              trackStyle={{
                width: '25px',
                height: '7px',
                backgroundColor: 'rgba(0, 177, 255, 0.5)',
              }}
              thumbStyle={{ width: '15px', height: '15px' }}
              activeThumbStyle={{ left: '15px' }}
              thumbAnimateRange={[0, 10]}
              // thumbStyleHover={styles.thumbStyleHover}
              animateThumbStyleHover={(n) => ({
                boxShadow: `0 0 ${2 + 4 * n}px rgba(0,0,0,.16),0 ${2 +
                  3 * n}px ${4 + 8 * n}px rgba(0,0,0,.32)`,
              })}
            />
          </div>
          <Tooltip
            placement={'top-end'}
            isOpen={isOpenTooltip}
            target="toggle_tooltip"
            toggle={this.toggleTooltip}
          >
            {tooltipText}
          </Tooltip>
      </React.Fragment>
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

ToggleToolTip.propTypes = {
  handleRealTimeUpdate: PropTypes.func,
  setRealtimeUpdateDetails: PropTypes.func,
  realtimeUpdate: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleToolTip);
