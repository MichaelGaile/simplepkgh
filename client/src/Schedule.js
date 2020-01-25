import React, { Component } from 'react';
import axios from 'axios';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    axios.get('/schedule/').then((res) => console.log(res));
    return (
      <div>
        <h1>Schedule</h1>
      </div>
    );
  }
}

export default Schedule;
