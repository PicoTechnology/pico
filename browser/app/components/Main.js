var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('./Navbar.js');
var Home = require('./Home.js');
var Description = require('./Description.js');
var Team = require('./Team.js');
var Company = require('./Company.js');


var data = {
	productInfo: {
		btnCommand: "View Demo",
		btnLink: "http://www.google.com" // CHANGE route to video component

	},
	membersData: [{
		name: "William Carroll",
		photo: "./app/img/wpcarroll.jpg",
		github: "https://github.com/wpcarro",
		linkedin: "https://www.linkedin.com/in/williampatrickcarroll",
		info:"I love Rasp Pi."
	},
	{
		name: "Vidiu Chiu",
		photo:"./app/img/vchiu.jpg",
		github: "https://github.com/VDUCHEW",
		linkedin: "https://www.linkedin.com/in/vidiuchiu",
		info: "Style guru"
	},
	{
		name: "Tina Lai",
		photo:"./app/img/tclai.jpg",
		github: "https://github.com/tinalai",
		linkedin: "https://www.linkedin.com/in/thisistinalai",
		info: "Mac & cheese please!"
	},
	{
		name: "Casandra Silva",
		photo:"./app/img/csilva.jpg",
		github: "https://github.com/casandrawith1s",
		linkedin: "https://www.linkedin.com/in/casandrasilva",
		info: "Yoga master"
	}],
	companyData: {
		email: "picotech@gmail.com",
		location: "Los Angeles, CA",
		logo: "./app/img/kolibry.jpg"
	},
};


var Main = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<Navbar></Navbar>
				<Home></Home>
				<Description {...data}/>
				<Team {...data}/>
				<Company {...data}/>
			</div>
		);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'));
