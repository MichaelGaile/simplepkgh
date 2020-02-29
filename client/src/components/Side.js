import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Sticky from 'react-stickynode';

import { motion } from 'framer-motion';

import StickyBox from 'react-sticky-box';

class Side extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      children,
      className,
      active,
      turn,
      style,
      fixed,
      top,
      bottom,
    } = this.props;

    // Default turn and attr name LEFT
    const isLeft = turn === 'left';
    const isRight = turn === 'right';
    if (isLeft === false && isRight === false) {
      console.warn('fixme later Side: NOT correct set props - turn');
    }

    const animateSide = {
      open: {
        opacity: 1,
        display: 'unset',
        transition: {
          staggerChildren: 0.07,
          delayChildren: 0.2,
        },
      },
      closed: {
        opacity: 0,
        display: 'none',
        transition: {
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
      },
    };

    return (
      <Sticky
        top={top}
        bottomBoundary={bottom}
        enabled={fixed}
        className={className}
        style={style}
      >
        <motion.div
          animate={active ? 'open' : 'closed'}
          variants={animateSide}
          initial={false}
        >
          { children }
        </motion.div>
      </Sticky>
    );
  }
}

Side.propTypes = {
  turn: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
  fixed: PropTypes.bool,
  top: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  bottom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
Side.defaultProps = {
  turn: 'left',
  active: false,
  className: '',
  style: {},
  fixed: false,
  top: 0,
  bottom: 0,
};
export default Side;
