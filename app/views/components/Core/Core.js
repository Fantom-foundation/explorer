import React from 'react';
import refreshImage from '../../../images/icons/refresh.svg';
export const Progress = (props) => {
    let barWidth = 0;
    if (props.type === 'theme-blue') { barWidth = props.value + '%'; }
    if (props.type === 'theme-red-Yellow-green') {
        barWidth = 100 - props.value;
        barWidth = barWidth + '%';
    }
    return (
        <div className={`cs-progress ${props.className} ${props.type}`}>
            <div className="bar" style={{ width: barWidth, }} ></div>
        </div>
    );
}

export const Refresh = (props) => {
return(
    <div className={props.className}>
        <img src={refreshImage} className={`${props.animated &&  'rotation anti-clock'}`} />
    </div>
);
}