const React = require('react-native');
const STYLES = require('../Assets/PicoStyles.js');

const {
  AlertIOS,
  View,
  Text,
  TouchableHighlight
} = React;

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }
  toggleSelected() {
    this.setState({
      isSelected: !this.state.isSelected
    });
  }
  handlePress() {
    let playlistname = Object.keys(this.props.data)[0];
    let trackObj = this.props.trackObj;
    this.toggleSelected();
    this.props.updateParentState();
    fetch(`${SERVER_ENDPOINT}/playlists/${playlistname}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({trackObj: trackObj})
    })
      .then(res => res.json())
      .then(json => {
        this.props.navigator.push({
          title: 'Playlists',
          passProps: {
            results: json,
            initialPlaylist: playlistname
          },
          component: PlaylistViewer
        });
        this.props.updateParentState();
      })
      .catch(err => {
        AlertIOS.alert('Error', err);
      });
  }
  render() {
    return(
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View style={STYLES.playlistContainer}>
          <Text style={STYLES.playlistText}>{Object.keys(this.props.data)[0]}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = Playlist;
