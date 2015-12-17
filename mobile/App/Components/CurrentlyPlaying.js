const React = require('react-native');

const {
	View,
	Dimensions,
	Text,
	StyleSheet
} = React;

const {WIDTH, HEIGHT} = Dimensions.get('window');

class CurrentlyPlaying extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.nowPlayingText}>Now playing...</Text>
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
		width: WIDTH,
		bottom: 0,
		left: 0,
		flex: 1,
		flexDirection: 'column',
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