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
		logo: "./assets/pico-logo-sml.png"
	},
};

var retrieveDemoHtml = function() {
	return (
		<div id="demoLightbox" className="lightbox hide fade"  tabindex="-1" role="dialog" aria-hidden="true">
			<div className='lightbox-content'>
				<p>Here is the video</p>
			</div>
		</div>
	);
};

var Main = React.createClass({
	getInitialState: function() {
		return {
			viewDemo: false
		};
	},
	toggleState: function() {
		this.setState({
			viewDemo: !this.state.viewDemo
		});
	},
	render: function() {
		var demo = (this.state.viewDemo) ? retrieveDemoHtml() : <div></div>;
		return (
			<div className="container-fluid">
				<Navbar />
				<Home />
				{demo}
				<Description {...data} callback={this.toggleState} />
				<Team {...data}/>
				<Company {...data}/>
			</div>
		);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'));
