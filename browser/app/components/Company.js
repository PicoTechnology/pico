var React = require('react');
const BLACK = "#000000";
const GRAPHITE = "#4D4D4D";
const GRAPHITE_HIGHLIGHT = "#6F6F6F";
const GRAPHITE_LOWLIGHT = "#3B3B3B";
const WHITE = "#FFFFFF";

var CompanyStyle = {
  MainStyle: {
    backgroundColor: BLACK,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: GRAPHITE_HIGHLIGHT,
    borderBottomWidth: 1,
    borderBottomStyle: "groove",
    borderBottomColor: GRAPHITE_LOWLIGHT,
    color: GRAPHITE_HIGHLIGHT,
    height: 80
  },
  ContactsStyle: {
    marginTop: 30
  },
  TaglineStyle: {
      background: "browser/assets/pico-linebar.png",
      marginTop: 3,
      marginBottom: 10
  },
  CopyrightStyle: {
    marginBottom: 20,
  },
};
module.exports = Company = React.createClass({
  render: function() {
    return (
      <div style={CompanyStyle.MainStyle} className="footerWarper col-md-12 container-fluid">
        <Contacts {...this.props.companyData}/>

      </div>
    );
  }
});

Contacts = React.createClass({
  render: function() {
    return (
      <div className="footerText" style={CompanyStyle.ContactsStyle}>
        <span className="col-md-4"><span className="glyphicon glyphicon-envelope"></span>{" " + this.props.email + "  "}</span>
        <span className="col-md-4"><span className="glyphicon glyphicon-copyright-mark"></span>{" Copyright Pico Technology 2015"}</span>
         <span className="col-md-4"><span className="glyphicon glyphicon-flag"></span> {" "+this.props.location}</span>
      </div>
    );
  }
});

Tagline = React.createClass({
  render: function() {
    return (
      <div style={CompanyStyle.TaglineStyle} className="col-md-12 col-xs-12">
          <span className="col-md-4 col-md-offset-4 text-center"><span>{"BE ONE WITH "}<img src={this.props.logo} />{" THE SOUND"}</span></span>
        </div>
    );
  }
});

Copyright = React.createClass({
    render: function() {
      return (
        <h6 style={CompanyStyle.CopyrightStyle} className="col xs-6 col-md-4 col-md-offset-4 text-center">
        <span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span>
         <span>{" Copyright Pico Technology 2015"}</span>
        </h6>
      );
    }
});
