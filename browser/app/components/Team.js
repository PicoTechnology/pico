var React = require('react');

var Button = React.createClass({
  render: function() {
    return (
      <div
        style={styles.infoBtn}
        onClick={this.props.whenClicked}>
        <span
          style={styles.glyphicon}
          className={'glyphicon ' + this.props.glyphicon}/>
      </div>
    );
  }
});

var Member = React.createClass({
  handleClick: function() {
    this.setState({
      flipped: !this.state.flipped
    });
  },
  getInitialState: function() {
    return {
      flipped: false
    };
  },
  retrieveFront: function() {
    return (
      <div>
        <Button whenClicked={this.handleClick} glyphicon={'glyphicon-circle-arrow-right'} />
        <img
          style={styles.headShot}
          className="img-circle center-block thumbnail" src={this.props.photo} />
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
    );
  },
  retrieveBack: function() {
    return (
      <div>
        <Button whenClicked={this.handleClick} glyphicon={'glyphicon glyphicon-user'} />
        <p className="text-center">
          {this.props.info}
        </p>
      </div>
    );
  },
  render: function() {
    var visibleSide = (!this.state.flipped) ? this.retrieveFront() : this.retrieveBack();
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
          {visibleSide}
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
const GRAPHITE = "#3D3D3D";
const GRAPHITE_HIGHLIGHT = "#6F6F6F";
const GRAPHITE_LOWLIGHT = "#3B3B3B";
const GRAPHITE_LOWEST_LIGHT = "#2C2C2C";
const GRAY = "#D9D9D9";
const WHITE = "#FFFFFF";

const styles = {
  container: {
    backgroundColor: GRAPHITE,
    color: BLACK
  },
  sectionHeading: {
    color: WHITE
  },
  headShot: {
    width: 160,
    height: 160
  },
  glyphicon: {
    color: GRAPHITE_LOWEST_LIGHT,
    fontSize: 22,
    marginLeft: 5,
    marginTop: 5,
    textShadow: GRAPHITE_HIGHLIGHT + ' 1px 1px 0px'
  },
  infoBtn: {
    cursor: 'pointer',
    position: 'absolute',
    display: 'inline-block',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    /* backgroundColor: BLACK, */
    borderRadius: 15
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
    position: 'relative',
    backgroundColor: GRAPHITE,
    borderStyle: 'solid',
    borderTopColor: GRAPHITE_HIGHLIGHT,
    borderRightColor: GRAPHITE_LOWEST_LIGHT,
    borderBottomColor: BLACK,
    borderLeftColor: GRAPHITE_HIGHLIGHT,
    borderWidth: 1,
    borderRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingRight: 5,
    paddingBottom: 10,
    paddingLeft: 5,
    maxWidth: 250,
    boxShadow: GRAPHITE_LOWEST_LIGHT + ' 0px 0px 5px'
  },
  teamMemberName: {
    maxWidth: 250,
    color: BLACK,
    textShadow: GRAPHITE_HIGHLIGHT + ' 0px 1px 0px'
  }
};


module.exports = Team;
