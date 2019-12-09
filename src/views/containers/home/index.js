// @flow

import * as React from 'react';
import { Container } from 'reactstrap';

import SearchBlock from 'src/views/containers/home/SearchBlock';
import ExplorerDetails from 'src/views/containers/home/ExplorerDetails';

function HomePage() {
    return (
        <div className="home-wrapper">
            <div className="home-content-wrapper">
                <SearchBlock />
                <ExplorerDetails />
            </div>
        </div>
    );
}

export default HomePage;
