const React = require('react-native');

const WithCustomFont = require('@exponent/with-custom-font');
// const symbols = require('../Assets/fonts/IcoMoon-Free.ttf');

const hash ={
	user: '\e917',
	locked: '\e98f',
	unlocked: '\e990',
	play: '\ea1c',
	play2: '\ea15',
	pause: '\ea1d',
	stop: '\ea1e',
	fastforward: '\ea1f',
	rewind: '\ea20',
	next: '\ea22',
	prev: '\ea21',
	rightArrow: '\ea3c',
	leftArrow: '\ea40',
	search: '\e986',
	spinner: '\e982',
	gear: '\e994',
	list: '\e9bb',
	star: '\e9d9',
	heart: '\e9da',
	soundcloud: '\eac3'
};

const ICON_DIR = '../Assets/icons';
const img = require('../Assets/icons/user.png');

const {
	View,
	Text,
	Image,
	StyleSheet
} = React;

<Glyphicon
	size="large"
	color="red"
	icon="search" />

let WithIcoMoon = WithCustomFont.createCustomFontComponent({
	uri: 'https://fonts.gstatic.com/s/sourcecodepro/v6/mrl8jkM18OlOQN8JLgasD5bPFduIYtoLzwST68uhz_Y.woff2'
});

class Glyphicon extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let filename = this.props.icon;
		return (
			<View style={styles[`${this.props.size}Container`]}>
				<WithIcoMoon>
					<Text style={styles.glyphicon}>{hash.user}</Text>
				</WithIcoMoon>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	glyphicon: {
		fontFamily: 'Source Code Pro',
		fontSize: 26
	},
	smallContainer: {
		width: 100,
		height: 100,
		backgroundColor: 'red'
	},
	mediumContainer: {
		width: 100,
		height: 100,
		backgroundColor: 'red'
	},
	largeContainer: {
		width: 100,
		height: 100,
		backgroundColor: 'red'
	}
});

module.exports = Glyphicon;