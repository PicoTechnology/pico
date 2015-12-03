var React = require('react');

var Navbar = React.createClass({
  render: function() {
    return (
        <div className="container-fluid">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">PICO TECHNOLOGY(LOGO)</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#home">What's PICO?</a></li>
                <li><a href="#team">Team</a></li>
              </ul>
            </div>
          </div>
        </nav>
	    </div>
		);
  }
});

module.exports = Navbar;
