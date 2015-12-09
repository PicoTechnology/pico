const React = require('react-native');
const Tracks = require('./Tracks.js');
const {
	AlertIOS,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  NavigatorIOS,
  Dimensions,
  StyleSheet
} = React;

const {width, height} = Dimensions.get('window');

class SearchSoundCloud extends React.Component {
	render() {
		return (
			<View>
				<SearchBar />
				<Results />
			</View>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
	}
	handleSubmit() {
		AlertIOS.alert('Alert!', 'Button pressed!');
		var testData = [{
				"kind": "track",
				"id": 236575699,
				"created_at": "2015/12/08 03:33:19 +0000",
				"user_id": 123476564,
				"duration": 485791,
				"commentable": true,
				"state": "finished",
				"original_content_size": 171344172,
				"last_modified": "2015/12/08 03:33:19 +0000",
				"sharing": "public",
				"tag_list": "techno \"deep house\" atman",
				"permalink": "aragon",
				"streamable": true,
				"embeddable_by": "all",
				"downloadable": false,
				"purchase_url": null,
				"label_id": null,
				"purchase_title": null,
				"genre": "house",
				"title": "Aragon",
				"description": "Atman's 2nd EP, Aragon, features 2 new lush deep house cuts from the Miami based producer. The EP's first track, Patagonia is a hypnotic, 4 on the floor groove maker while Aragon is your classic four-four floor stomper that will be sure to get the dance floor pumping.\n\nPremiered exclusively by Over Easy Creative.",
				"label_name": null,
				"release": null,
				"track_type": null,
				"key_signature": null,
				"isrc": null,
				"video_url": null,
				"bpm": null,
				"release_year": null,
				"release_month": null,
				"release_day": null,
				"original_format": "wav",
				"license": "all-rights-reserved",
				"uri": "https://api.soundcloud.com/tracks/236575699",
				"user": {
						"id": 123476564,
						"kind": "user",
						"permalink": "overeasycreative",
						"username": "Over Easy Creative",
						"last_modified": "2015/12/06 22:59:55 +0000",
						"uri": "https://api.soundcloud.com/users/123476564",
						"permalink_url": "http://soundcloud.com/overeasycreative",
						"avatar_url": "https://i1.sndcdn.com/avatars-000126207841-6jez1s-large.jpg"
				},
				"permalink_url": "http://soundcloud.com/overeasycreative/aragon",
				"artwork_url": null,
				"waveform_url": "https://w1.sndcdn.com/SlFKl0g9UELs_m.png",
				"stream_url": "https://api.soundcloud.com/tracks/236575699/stream",
				"playback_count": 0,
				"download_count": 0,
				"favoritings_count": 0,
				"comment_count": 0,
				"attachments_uri": "https://api.soundcloud.com/tracks/236575699/attachments"
		},
		{
				"kind": "track",
				"id": 236575698,
				"created_at": "2015/12/08 03:33:17 +0000",
				"user_id": 112347983,
				"duration": 185356,
				"commentable": true,
				"state": "finished",
				"original_content_size": 2975266,
				"last_modified": "2015/12/08 03:33:17 +0000",
				"sharing": "public",
				"tag_list": "comeup",
				"permalink": "for-anne-swank",
				"streamable": true,
				"embeddable_by": "all",
				"downloadable": false,
				"purchase_url": null,
				"label_id": null,
				"purchase_title": null,
				"genre": "Work",
				"title": "For Anne Swank",
				"description": "",
				"label_name": null,
				"release": null,
				"track_type": null,
				"key_signature": null,
				"isrc": null,
				"video_url": null,
				"bpm": null,
				"release_year": null,
				"release_month": null,
				"release_day": null,
				"original_format": "mp3",
				"license": "all-rights-reserved",
				"uri": "https://api.soundcloud.com/tracks/236575698",
				"user": {
						"id": 112347983,
						"kind": "user",
						"permalink": "af1017",
						"username": "Af1017",
						"last_modified": "2015/12/04 23:56:58 +0000",
						"uri": "https://api.soundcloud.com/users/112347983",
						"permalink_url": "http://soundcloud.com/af1017",
						"avatar_url": "https://a1.sndcdn.com/images/default_avatar_large.png"
				},
				"permalink_url": "http://soundcloud.com/af1017/for-anne-swank",
				"artwork_url": null,
				"waveform_url": "https://w1.sndcdn.com/OavvuqOIVYZE_m.png",
				"stream_url": "https://api.soundcloud.com/tracks/236575698/stream",
				"playback_count": 0,
				"download_count": 0,
				"favoritings_count": 0,
				"comment_count": 0,
				"attachments_uri": "https://api.soundcloud.com/tracks/236575698/attachments"
		}];

		fetch('http://localhost:8000/tracks', {
			headers: {
				'Accept': 'application/json',
      	'Content-Type': 'application/json'
			},
			method: 'post',
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(json => {
				this.props.updateParentState(testData);
			})
			.catch(err => AlertIOS.alert('Error', 'There has been a fetch error...'));

	}
	handleChange(event) {
		this.setState({
			query: event.nativeEvent.text
		});
	}
	render() {
		return (
			<View
				style={styles.mainContainer}>
				<TextInput
					style={styles.searchInput}
					onChange={this.handleChange.bind(this)}
					placeholder="Search SoundCloud.com..." />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}>
					<Text
						style={styles.buttonText}>
						Search
					</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  searchInput: {
  	height: 50,
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
	title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = SearchBar;
