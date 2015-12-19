var React = require('react');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;


var MainCarousel = React.createClass({
  render: function() {
    return (
      <Carousel>
        <CarouselItem style={styles.carousel} className="img-responsive center-block">
          <img width={900} height={500} alt="900x500" src="./app/img/In-Black-34px-R.png"/>
          <div className="carousel-caption">
            <h3>Welcome to PICO</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <img width={900} height={500} alt="900x500" src="./app/img/vchiu.jpg"/>
          <div className="carousel-caption">
            <h3>Discover the music you love</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          </CarouselItem>
        <CarouselItem>
          <img width={900} height={500} alt="900x500" src="https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg"/>
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
    backgroundColor:'black'
  }
}

module.exports = MainCarousel;
