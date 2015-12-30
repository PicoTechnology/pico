const React = require('react-native');
const UI_HELPERS = require('../Utils/UiHelpers.js');
const STYLES = require('../Assets/PicoStyles.js');
const Separator = require('./Separator.js');

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
	let artwork = props.soundcloud.artwork_url ? {uri: props.soundcloud.artwork_url} : require("../Assets/Pico-O-grey.png");
	return (
		<View style={STYLES.singleContainer}>
			<Image style={STYLES.singleImage} source={artwork} />
			<View style={STYLES.infoContainer}>
				<Text style={STYLES.singleTitle}>{props.soundcloud.title}</Text>
				<Text style={STYLES.singleInfo}>{props.soundcloud.user.username}</Text>
				<Text style={STYLES.singleInfo}>{UI_HELPERS.makeHumanReadable(props.soundcloud.duration)}</Text>
			</View>
			<View style={styles.votingContainer}>
				<Text style={STYLES.singleInfo}>{props.rating}</Text>
				<TouchableHighlight onPress={handleUpvote.bind(this)}>
					<Image style={STYLES.singleImage} source={upvote} />
				</TouchableHighlight>
				<TouchableHighlight onPress={handleDownvote.bind(this)}>
					<Image style={STYLES.singleImage} source={downvote} />
				</TouchableHighlight>
			</View>
		</View>
	);
}

module.exports = SongQueue = props => {
	let songs = props.queue.map((song, index) => {
		return (
			<View key={index}>
				<SongEntry {...song}/>
				<Separator/>
			</View>
		);
	});
	return (
		<View style={STYLES.mainScrollContainer}>
			<ScrollView>
				{songs}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	votingContainer: {
		position: 'absolute',
		right: 0,
		top: 0,
		flexDirection: 'row'
	},
	songEntry: {
		paddingTop: 10,
		paddingBottom: 10
	}
});

module.exports = SongQueue;
