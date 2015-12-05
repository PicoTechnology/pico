var React = require('react');
var $ = require('jquery');

var Navbar = React.createClass({
  render: function() {
    console.log('scrollTop: ' + $(document).scrollTop());
    var navStyle = styles.mainNav;
    if ($(document).scrollTop() > 0) {
      navStyle = Object.assign({}, styles.mainNav, styles.dropShadow);
    }
    return (
        <div className="container-fluid">
        <nav className="navbar navbar-inverse navbar-fixed-top" style={navStyle}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <img style={styles.logo} src="./assets/pico-logo-main.jpg"/>
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul style={styles.aboutAndteam} className="nav navbar-nav navbar-right">
                <li><a href="#home">WHAT'S PICO?</a></li>
                <li><a href="#team">TEAM</a></li>
              </ul>
            </div>
          </div>
        </nav>
	    </div>
		);
  }
});

const styles = {
  logo: {
    width: '75',
    marginTop: '-8px',
    marginBottom: '10px'
  },
  aboutAndteam:{
    fontSize: 'large',
    marginTop: '5px',
    marginRight: '5px',
    color: '#FFFFFF'
  },
  mainNav:{
    borderBottom: '1px solid #525252'
  },
  dropShadow:{
    boxShadow:'0px 2px 10px 0px rgba(0,0,0,0.70)',
  }
};

module.exports = Navbar;
