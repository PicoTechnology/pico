var React = require('react');
var MainCarousel = require('./Carousel');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

// var Button = React.createClass({
//   handleClick: function() {
//     this.props.callback();
//   },
//   render: function() {
//     return (
//       <div style = {styles.demoBtn} >
//         <button type="button" className="btn btn-default" onClick={this.handleClick}>
//           {this.props.btnCommand}
//           <span className="glyphicon glyphicon-chevron-right"></span>
//         </button>
//       </div>
//     );
//   }
// });

var Description = React.createClass({
  render: function() {
    return (
      <div className="col-md-6 descriptionWrapper" style={styles.container}>
        <h1 style={styles.heading} className="descriptionHeader">What is Pico?</h1>
        <p style={styles.blurb} className="descriptionPara">Pico is a smart sound system that allows you
        and your friends to create an immersive music
        experience with one simple app.
        Capable of building personal and group
        curated playlists, multi-room sound streaming.</p>

        <ButtonToolbar>
              <Button href="#diagram" className="pull">View Diagram</Button>
        </ButtonToolbar>

      </div>
      );
    }
});

const styles = {
  container: {
    color: 'white',
    boxShadow: '0 1 0 red',
    left:'15%',
    top:'5%'
  },
  demoBtn: {
    position: 'relative'
  },
  heading: {
    position: 'relative',
    marginBottom: 20
  },
  blurb: {
    position: 'relative',
    maxWidth: 300,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 50,
    paddingLeft: 5,
    fontSize:24
  }
};

module.exports = Description;
