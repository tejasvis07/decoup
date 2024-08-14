import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { Player } from '@lottiefiles/react-lottie-player';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2 (1).jpg';
import carousel3 from '../assets/carousel3.jpg';
import carouselAnimation from '../assets/carousel.json';
import './Carousel.css';

const CarouselComponent = () => (
  <div className="carousel-wrapper">
    <div className="lottie-container">
      <Player
        autoplay
        loop
        src={carouselAnimation}
        className="lottie-player"
      />
    </div>
    <div className="carousel-container">
      <Carousel className="image-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carousel3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  </div>
);

export default CarouselComponent;
