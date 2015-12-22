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
        <Carousel>
          <CarouselItem >
            <img className="displayImages" src="./assets/iPhoneDisplay1.png"/>
              <h3>Welcome to PICO</h3>
          </CarouselItem>
          <CarouselItem>
            <img className="displayImages" src="./assets/iPhoneDisplay1.png"/>
              <h3>Discover the music you love</h3>
            </CarouselItem>
          <CarouselItem className="displayImages">
            <img className="displayImages" src="./assets/iPhoneDisplay1.png"/>
              <h3>Enjoy party mode with your friends</h3>
          </CarouselItem>
        </Carousel>
      </div>
    );
  }
});



module.exports = MainCarousel;
