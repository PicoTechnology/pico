var React = require('react');

var Navbar = React.createClass({
  render: function() {
    return (
        <div className="container-fluid">
        <nav className="navbar navbar-inverse navbar-fixed-top" style={styles.mainNav}>
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
    marginRight: '5px'
  },
  mainNav:{
    boxShadow:'0px 20px 40px 0px rgba(0,0,0,0.75)',
    borderBottom: '1px solid #525252'
  }
};

module.exports = Navbar;
