import './hamburgers.css';
import React, { Component } from 'react';

class Hamburger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultType: this.props.defaultType? this.props.defaultType : 'slider'
    };
  }

  render() {
    const active = this.props.active ? 'is-active' : '';
    const type = this.props.type ? this.props.type : this.state.defaultType;
    const onClick = this.props.onClick ? this.props.onClick : null;
    return (
      <button onClick={onClick} className={`hamburger hamburger--${type} ${active}`} type="button">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    );
  }
}
export default Hamburger;
