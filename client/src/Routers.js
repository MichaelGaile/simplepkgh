import React, { Component } from 'react';

import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Home from './Home';
import Schedule from './Schedule';

class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const call = null;
    const asideContent = null;
    const itemTopMenu = [
      {
        url: '/',
        text: 'Главная',
        icon: home,
      },
    ];

    const itemSideMenu = [
      {
        url: '/sch/',
        text: 'Расписание',
        icon: calendar,
      },
    ];

    return (
      <Container style={{ maxWidth: 2048 }}>
        <Router>
          {
            // Main menu
          }
          <Navbar bg="light" sticky="top" className="mb-3 shadow">
            <Nav>
              { itemTopMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
            </Nav>
          </Navbar>

          <Row>
            <Col bg="light" xs={2} className="h-100">
              {
                // Side menu
              }
              <Navbar bg="light">
                <Nav className="flex-column">
                  { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                  { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                  { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                </Nav>
              </Navbar>
            </Col>

            <Col xs={7}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/sch">
                  <Schedule />
                </Route>
              </Switch>
            </Col>

            <Col xs={2}>
              {
                // Aside
              }
              <aside>
                { call }
                <Nav>
                </Nav>
                { asideContent }
              </aside>
            </Col>
          </Row>
        </Router>
      </Container>
    );
  }
}

export default Routers;
