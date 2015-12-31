const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js');

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
      <View style={STYLES.sideBySideContainer}>
        <TextInput
          style={STYLES.playlistInput}
          placeholder="Create a New Playlist..."
          placeholderTextColor={STYLES.colors.LIGHT_GREY}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={Object.assign({}, STYLES.submitBtn, styles.button)}
          onPress={this.handlePress.bind(this)}
          underlayColor={STYLES.colors.ACCENT_GREEN}>
          <Text style={Object.assign({}, STYLES.submitBtnText, styles.btnText)}>+</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = {
  button : {
    height: 35,
    width: 35,
    padding: 5,
    marginTop: 10,
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

module.exports = PlaylistCreator;
