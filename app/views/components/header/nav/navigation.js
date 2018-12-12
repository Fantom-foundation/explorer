import React from 'react';
import { isUserLoggedIn } from 'common/utility';
import Logo from 'images/Logo/main-logo.svg';
import Login from 'views/containers/login/index';
import SettingIcon from 'images/icons/setting.svg';
import { NavLink as RouterNavLink } from 'react-router-dom';
import avatar from 'images/icons/avatar.svg';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoggedIn: false,
      modal: false,
    };
    // this.toggleModal = this.toggleModal.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  toggleModal = (event, modal) => {
    event.preventDefault();
    this.setState({
      modal: !modal,
    });
  }
  logout = (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', false);
    this.props.history.push('/');
  };
  render() {
    const isLoggedIn = isUserLoggedIn();
    if (this.state.modal) {
      return <Login toggleModal={this.toggleModal} modal={this.state.modal} />;
    }
    return (
      <Container>
      <Navbar  dark expand="md">
    
          <NavbarBrand tag={RouterNavLink} to="/"><img className="logo" src={Logo} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink exact tag={RouterNavLink} to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/blocks">Blocks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/transactions">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/address">Addresses</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  More
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <img src={avatar} />
              </NavItem>
              {/* <NavItem>
              {isLoggedIn ? <NavLink onClick={(event) => this.logout(event)}>Logout</NavLink> : <NavLink onClick={(event) => this.toggleModal(event, this.state.modal)}>Login</NavLink> }
              </NavItem> */}
            </Nav>
            
          </Collapse>
      </Navbar>
      </Container>
    );
  }
}

