import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Menu from './Menu';
import Home from './Home';
import Schedule from './Schedule';

class Routers extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="flex-column">
        <Router>
          <Menu />
          <Switch className="container">
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

export default Routers;
