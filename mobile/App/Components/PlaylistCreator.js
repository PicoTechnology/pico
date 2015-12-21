const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');

const {
	AlertIOS,
	Text,
	TouchableHighlight,
	TextInput,
	View
} = React;

class PlaylistCreator extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      playlistname: ''
    };
  }
  handlePress() {
    var data = {
      playlistname: this.state.playlistname,
      trackIDs: "[]"
    };
    fetch(`${SERVER_ENDPOINT}/playlists`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        this.props.updateParentState(data);
      })
      .catch(err => AlertIOS.alert('Error', err));
  }
  handleChange(event) {
    this.setState({
      playlistname: event.nativeEvent.text
    });
  }
  render() {
    return (
      <View style={STYLES.playlistContainer}>
        <TextInput
          style={STYLES.playlistInput}
          placeholder="Create a New Playlist..."
          placeholderTextColor="#FFF"
          onChange={this.handleChange.bind(this)}/>
        <TouchableHighlight
          style={STYLES.button}
          onPress={this.handlePress.bind(this)}>
          <Text style={STYLES.buttonText}> SUBMIT </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = PlaylistCreator;