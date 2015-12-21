const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');

const {
	View,
	Dimensions,
	Image,
	Text,
	StyleSheet
} = React;

const {WIDTH, HEIGHT} = Dimensions.get('window');

class CurrentlyPlaying extends React.Component {
	render() {
		if (this.props.trackObj === null) {
			return <View />;
		}
		let artwork = this.props.trackObj.artwork_url ? 
			{uri: this.props.trackObj.artwork_url} : require("../Assets/Pico-O-grey.png");
		return (
			<View style={styles.container}>
				<Image 
					style={STYLES.singleImage}
					source={artwork} />
				<Text 
					style={styles.text}
					numberOfLines={1}>
					{this.props.title}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		width: WIDTH,
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
		paddingRight: 7,
		paddingBottom: 5,
		paddingLeft: 5,
		backgroundColor: '#99FF00'
	},
	nowPlayingText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#000'
	},
	text: {
		color: '#000',
		fontSize: 14,
	}
});

module.exports = CurrentlyPlaying;