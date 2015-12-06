var React = require('react');

var Carousel = React.createClass({
  render: function() {
    return (

      <div id="carousel" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carousel" data-slide-to="0" className="active"></li>
          <li data-target="#carousel" data-slide-to="1" className=""></li>
          <li data-target="#carousel" data-slide-to="2" className=""></li>
        </ol>

        <div className="carousel-inner">
          <div className="item active">
            <img src="http://lorempixel.com/1500/600/abstract/1" alt="Slide 1" />
          </div>
          <div className="item">
            <img src="http://lorempixel.com/1500/600/abstract/2" alt="Slide 2" />
          </div>
          <div className="item">
            <img src="http://lorempixel.com/1500/600/abstract/3" alt="Slide 3" />
          </div>
        </div>
        <a href="#carousel" className="left carousel-control" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a href="#carousel" className="right carousel-control" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>

		);
  }
});




module.exports = Carousel;
