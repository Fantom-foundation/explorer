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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

export default class Header extends React.Component {
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
                <NavLink href="#"><img src={SettingIcon} alt="Setting" style={{height:'16.6px'}} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"><img src={SettingIcon} alt="Setting" style={{height:'16.6px'}} /></NavLink>
              </NavItem>

            </Nav>
          </Collapse>
          </Container>
        </Navbar>


   
    );
  }
}