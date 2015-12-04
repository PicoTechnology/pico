var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('./Navbar.js');
var Home = require('./Home.js');
var Team = require('./Team.js');
var Company = require('./Company.js');


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
		photo:"./app/img/tclai.jpg",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai"
	},
	{
		name: "Casandra Silva",
		photo:"./app/img/csilva.jpg",
		github: "https://github.com/casandrawith1s",
		linkedin: "https://www.linkedin.com/in/casandrasilva"
	}],
	companyData: {
		email: "picotech@gmail.com",
		location: "Los Angeles, CA",
		logo: "./app/img/kolibry.jpg"
	}
};


var Main = React.createClass({
	render: function() {
		return (
			<div>
				<Navbar></Navbar>
				<Home></Home>
				<Team {...data}/>
				<Company {...data}/>
			</div>
		);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'));
