var React = require('react');
var ReactDOM = require('react-dom');
var Team = require('./Team.js');

var data = {
	membersData: [{
		name: "William Carroll",
		github: "https://github.com/wpcarro",
		linkedin: "https://www.linkedin.com/in/williampatrickcarroll"
	},
	{
		name: "Vidiu Chiu",
		github: "https://github.com/VDUCHEW",
		linkedin: "https://www.linkedin.com/in/vidiuchiu"
	},
	{
		name: "Tina Lai",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
	},
	{
		name: "Casandra Silva Zenteno",
		github: "https://github.com/casandrawith1s",
		linkedin: "https://www.linkedin.com/in/casandrasilva"
	}]
};


var Main = React.createClass({
	render: function() {
		return (
			<div>
			Hello, world
			<Team {...data}/>

			</div>

		);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'));
