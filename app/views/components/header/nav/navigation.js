import React from 'react';
import { isUserLoggedIn } from 'common/utility';
import Logo from 'images/logo/logo.png';
import Login from 'views/containers/login/index';
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
    this.state = {
      isOpen: false,
      isLoggedIn: false,
      modal: false,
    };
    //this.toggleModal = this.toggleModal.bind(this);
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
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/"><img className="logo" src={Logo} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/blocks">Blocks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/transactions">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/address">Addresses</NavLink>
              </NavItem>
              <NavItem>
              {isLoggedIn ? <NavLink onClick={(event) => this.logout(event)}>Logout</NavLink> : <NavLink onClick={(event) => this.toggleModal(event, this.state.modal)}>Login</NavLink> }
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

