var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;

var MainCarousel = React.createClass({
  render: function() {
    return (
      <div className="col-md-6">
        <div style={styles.iphoneImg} className="iPhoneImage" id="home">
          <img src="./assets/iPhoneTransparent.png"/>
          <div style={styles.carouselContainer}>
            <Carousel interval={1500}>
              <CarouselItem>
                <img src="./assets/iPhoneDisplay1.png"/>
                  <h3 style={styles.display}>Welcome to PICO</h3>
              </CarouselItem>
              <CarouselItem>
                <img src="./assets/iPhoneDisplay2.png"/>
                  <h3 style={styles.display}>Connect to your speakers</h3>
                </CarouselItem>
              <CarouselItem>
                <img src="./assets/iPhoneDisplay3.png"/>
                  <h3 style={styles.display}>Discover the music you love</h3>
              </CarouselItem>
              <CarouselItem>
                <img src="./assets/iPhoneDisplay4.png"/>
                  <h3 style={styles.display}>Enjoy party mode with your friends</h3>
              </CarouselItem>
            </Carousel>
          </div>
        </div>
      </div>
    );
  }
});

styles = {
  iphoneImg: {
    position: 'absolute',
    right: '-10%'
  },
  carouselContainer: {
    position: "absolute",
    top: 0,
    left: 0
  },
  display: {
    textAlign: 'center',
    color: 'white',
    paddingTop: '15px'
  }
}

module.exports = MainCarousel;
