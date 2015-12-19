var React = require('react');

const styles = {
  container: {
    backgroundColor: '#373A40',
    color: 'white',
    borderBottomStyle: 'solid',
    borderBottomColor: '#6F6F6F',
    borderBottomWidth: 1,
    boxShadow: '0 1 0 red'

  },
  demoBtn: {
    position: 'relative'
  },
  heading: {
    position: 'relative',
    marginLeft: 25
  },
  content: {

  },
  blurb: {
    position: 'relative',
    maxWidth: 300,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  }
};

var Button = React.createClass({
  handleClick: function() {
    this.props.callback();
  },
  render: function() {
    return (
      <div style = {styles.demoBtn} >
        <button type="button" className = "btn btn-default" onClick={this.handleClick}>
          {this.props.btnCommand}
          <span className="glyphicon glyphicon-chevron-right"></span>
        </button>
      </div>
    );
  }
});

var Description = React.createClass({
  render: function() {
    return (
      <div style = {styles.container} id='description'>
        <h1 style = {styles.heading} >What is Pico?</h1>
        <p style = {styles.blurb}>Pico is a smart sound system that allows you
        and your friends to create an immersive music
        experience with one simple app.
        Capable of building personal and group
        curated playlists, multi-room sound streaming.</p>
        <Button {...this.props.productInfo} callback={this.props.callback}/>
      </div>
        );
    }
});

module.exports = Description;
