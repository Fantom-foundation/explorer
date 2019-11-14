// @flow

import * as React from 'react';
import { Tooltip } from 'reactstrap';
import ToggleButton from 'react-toggle-button';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { setRealtimeUpdateDetails } from 'src/storage/actions/realtimeBlockchainUpdate';
import { getRealtimeUpdateDetails } from 'src/storage/selectors/realtimeBlockchainUpdate';

const tooltipEnabledText = 'Realtime Updates Enabled, Click to Disable';
const tooltipDisabledText = 'Realtime Updates Disabled, Click to Enable';

const toggleButtonProps = {
    containerStyle: {
        width: 'auto',
    },
    colors: {
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
    },
    trackStyle: {
        width: '25px',
        height: '7px',
        backgroundColor: 'rgba(0, 177, 255, 0.5)',
    },
    thumbStyle: { width: '15px', height: '15px' },
    activeThumbStyle: { left: '15px' },
    thumbAnimateRange: [0, 10],
    animateThumbStyleHover: function animateThumbStyleHover(n) {
        return {
            boxShadow: `0 0 ${2 + 4 * n}px rgba(0,0,0,.16),0 ${2 +
            3 * n}px ${4 + 8 * n}px rgba(0,0,0,.32)`,
        };
    },
};

type ToggleToolTipProps = {
    realtimeUpdate: {
        isRealtimeUpdate: boolean,
    },
    handleRealTimeUpdate: () => void,
    setRealtimeUpdateDetails: ({ isRealtimeUpdate: boolean }) => void,
};

class ToggleToolTip extends React.Component<ToggleToolTipProps, {| isOpenTooltip: boolean |}> {
    constructor(props: ToggleToolTipProps) {
        super(props);

        const {
            realtimeUpdate: { isRealtimeUpdate }
        } = this.props;

        if (isRealtimeUpdate) {
            this.handleRealTimeUpdate();
        } else {
            clearInterval(this.realtimeUpdateInterval);
        }

        this.state = {
            isOpenTooltip: false,
        };
    }

    realtimeUpdateInterval: ?IntervalID = null

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
    toggle = () => {
        const {
            setRealtimeUpdateDetails,
            realtimeUpdate: { isRealtimeUpdate },
        } = this.props;

        if (!isRealtimeUpdate) {
            this.handleRealTimeUpdate();

            if (setRealtimeUpdateDetails) {
                setRealtimeUpdateDetails({ isRealtimeUpdate: true });
            }
        } else {
            if (setRealtimeUpdateDetails) {
                setRealtimeUpdateDetails({ isRealtimeUpdate: false });
            }

            clearInterval(this.realtimeUpdateInterval);
        }
    }

    /**
     * @method toggleTooltip  : To toggle tooltip view.
     */

    toggleTooltip = () => {
        this.setState((prevState) => ({
            isOpenTooltip: !prevState.isOpenTooltip,
        }));
    }

    render() {
        const {
            realtimeUpdate: {
                isRealtimeUpdate,
            }
        } = this.props;
        const { isOpenTooltip } = this.state;

        return (
            <React.Fragment>
                <div className="toggle-tooltip">
                    <span id="toggle-tooltip">
                        <ToggleButton
                            value={isRealtimeUpdate}
                            onToggle={this.toggle}
                            inactiveLabel={''}
                            activeLabel={''}
                            {...toggleButtonProps}
                        />
                    </span>
                </div>
                <Tooltip
                    placement="top-end"
                    isOpen={isOpenTooltip}
                    target="toggle-tooltip"
                    toggle={this.toggleTooltip}
                >
                    {isRealtimeUpdate ? tooltipEnabledText : tooltipDisabledText}
                </Tooltip>
            </React.Fragment>
        );
    }
}

const mapStateToProps = createSelector(
    getRealtimeUpdateDetails(),
    (realtimeUpdate) => ({ realtimeUpdate })
);

const mapDispatchToProps = {
    setRealtimeUpdateDetails,
};

export default connect<ToggleToolTipProps, {||}, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps
)(ToggleToolTip);
