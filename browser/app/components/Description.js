var React = require('react');

var descriptionStyle = {
  marginTop: 60,
  backgroundColor: '#373A40',
  color: 'white'
};

var buttonStyle = {
  float: 'right'
};

var Button = React.createClass({
  handleClick: function() {
    this.props.callback();
  },
  render: function() {
    return (
      <div style = {buttonStyle} >
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
      <div style = {descriptionStyle} >
        <h1>What is Pico?</h1>
        <p>Pico is a smart sound system that allows you
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
