const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Separator = require('./Separator.js');
const Tracks = require('./Tracks.js');
const PlaylistViewer = require('./PlaylistViewer.js');
const Playlist = require('./Playlist.js');
const PlaylistCreator = require('./PlaylistCreator.js');
const STYLES = require('../Assets/PicoStyles.js');

const {
  AlertIOS,
  ActivityIndicatorIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight
} = React;

class InstantControls extends React.Component {
  handlePlayNow() {
    this.props.updateParentNowPlaying(this.props.trackObj);
  }
  render() {
    return (
      <View style={styles.instantContainer}>
        <View style={styles.instantBtn}>
          <TouchableHighlight onPress={this.handlePlayNow.bind(this)}>
            <Text style={styles.instantText}>PLAY NOW</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.instantBtn}>
          <TouchableHighlight>
            <Text style={styles.instantText}>ADD TO QUEUE</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class WhichPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  toggleIsLoading() {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }
  renderSpinner() {
    return (!this.state.isLoading) ? <View /> :
      (
        <View style={styles.spinnerContainer}>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color={STYLES.colors.PICO_GREEN}
            size="large" />
        </View>
      );
  }
  render() {
    let playlistList = (this.state.isLoading) ? <View /> :
      this.props.playlists.map((playlist, index) => {
        return (
          <View
            key={index}
            style={styles.playlistContainer} >
            <Playlist
              navigator={this.props.navigator}
              data={playlist}
              trackObj={this.props.trackObj}
              updateParentState={this.toggleIsLoading.bind(this)} />
            <Separator />
          </View>
        );
      });
    return (
      <View style={styles.mainContainer}>
        <InstantControls
          trackObj={this.props.trackObj}
          updateParentNowPlaying={this.props.updateParentNowPlaying} />
        <View style={styles.whichPlaylistHeaderContainer}>
          <Text style={styles.whichPlaylistHeader}>Add to Playlist:</Text>
        </View>
        {this.renderSpinner()}
        {playlistList}
        <PlaylistCreator
          updateParentState={this.props.updateParentState} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 3,
    backgroundColor: '#000',
  },
  playlistInput: {
    height: 35,
    width: 230,
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#00ffff',
    borderRadius: 8,
    color: 'white'
  },
  button: {
    height: 35,
    backgroundColor: '#00ffff',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  infoContainer: {
    flexDirection: 'column'
  },
  whichPlaylistHeaderContainer: {
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  whichPlaylistHeader: {
    textAlign: 'center',
    color: '#f1f3f5',
    fontSize: 18
  },
  instantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 3,
    paddingBottom: 3,
  },
  instantBtn: {
    height: 30,
    paddingTop: 5,
    paddingRight: 7,
    paddingBottom: 5,
    paddingLeft: 7,
    borderColor: '#00ffff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instantText: {
    color: '#00ffff',
    fontSize: 15
  },
  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
});

module.exports = WhichPlaylist;
