const React = require('react');

const HowItWorks = React.createClass({
	render: function() {
		return (
			<div>
				<h3>Our Technology</h3>
				<div id="mobile" className="col-sm-4">
					<h4>Mobile</h4>
					<p>Our technology is support on all iOS devices. Head to the App Store to download the latest version of our software, Pico Teal</p>
				</div>
				<div id="pi" className="col-sm-4">
					<h4>Pico Server</h4>
					<p>When you order Pico, you receive our proprietary hardware and software bundle. Pico, the name of the central server, will manage all of your acoustic needs!</p>
				</div>
				<div id="speakers" className="col-sm-4">
					<h4>Speakers</h4>
					<p>Pico works with all Bluetooth speakers. We recommend Bluetooth speakers with a large range. Our partner, Bose, has a few offerings that we would recommend!</p>
				</div>
			</div>
		);
	}
});

module.exports = HowItWorks;