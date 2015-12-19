var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;


var MainCarousel = React.createClass({
  render: function() {
    return (
      <Carousel style={styles.carousel} id="mainCarousel">
        <CarouselItem>
          <img width={600} height={500} src="https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"/>
          <div className="carousel-caption">
            <h3>Welcome to PICO</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img width={600} height={500} src="http://weknowyourdreams.com/images/cat/cat-02.jpg"/>
          <div className="carousel-caption">
            <h3>Discover the music you love</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          </CarouselItem>
        <CarouselItem>
          <img width={600} height={500}  src="https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg"/>
          <div className="carousel-caption">
            <h3>Enjoy party mode with your friends</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </div>
        </CarouselItem>
      </Carousel>
		);
  }
});

const styles = {
  carousel: {
    margin:'auto',
    backgroundColor:'black',
    marginTop: '50px'

  }
}

module.exports = MainCarousel;
