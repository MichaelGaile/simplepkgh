import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';

import Icon from 'react-icons-kit';
import { ic_home } from 'react-icons-kit/md/ic_home';
import { ic_schedule } from 'react-icons-kit/md/ic_schedule';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Home from './Home';
import Schedule from './Schedule';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItem: [{
        url: '/',
        text: 'Главное',
        icon: ic_home,
      }, {
        url: '/sch',
        text: 'Расписание',
        icon: ic_schedule,
      }],
    };
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <Router>
          <Navbar sticky="top">
            <Navbar.Brand href="/">Simplepkgh</Navbar.Brand>
            <Navbar.Toggle />
            <Nav>
              {
                this.state.menuItem.map((el) => (
                  <Nav.Item>
                    <Link className="nav-link" to={el.url}>
                      <Icon size={26} icon={el.icon} />
                      {el.text}
                    </Link>
                  </Nav.Item>
                ))
              }
            </Nav>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/sch">
              <Schedule />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Menu;
