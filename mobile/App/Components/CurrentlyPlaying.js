const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');
const UI_HELPERS = require('../Utils/UiHelpers.js');

const {
	View,
	Dimensions,
	Image,
	Text,
	StyleSheet
} = React;

class CurrentlyPlaying extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			secondsRemaining: 0,
			countingDown: false
		};
	}
	renderCountdown() {
		if (!this.state.countingDown) {
			let songDuration = this.props.trackObj.duration / 1000;
			this.setState({
				countingDown: true,
				secondsRemaining: songDuration
			});
			// countdown seconds and re-render
			let pid = setInterval(() => {
				this.setState({
					secondsRemaining: --this.state.secondsRemaining
				});
			}, 1000);
			// kill setInterval after the song has finished
			setTimeout(() => {
				clearInterval(pid);
			}, this.props.trackObj.duration);
		}
		return (
			<Text style={styles.trackInfo}>
				{UI_HELPERS.makeHumanReadable(this.state.secondsRemaining * 1000)}
			</Text>
		);
	}
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
				<View style={styles.trackInfoContainer}>
					<Text 
						style={styles.trackInfo}
						numberOfLines={1}>
						{this.props.trackObj.title}
					</Text>
					<Text 
						style={styles.trackInfo}
						numberOfLines={1}>
						{this.props.trackObj.genre}
					</Text>
					{this.renderCountdown()}
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
	trackInfoContainer: {
		flexDirection: 'column'
	},
	trackInfo: {
		fontSize: 14,
	},
	nowPlayingText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#000'
	},
});

module.exports = CurrentlyPlaying;