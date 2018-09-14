import React from 'react';
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

    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
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
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>



    );
  }
}