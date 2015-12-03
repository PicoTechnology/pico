var React = require('react');
var ReactDOM = require('react-dom');
var Team = require('./team_profile.js');

var data = {
	membersData: [{
		name: "Tina Lai",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
	},
	{
		name: "Tina Lai",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
	},
	{
		name: "Tina Lai",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
	},
	{
		name: "Tina Lai",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
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
