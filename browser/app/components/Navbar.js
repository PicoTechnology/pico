var React = require('react');
var $ = require('jquery');
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var MainNavbar = React.createClass({
  componentDidMount: function() {
    $(function() {
      $('a[href*=#]:not([href=#]), button').click(function(e) {
        e.preventDefault();
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('body').animate({
              scrollTop: target.offset().top
            }, 1500);
          }
        }
      });
    });
  },
  render: function() {
    var navStyle = styles.mainNav;
    if ($(document).scrollTop() > 0) {
      navStyle = Object.assign({}, styles.mainNav, styles.dropShadow);
    }
    return (
      <Navbar inverse fixedTop style={styles.mainNav}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home"><img style={styles.logo} src="./assets/PicoLogo-Navi.png"></img></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav style={styles.mainNav}>
            </Nav>
            <Nav pullRight style={styles.aboutAndteam}>
              <NavItem eventKey={1} href="#team">TEAM</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
		);
  }
});

const styles = {
  logo: {
    width: '92',
    marginTop: '-7'
  },
  aboutAndteam:{
    fontSize: 'medium',
    color: '#FFFFFF'
  },
  mainNav:{
    boxShadow:'0px 2px 10px 0px rgba(0,0,0,0.70)',
    color:'white !important',
    marginBottom: '0'
  }
};

module.exports = MainNavbar;
