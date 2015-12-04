var React = require('react');

var Button = React.createClass({
  render: function() {
    return (
      <a href={this.props.btnLink}>
        <button>
        {this.props.btnCommand}
        </button>
      </a>
    )
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
        <Button {...this.props.productInfo}/>
      </div>
        );
    }
});

module.exports = Description;