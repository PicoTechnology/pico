const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');

const {
	View,
	Dimensions,
	Image,
	Text,
	StyleSheet
} = React;

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
				<View style={styles.trackInfo}>
					<Text 
						style={styles.nowPlayingText}
						numberOfLines={1}>
						{this.props.trackObj.title}
					</Text>
					<Text 
						style={styles.nowPlayingText}
						numberOfLines={1}>
						{this.props.trackObj.genre}
					</Text>
				</View>
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
		flex: 1,
		flexDirection: 'row',
		paddingTop: 5,
		paddingRight: 7,
		paddingBottom: 5,
		paddingLeft: 5,
		backgroundColor: STYLES.colors.PICO_GREEN
	},
	trackInfo: {
		flexDirection: 'column'
	},
	nowPlayingText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#000'
	},
	text: {
		fontSize: 14,
		color: '#000'
	}
});

module.exports = CurrentlyPlaying;