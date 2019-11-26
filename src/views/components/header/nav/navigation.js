// @flow

import * as React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import { WindowSize } from 'src/views/components/PageSizeWatcher';

import Logo from 'src/assets/images/Logo/main-logo.svg';
import hamburgerBtn from 'src/assets/images/icons/hamburger.svg';
import closeBtn from 'src/assets/images/icons/close.svg';

function Navigation () {
    const windowWidth = React.useContext(WindowSize);
    const [state, setState] = React.useState({ isShow: false, closing: false });
    const toggleNavbar = React.useCallback((e: SyntheticEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, closing: true }));
        setTimeout(
            () => setState((prevState) => ({
                ...prevState,
                isShow :!prevState.isShow,
                closing: false,
            })),
            400,
        )
    }, []);

    const {
        isShow,
        closing,
    } = state;

    return (
        <Navbar dark expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">
                <img alt="Fantom explorer" className="logo" src={Logo} />
            </NavbarBrand>

            <button
                className="btn open"
                style={{ backgroundImage: `url(${hamburgerBtn})` }}
                onClick={toggleNavbar}
            />
            {isShow && (
                <button
                    className={`btn close ${closing ? 'dim' : ''}`}
                    style={{ backgroundImage: `url(${closeBtn})` }}
                    onClick={toggleNavbar}
                />
            )}
            {windowWidth >= 768 || isShow ? (
                <Collapse className={closing ? 'closing' : ''} navbar >
                    <div className="overlay" onClick={toggleNavbar} />
                    <Nav className="ml-auto" navbar >
                        <NavItem>
                            <NavLink exact tag={RouterNavLink} to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/blocks">
                                Blocks
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/transactions">
                                Transactions
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/resources">
                                Resources
                            </NavLink>
                        </NavItem>
                    </Nav>

                </Collapse>
            ) : null}
        </Navbar>
    );
}

export default Navigation;
