import React from 'react';
import Aux from '../hoc/aux';
export const Title = (props) => {
    if (!props) {
        return null;
    }

    return (
        <Aux>
            {props.h1 && <h1 className={`title ${props.className}`} style={props.style}><span>{props.children}</span></h1>}
            {props.h2 && <h2 className={`title ${props.className}`} style={props.style}><span>{props.children}</span></h2>}
            {props.h3 && <h3 className={`title ${props.className}`} style={props.style}><span>{props.children}</span></h3>}
            {props.h4 && <h4 className={`title ${props.className}`} style={props.style}><span>{props.children}</span></h4>}
            {props.h5 && <h5 className={`title ${props.className}`} style={props.style}><span>{props.children}</span></h5>}
            {props.h6 && <h6 className={`title ${props.className}`} style={props.style}><span>{props.children}</span></h6>}
            {props.p  && <p className={`title ${props.className}`} style={props.style}><span>{props.children}</span></p>}
        </Aux>
    );
};
