var React = require('react');

var Diagram = React.createClass({
  render: function() {
    return (
      <div className="diagramWrapper" id="diagram">
        <img className="diagram" src="./assets/IllustrationDemo.png"></img>
      </div>
    )
  }
});

module.exports = Diagram;
