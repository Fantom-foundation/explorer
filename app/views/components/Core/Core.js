import React from 'react';
import { callbackify } from 'util';
export const Progress = (props) => {
    let barWidth = 0;
    if(props.type === 'theme-blue'){ barWidth=props.value + '%'; }
    if(props.type === 'theme-red-Yellow-green')
    {
        //  barWidth = `calc(100% - ${(props.value + '%')} )` 
        barWidth=100 - props.value;
        barWidth=barWidth + '%';
    }
    return(
        <div className={`cs-progress ${props.className} ${props.type}`}>
        {/* {props.type === 'theme-blue' && <div className="bar"></div>}
        {props.type === 'theme-red-Yellow-green' && <div className="bar"></div>} */}
            <div className="bar"
            
          style={{
                width: barWidth,
            }}

            ></div>
        
        </div>
    );
}