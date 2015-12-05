const React = require('react-native');

const {
	AlertIOS,
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableHighlight
} = React;

class SongEntry extends React.Component {
	handlePress() {
		AlertIOS.alert('Pressed!', 'Just testing. Do not be alarmed');
	}
	render() {
		return (
			<TouchableHighlight onPres={this.handlePress}>
				<View style={styles.songEntry}>
					<Text>this.props.title</Text>
					<Text>this.props.artist</Text>
					<Text>this.props.album</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

class SongQueue extends React.Component {
	render() {
		let songs = this.props.songData.map(song => <SongEntry {...song}/>);
		return (
			<View style={styles.container}>
				<ScrollView>
					{songs}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {

	},
	songEntry: {
		paddingTop: 10,
		paddingBottom: 10
	}
});

module.exports = SongQueue;