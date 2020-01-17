import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Image } from 'react-bootstrap';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const carouselItem = [
  {
    headline: 'Просто сайт',
    text: 'Просто текст',
    image: process.env.PUBLIC_URL + '/image/screenshot/1.png',
  },
  {
    headline: 'Чуть лучше чем все',
    text: 'Обнова...',
    image: process.env.PUBLIC_URL + '/image/screenshot/1.png',
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="text-center">
        <h1>Неофициальный сайт ПКГХ</h1>
        <small>
          v4
          <span className="text-warning">Beta</span>
        </small>
        <p>Обновленный сайт для хороший людей</p>
        <Slider
          dots
          variableWidth
          centerMode
          slidesToShow
          slidesToScroll
          adaptiveHeight
          infinite
          lazyLoad
          speed={500}
          fade={false}
        >
          {
            carouselItem.map((item) => (
              <div>
                <img src={item.image} alt="img" />
                <h3>{item.headline}</h3>
                <p>{item.text}</p>
              </div>
            ))
          }
        </Slider>
      </div>
    );
  }
}

export default Home;
