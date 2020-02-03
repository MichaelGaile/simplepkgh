import React, { Component } from 'react';

import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ArrowAlt, Collapse } from 'react-burgers';

import Animate from 'react-smooth';

import { Icon } from 'react-icons-kit';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { home } from 'react-icons-kit/icomoon/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './style/sideContent.scss';

import Home from './Home';
import Schedule from './Schedule';

class SideContent extends Component {
  constructor(props) {
    super(props);
    const { active } = this.props;
    this.state = {
      active: !!active,
    };
    this.endAnimation = this.endAnimation.bind(this);
  }

  endAnimation() {
    this.setState({ position: 'absolute' });
  }
  render() {
    const { children, className } = this.props;
    const { active } = this.state;

    const style = this.props.style ? this.props.style : {};

    // Default turn and attr name LEFT
    const turn = this.props.turn ? this.props.turn : 'left';
    const valTurn = turn ? 1 : -1;

    style.position = active ? 'fixed' : 'relative';

    const startPoint = active ? valTurn * 1000 : 0;
    const endPoint = active ? 0 : valTurn * 1000;

    return (
      <Animate from={startPoint} to={endPoint} attributeName={turn} onAnimationEnd={this.endAnimation}>
        <div style={style} className={className}>{children}</div>
      </Animate>
    );
  }
}
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
    ];

    return (
      <Container fluid="lg">
        <Router>
          {
            // Main menu
          }
          <Navbar bg="light" sticky="top" className="mb-3 shadow">
            <ArrowAlt active={openSideMenu} onClick={this.toggleSideMenu} color={openSideMenu ? 'darkred' : '#000' } className="mx-2" />
            <Nav className="mx-auto w-100">
              { itemTopMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
            </Nav>
            <Collapse active={openAside} onClick={this.toggleAside} color={openSideMenu ? 'darkred' : '#000'} className="mx-2" />
          </Navbar>

          <Row>
            <Animate from={startPointSideMenu} to={endPointSideMenu} attributeName="left">
              {
                // Side menu
              }
              <Col bg="light" lg={2} className="h-100">
                <Navbar bg="light" className="sideContent">
                  <Nav className="flex-column">
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                    { itemSideMenu.map((el) => (<Link className="nav-link" to={el.url}>{el.text}</Link>)) }
                  </Nav>
                </Navbar>
              </Col>
            </Animate>

            {
              // Main content
            }
            <Col lg={8}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/sch">
                  <Schedule />
                </Route>
              </Switch>
            </Col>

            <SideContent>
              <Col lg={2}>
                {
                  // Aside
                }
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
              </Col>
            </SideContent>
          </Row>
        </Router>
      </Container>
    );
  }
}

export default Routers;
