var React = require('react');

module.exports = Company = React.createClass({
  render: function() {
    return (
      <div className="container col-sm-6 col-md-4">
        <Contacts {...this.props.companyData}/>
        <Tagline {...this.props.companyData}/>
        <Copyright />
      </div>
    );
  }
});

Contacts = React.createClass({
  render: function() {
    return (
      <div className="contacts row">
        {this.props.email + " " + this.props.location}
      </div>
    );
  }
});

Tagline = React.createClass({
  render: function() {
    return (
      <div className="tagline row">
        <span>{"BE ONE " + <img src={this.props.logo} /> + " All THE SOUND"}</span>
      </div>
    );
  }
});

Copyright = React.createClass({
    render: function() {
      return (
        <div className="copyright row">
        <span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span>
         <p>Copyright Pico Technology 2015</p>
        </div>
      );
    }
});
