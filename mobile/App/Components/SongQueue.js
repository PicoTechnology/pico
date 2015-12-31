const React = require('react-native');
const UI_HELPERS = require('../Utils/UiHelpers.js');
const UX_HELPERS = require('../Utils/UxHelpers.js');
const STYLES = require('../Assets/PicoStyles.js');
const Separator = require('./Separator.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;

const UPVOTE = require('../Assets/icons/up_solid.png'); 
const DOWNVOTE = require('../Assets/icons/down_solid.png');

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
	let trackID = props.soundcloud.id;
	let handleUpvote = () => {
		fetch(`${SERVER_ENDPOINT}/partyplaylist/upvote/${trackID}`, {
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then(res => res.json())
			.then(json => {
				props.updateParentQueue(json);
			})
			.catch(err => AlertIOS.alert('ERROR', err));
	}
	let handleDownvote = () => {
		fetch(`${SERVER_ENDPOINT}/partyplaylist/downvote/${trackID}`, {
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then(res => res.json())
			.then(json => {
				props.updateParentQueue(json);
			})
			.catch(err => AlertIOS.alert('ERROR', err));
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
					<Image style={STYLES.voteImage} source={UPVOTE} />
				</TouchableHighlight>
				<TouchableHighlight onPress={handleDownvote.bind(this)}>
					<Image style={STYLES.voteImage} source={DOWNVOTE} />
				</TouchableHighlight>
			</View>
		</View>
	);
}

class SongQueue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			queue: props.queue
		};
	}
	componentDidMount() {

	}
	updateQueue(newQueue) {
		this.setState({
			queue: newQueue
		});
	}
	render() {
		let songs = this.state.queue.map((song, index) => {
			return (
				<View key={index}>
					<SongEntry
						updateParentQueue={this.updateQueue.bind(this)}
						{...song}/>
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
	}
}

const styles = StyleSheet.create({
	votingContainer: {
		position: 'absolute',
		flexDirection: 'row',
		flex: 1,
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
		right: 0,
		top: 0,
	},
	songEntry: {
		paddingTop: 10,
		paddingBottom: 10
	}
});

module.exports = SongQueue;
