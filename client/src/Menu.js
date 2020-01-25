import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container, Col } from 'react-bootstrap';

import Icon from 'react-icons-kit';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_schedule } from 'react-icons-kit/md/ic_schedule';

import { Link } from 'react-router-dom';

import Animate from 'react-smooth';

import Hamburger from './Hamburger';

import './navbar.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      asideOpen: false,
      widthSideMenu: 300,
      widthAside: 300,
      menuMouseOver: true,
    };
    this.toggleOpenMenu  = this.toggleOpenMenu.bind(this);
    this.toggleOpenAside = this.toggleOpenAside.bind(this);
    this.clickLink       = this.clickLink.bind(this);
    this.menuMouseOut    = this.menuMouseOut.bind(this);
    this.menuMouseOver   = this.menuMouseOver.bind(this);
    this.sideMenu        = React.createRef();
    this.aside           = React.createRef();
  }

  toggleOpenMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  toggleOpenAside() {
    this.setState({ asideOpen: !this.state.asideOpen });
  }

  clickLink() {
    this.setState({ menuOpen: false });
  }

  componentDidMount() {
    this.setState({ widthSideMenu: this.sideMenu.clientWidth });
  }

  menuMouseOut() {
    this.setState({ menuMouseOver: false });
    if(this.state.menuOpen) {
      setTimeout(() => {
        if (!this.state.menuMouseOver) {
          this.setState({ menuOpen: false });
        }
      }, 5000);
    }
  }

  menuMouseOver() {
    this.setState({ menuMouseOver: true });
  }

  render() {
    const sideMenuItem = [
      {
        url: '/sch',
        text: 'Расписание',
        icon: ic_schedule,
      },
    ];
    const topMenuItem = [
      {
        url: '/',
        text: 'Главное',
        icon: ic_home,
      },
    ];
    const widthSideMenu    = this.state.widthSideMenu;
    const widthAside = this.state.widthAside;
    const endPosSideMenu   = this.state.menuOpen ? 0 : -1 * widthSideMenu;
    const startPosSideMenu = this.state.menuOpen ? widthSideMenu : 0;
    const endPosSideAside   = this.state.menuOpen ? 0 : -1 * widthAside;
    const startPosSideAside = this.state.menuOpen ? widthAside : 0;
    return (
      <div
        onMouseOver={this.menuMouseOver}
        onFocus={this.menuMouseOver}
        onMouseOut={this.menuMouseOut}
        onBlur={this.menuMouseOut}
        className="main-menu bg-light sticky-top"
      >
        <Container className="shadow" fluid>
          <Navbar bg="light" sticky="top">
            <Hamburger type="spin" onClick={this.toggleOpenMenu} active={this.state.menuOpen} />
            <Navbar.Brand href="/">Simplepkgh</Navbar.Brand>
            <Nav className="mr-auto">
              {
                topMenuItem.map((el) => (
                  <Nav.Item>
                    <Link onClick={this.clickLink} className="nav-link" to={el.url}>
                      <Icon className="mx-1" size={26} icon={el.icon} />
                      {el.text}
                    </Link>
                  </Nav.Item>
                ))
              }
            </Nav>
            <Nav>
              <Hamburger type="spin-r" onClick={this.toggleOpenAside} active={this.state.menuOpen} />
            </Nav>
          </Navbar>
        </Container>
        <Animate duration={150} from={{ left: startPosSideMenu }} to={{ left: endPosSideMenu }}>
          {
            ({ left }) => (
              <Navbar
                bg="light"
                ref={(el) => {this.sideMenu = el}}
                style={{ left }}
                className={`align-items-start justify-content-start flex-column position-absolute ${this.state.menuOpen ? 'shadow-lg' : ''}`}
              >
                <Nav>
                  {
                    sideMenuItem.map((el) => (
                      <Nav.Item>
                        <Link onClick={this.clickLink} className="nav-link" to={el.url}>
                          <Icon className="mx-1" size={24} icon={el.icon} />
                          {el.text}
                        </Link>
                      </Nav.Item>
                    ))
                  }
                </Nav>
              </Navbar>
            )
          }
        </Animate>
        <Animate duration={150} from={{ right: startPosSideAside }} to={{ right: endPosSideAside }}>
          {
            ({ right }) => (
              <aside
                bg="light"
                ref={(el) => {this.aside = el}}
                style={{ right }}
                className={`align-items-start justify-content-start flex-column position-absolute ${this.state.menuOpen ? 'shadow-lg' : ''}`}
              >
                <div>
                  { }
                </div>
              </aside>
            )
          }
        </Animate>

      </div>
    );
  }
}

export default Menu;
