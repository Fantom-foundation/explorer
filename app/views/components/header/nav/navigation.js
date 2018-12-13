import React from 'react';
import { isUserLoggedIn } from 'common/utility';
import Logo from 'images/Logo/main-logo.svg';
import Login from 'views/containers/login/index';
import SettingIcon from 'images/icons/setting.svg';
import { NavLink as RouterNavLink } from 'react-router-dom';
import avatar from 'images/icons/avatar.svg';
import hamburgerBtn from "images/icons/hamburger.svg";
import closeBtn from "images/icons/close.svg";
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
      isShow: false,
      closing: false,
      windowWidth: 1900,
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
  toggleNavbar = (e) => {
    e.preventDefault();
    this.setState({closing:true})
    setTimeout(()=>this.setState({ isShow: !this.state.isShow,closing:false }),400)
  }



  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }


  handleResize = () => this.setState({
    windowWidth: window.innerWidth,
  });


  render() {
    const isLoggedIn = isUserLoggedIn();
    const { isShow,closing, windowWidth } = this.state;
    if (this.state.modal) {
      return <Login toggleModal={this.toggleModal} modal={this.state.modal} />;
    }
    return (
      <Container>
      <Navbar  dark expand="md">
    
          <NavbarBrand tag={RouterNavLink} to="/"><img className="logo" src={Logo} /></NavbarBrand>
          {/* <NavbarToggler onClick={this.toggle} /> */}
          <button className="btn open" style={{backgroundImage:`url(${hamburgerBtn})`}} onClick={this.toggleNavbar} ></button>
          {isShow && <button className={`btn close ${closing && 'dim' }`} style={{backgroundImage:`url(${closeBtn})`}} onClick={this.toggleNavbar} ></button>}
        {windowWidth >= 768 || isShow ? <Collapse className={closing ? 'closing':''}  navbar>
       <div className="overlay"  onClick={this.toggleNavbar} />
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
              <NavItem>
                <NavLink tag={RouterNavLink} to="/resources">Resources</NavLink>
              </NavItem>
             
            </Nav>
          </Collapse>:null}
      </Navbar>
      </Container>
    );
  }
}

