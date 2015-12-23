var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;

var MainCarousel = React.createClass({
  render: function() {
    return (
      <div>
        <div className="iPhoneImage">
          <img src="./assets/iPhoneTransparent.png"/>
        </div>
        <Carousel interval={2000}>
          <CarouselItem>
            <img className="displayImages" src="./assets/iPhoneDisplay1.png"/>
              <h3 className="carouselText">Welcome to PICO</h3>
          </CarouselItem>
          <CarouselItem>
            <img className="displayImages" src="./assets/iPhoneDisplay2.png"/>
              <h3 className="carouselText">Connect to your speakers</h3>
            </CarouselItem>
          <CarouselItem>
            <img className="displayImages" src="./assets/iPhoneDisplay3.png"/>
              <h3 className="carouselText">Discover the music you love</h3>
          </CarouselItem>
          <CarouselItem>
            <img className="displayImages" src="./assets/iPhoneDisplay4.png"/>
              <h3 className="carouselText">Enjoy party mode with your friends</h3>
          </CarouselItem>
        </Carousel>
      </div>
    );
  }
});



module.exports = MainCarousel;
