const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');

const {
	AlertIOS,
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableHighlight
} = React;

const handlePress = function() {
	AlertIOS.alert('Pressed!', 'Just testing. Do not be alarmed');
};

let SongEntry = props => {
	return (
		<TouchableHighlight onPress={handlePress.bind(this)}>
			<View style={styles.songEntry}>
				<Text>props.title</Text>
				<Text>props.artist</Text>
				<Text>props.album</Text>
			</View>
		</TouchableHighlight>
	);
}

module.exports = SongQueue = props => {
	// let songs = props.queue.map(song => <SongEntry {...song}/>);
	return (
		<View style={styles.container}>
			<Text>{`This is the data: ${JSON.stringify(props.queue, null, 2)}`}</Text>
			{/*<ScrollView>
							{songs}
						</ScrollView>*/}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1	
	},
	songEntry: {
		paddingTop: 10,
		paddingBottom: 10
	}
});

module.exports = SongQueue;