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

const handlePress = () => {
	AlertIOS.alert('Pressed!', 'Just testing. Do not be alarmed');
};

let SongEntry = props => {
	let upvote = require('../Assets/icons/Up.png');
	let downvote = require('../Assets/icons/Down.png');
	let handleUpvote = () => {
		AlertIOS.alert('handle voted', 'upvote pressed');
	}
	let handleDownvote = () => {
		AlertIOS.alert('handle voted', 'downvote pressed');
	}
	return (
		<View style={styles.songEntry}>
			<View>
				<Text>{props.soundcloud.title}</Text>
				<Text>{props.soundcloud.artist}</Text>
				<Text>{props.soundcloud.album}</Text>
				<Text>{props.rating}</Text>
			</View>
			<View>
				<TouchableHighlight onPress={handleUpvote.bind(this)}>
					<Image source={upvote} />
				</TouchableHighlight>
				<TouchableHighlight onPress={handleDownvote.bind(this)}>
					<Image source={downvote} />
				</TouchableHighlight>
			</View>
		</View>
	);
}

module.exports = SongQueue = props => {
	let songs = props.queue.map(song => <SongEntry {...song}/>);
	return (
		<View style={styles.container}>
			<ScrollView>
				{songs}
			</ScrollView>
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
