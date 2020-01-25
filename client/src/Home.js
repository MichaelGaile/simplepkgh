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
        <p>A wiki is a knowledge base website on which users collaboratively modify content and structure directly from the web browser. In a typical wiki, text is written using a simplified markup language and often edited with the help of a rich-text editor. A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users. There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions; for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control.Wikipedia</p>
        <p>A wiki is a knowledge base website on which users collaboratively modify content and structure directly from the web browser. In a typical wiki, text is written using a simplified markup language and often edited with the help of a rich-text editor. A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users. There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions; for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control.Wikipedia</p>
        <p>A wiki is a knowledge base website on which users collaboratively modify content and structure directly from the web browser. In a typical wiki, text is written using a simplified markup language and often edited with the help of a rich-text editor. A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users. There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions; for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control.Wikipedia</p>
        <p>A wiki is a knowledge base website on which users collaboratively modify content and structure directly from the web browser. In a typical wiki, text is written using a simplified markup language and often edited with the help of a rich-text editor. A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users. There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions; for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control.Wikipedia</p>
        <p>A wiki is a knowledge base website on which users collaboratively modify content and structure directly from the web browser. In a typical wiki, text is written using a simplified markup language and often edited with the help of a rich-text editor. A wiki is run using wiki software, otherwise known as a wiki engine. A wiki engine is a type of content management system, but it differs from most other such systems, including blog software, in that the content is created without any defined owner or leader, and wikis have little inherent structure, allowing structure to emerge according to the needs of the users. There are dozens of different wiki engines in use, both standalone and part of other software, such as bug tracking systems. Some wiki engines are open source, whereas others are proprietary. Some permit control over different functions; for example, editing rights may permit changing, adding, or removing material. Others may permit access without enforcing access control.Wikipedia</p>
      </div>
    );
  }
}

export default Home;
