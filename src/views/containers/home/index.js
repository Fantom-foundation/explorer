// @flow

import * as React from 'react';
import { Container } from 'reactstrap';

import ToggleToolTip from 'src/views/containers/home/ToggleToolTip';
import Intro from 'src/views/containers/home/Intro';
import LatestBlocksDataContainer from 'src/views/containers/home/LatestBlocksDataContainer';

function HomePage() {
    return (
        <div>
            <Intro />
            <section>
                <Container>
                    <hr />
                    <ToggleToolTip />
                </Container>
            </section>
            <LatestBlocksDataContainer />
        </div>
    );
}

export default HomePage;
