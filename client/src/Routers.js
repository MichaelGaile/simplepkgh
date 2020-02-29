import React, { Component } from 'react';

import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ArrowAlt, Slider } from 'react-burgers';

import { motion } from 'framer-motion';

import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Side from './components/Side';
import Home from './Home';
import Schedule from './Schedule';

class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSideMenu: false,
      openAside: false,
    };

    this.toggleAside = this.toggleAside.bind(this);
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  toggleSideMenu() {
    const { openSideMenu } = this.state;
    this.setState({ openSideMenu: !openSideMenu });
  }

  toggleAside() {
    const { openAside } = this.state;
    this.setState({ openAside: !openAside });
  }

  render() {
    const { openSideMenu, openAside } = this.state;

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
      {
        url: '/favorites/',
        text: 'Избранные группы',
        icon: calendar,
      },
      {
        url: '/chess/',
        text: 'Шахматка',
        icon: calendar,
      },
      {
        url: '/files/',
        text: 'Файлы',
        icon: calendar,
      },
      {
        url: '/att/',
        text: 'Посещаймость',
        icon: calendar,
      },
      {
        url: '/libr/',
        text: 'Библеотека',
        icon: calendar,
      },
    ];

    // width main col
    const lgColMain = (openSideMenu || openAside) ? 7 : 12;
    const openSide = (openSideMenu || openAside);

    // Animate item on Nav
    const animateItemSide = {
      open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      },
      closed: {
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      },
    };

    return (
      <Container className="fluid-lg">
        <Router>
          {
            // Main menu
          }
          <Navbar id="top" bg="light" sticky="top" className="mb-3 shadow">
            <ArrowAlt borderRadius={3} active={openSideMenu} onClick={this.toggleSideMenu} color={openSideMenu ? 'darkred' : '#000'} className="mx-2" />
            <Nav className="mx-auto w-100">
              { itemTopMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
            </Nav>
            <Slider borderRadius={3} active={openAside} onClick={this.toggleAside} color={openAside ? 'darkred' : '#000'} className="mx-2" />
          </Navbar>

          <Row>
            {
              // Side menu
            }
            <Side top="#top" bottom="#bottom" fixed className="col-lg-2" turn="left" active={openSideMenu}>
              <Navbar bg="light">
                <Nav className="flex-column">
                  { itemSideMenu.map((el) => (
                    <motion.li
                      variants={animateItemSide}
                    >
                      <Link className="nav-link" to={el.url}>{el.text}</Link>
                    </motion.li>
                  )) }
                </Nav>
              </Navbar>
            </Side>

            {
              // Main content
            }
            <Col lg={{ span: lgColMain, offset: openSide ? 0 : 0 }}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/sch">
                  <Schedule />
                </Route>
              </Switch>
            </Col>

            {
              // Aside
            }
            <Side top="#top" bottom="#bottom" fixed className="h-100 col-lg-2" active={openAside} turn="right">
              <aside>
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                asdasdasdasdsadsaasad
                { call }
                { asideContent }
              </aside>
            </Side>
          </Row>
          <Col>
            <footer id="bottom">
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
              <p>Footer</p>
            </footer>
          </Col>
        </Router>
      </Container>
    );
  }
}

export default Routers;
