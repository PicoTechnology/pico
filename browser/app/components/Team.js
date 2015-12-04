var React = require('react');

var Button = React.createClass({
  render: function() {
    return (
      <button onClick={this.props.whenClicked}><span className={"glyphicon glyphicon-chevron-right"}></span></button>
    );
  }
});

var Member = React.createClass({
  handleClick: function() {
    this.setState({flip: !this.state.flip});
  },
  getInitialState: function() {
    return {flip: false};
  },
  render: function() {
    return (
      <div className="col-md-3" id='team'>
        <div 
          style={styles.teamMember}
          className="center-block">
          <h4 
            style={styles.teamMemberName}
            className="text-center">
            {this.props.name}
          </h4>
          <img className="center-block thumbnail" src={this.props.photo} />
          <p className="text-center">
            <a href={this.props.github} 
              style={styles.btnContainer}
              role="button">
              <img style={styles.btnMedia} src="./app/img/GitHub-Mark-32px.png"/>
            </a>
            <a href={this.props.linkedin} 
              style={styles.btnContainer}
              role="button">
              <img style={styles.btnMedia} src="./app/img/In-Black-34px-R.png" />
            </a>
          </p>
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
    }.bind(this));
    return (
      <div className="col-md-12" style={styles.container}>
        <h3 
          styles={styles.sectionHeading} 
          className="text-center">
          Pico Tech Team Members
        </h3>
        <div 
          style={styles.teamMemberContainer}
          className="row center-block">
          {list}
        </div>
      </div>
    );
  }
});

// custom colors
const BLACK = "#000000";
const GRAPHITE = "#4D4D4D";
const GRAPHITE_HIGHLIGHT = "#6F6F6F";
const GRAPHITE_LOWLIGHT = "#3B3B3B";
const WHITE = "#FFFFFF";

const styles = {
  container: {
    backgroundColor: BLACK
  },
  sectionHeading: {
    color: WHITE
  },
  btnContainer: {
    padding: 3,
    marginRight: 5,
    marginLeft: 5
  },
  btnMedia: {
    height: 32,
    width: 32
  },
  teamMemberContainer: {
    /* .. */
  },
  teamMember: {
    backgroundColor: GRAPHITE,
    borderRadius: 5,
    borderTopColor: GRAPHITE_HIGHLIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: BLACK,
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10, 
    paddingLeft: 5,
    maxWidth: 250
  },
  teamMemberName: {
    color: BLACK,
    textShadow: GRAPHITE_HIGHLIGHT + ' 0px 1px 0px'
  }
};


module.exports = Team;
