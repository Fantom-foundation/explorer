// @flow

import * as React from 'react';

function Loader() {
    return (
        <div className="loader">
            <div className="holder">
                <div className="lds-ellipsis">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
}

export default Loader;
