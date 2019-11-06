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

import Logo from 'src/assets/images/Logo/main-logo.svg';
import hamburgerBtn from 'src/assets/images/icons/hamburger.svg';
import closeBtn from 'src/assets/images/icons/close.svg';

export default class Navigation extends React.Component<{}, any> { // TODO: Add flow types
    state = {
        isShow: false,
        closing: false,
        windowWidth: 1900,
    };

    toggleNavbar = (e: SyntheticEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();
        this.setState({ closing: true });
        setTimeout(
            () => this.setState((prevState) => ({
                isShow: !prevState.isShow,
                closing: false,
            })),
            400
        );
    };

    // ** TODO: refactor to redux-resize or redux-responsive

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.setState({
            windowWidth: window.innerWidth,
        });
    }

    // ** --------------------------------------------------

    render() {
        const {
            isShow,
            closing,
            windowWidth,
        } = this.state;

        return (
            <Navbar dark expand="md">
                <NavbarBrand tag={RouterNavLink} to="/">
                    <img alt="Fantom explorer" className="logo" src={Logo} />
                </NavbarBrand>

                <button
                    className="btn open"
                    style={{ backgroundImage: `url(${hamburgerBtn})` }}
                    onClick={this.toggleNavbar}
                />
                {isShow && (
                    <button
                        className={`btn close ${closing ? 'dim' : ''}`}
                        style={{ backgroundImage: `url(${closeBtn})` }}
                        onClick={this.toggleNavbar}
                    />
                )}
                {windowWidth >= 768 || isShow ? (
                    <Collapse className={closing ? 'closing' : ''} navbar >
                        <div className="overlay" onClick={this.toggleNavbar} />
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
}
