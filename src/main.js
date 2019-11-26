// @flow

import React from 'react';

import Routes from 'src/routes';
import Header from 'src/views/components/header/header';
import Footer from 'src/views/components/footer/footer';

function Main() {
    return (
        <div className="app-container">
            <Header />
            <main>
                <Routes />
            </main>
            <Footer />
        </div>
    );
}

export default Main;
