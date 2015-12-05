var React = require('react');

var Button = React.createClass({
  handleClick: function() {
    this.props.callback();
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>
        {this.props.btnCommand}
      </button>
    );
  }
});


var Description = React.createClass({
  render: function() {
    return (
      <div>
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
