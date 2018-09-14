import React from 'react';
import { isUserLoggedIn } from 'common/utility';
import Logo from 'images/logo/logo.png';
import SettingIcon from 'images/icons/setting.svg';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLoggedIn: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  logout = () => {
    localStorage.setItem('isLoggedIn', false);
    this.props.history.push('/');
  };
  render() {
    const isLoggedIn = isUserLoggedIn();
    return (
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/"><img className="logo" src={Logo} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Blocks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Addresses</NavLink>
              </NavItem>
              <NavItem>
                {isLoggedIn ? <NavLink onClick={(event) => this.logout(event)}>Logout</NavLink> : <NavLink href="/login">Login</NavLink> }
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
