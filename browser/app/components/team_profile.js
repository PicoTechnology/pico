var React = require('react');

var Member = React.createClass({
  render: function() {
    return (
      <div>
        <p>{this.props.name}</p>
        <a href={this.props.github}><img src="./app/img/GitHub-Mark-32px.png"/></a>
        <a href={this.props.linkedin}><img src="./app/img/In-Black-34px-R.png" /></a>
      </div>
    )
  }
});

var Team = React.createClass({
  render: function() {
    var list = this.props.membersData.map(function(membersProps) {
      return (
          <Member {...membersProps} />
      )
    });
    return (
      <div>
        <p>Radiar Tech Team Members</p>
        {list}
      </div>
    )
  }
});




module.exports = Team;
