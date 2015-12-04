var React = require('react');

var Member = React.createClass({
  render: function() {
    return (
        <div className="col-sm-4 col-md-2" id='team'>
          <div className="thumbnail">
            <div className="caption">
              <h4>{this.props.name}</h4>
              <img src={this.props.photo} />
              <p>
              <a href={this.props.github} className="btn btn-default" role="button"><img src="./app/img/GitHub-Mark-32px.png"/></a>
              <a href={this.props.linkedin} className="btn btn-default" role="button"><img src="./app/img/In-Black-34px-R.png" /></a>
              </p>
            </div>
          </div>
        </div>
    );
  }
});

var Team = React.createClass({
  render: function() {
    var list = this.props.membersData.map(function(membersProps, index) {
      return (
        <Member key={index} {...membersProps} />
      );
    });
    return (
      <div>
      <h3>Radiar Tech Team Members</h3>
      {list}
      </div>
    );
  }
});




module.exports = Team;
