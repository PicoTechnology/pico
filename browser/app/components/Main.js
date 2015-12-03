var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('./Navbar.js');
var About = require('./About.js');
var Home = require('./Home.js');
var Team = require('./Team.js');


var data = {
	membersData: [{
		name: "William Carroll",
		photo: "./app/img/wpcarroll.jpg",
		github: "https://github.com/wpcarro",
		linkedin: "https://www.linkedin.com/in/williampatrickcarroll"
	},
	{
		name: "Vidiu Chiu",
		photo:"./app/img/vchiu.jpg",
		github: "https://github.com/VDUCHEW",
		linkedin: "https://www.linkedin.com/in/vidiuchiu"
	},
	{
		name: "Tina Lai",
		photo:"./app/img/tlai.jpg",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
	},
	{
		name: "Casandra Silva",
		photo:"./app/img/csilva.jpg",
		github: "https://github.com/casandrawith1s",
		linkedin: "https://www.linkedin.com/in/casandrasilva"
	}]
};


var Main = React.createClass({
	render: function() {
		return (
			<div>

				<Navbar></Navbar>
				<About></About>
				<Home></Home>
				<Team {...data}/>

			</div>

		);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'));
