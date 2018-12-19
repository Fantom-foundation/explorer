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
        <div className="pt-3">
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
        </div>
        {/* <Col xs={12} className="line">
          <hr />
        </Col>
        <Col xs={12} md={6} className="graph-info">
          <Row className="title-info">
            <Col
              className="icon"
              style={{ backgroundImage: `url(${logoIcon})` }}
            >
              <Title h2 className="mb-0 text-white text-uppercase">
                Market Cap Of $28.956 Billion
              </Title>
              <Title h2 className="mb-0 text-white">
                $285.47 @ 0.04267 FTM/ETH 1.13%
              </Title>
            </Col>
          </Row>
          <div className="result-info top">
            <div className="left">
              <Title h2 className="text-white text-uppercase mb-0">
                Last Block
              </Title>
              <p>6192596 (14.2s)</p>
            </div>


            <div className="text-right right">
              <Title h2 className="text-white text-uppercase mb-0">
                Transactions
              </Title>
              <p>296.24 M (7.9 TPS)</p>
            </div>
          </div>
          <hr />
          <div className="result-info bottom">
            <div className="left">
              <Title h2 className="text-uppercase mb-0">
                Hash Rate
              </Title>
              <p>286,235.71 GH/s</p>
            </div>
            <div className="middle">
              <Title h2 className="text-uppercase mb-0">
                Your Balance
              </Title>
              <p>149.00FTM</p>
            </div>
            <div className="text-right right">
              <Title h2 className="text-uppercase mb-0">
                Network Difficulty
              </Title>
              <p>3,583.35 TH</p>
            </div>
          </div>
        </Col> */}
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
