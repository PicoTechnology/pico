const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Separator = require('./Separator.js');
const Tracks = require('./Tracks.js');

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight
} = React;


// set up single playlist component
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
    let playlistname = `${Object.keys(this.props.data)[0]}`;
    let trackId = `${this.props.trackId}`;
    this.toggleSelected();
    fetch(`${SERVER_ENDPOINT}/playlists/${playlistname}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({trackID: `${trackId}`})
    });
  }
  render() {
    return(
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View style={styles.playlistContainer}>
          <Text style={styles.title}>{Object.keys(this.props.data)[0]}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class Instant extends React.Component {
  render() {
    return (
      <View style={styles.instantContainer}>
        <TouchableHighlight >
          <View>
            <Text style={styles.instantText}>Play Now</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View>
            <Text style={styles.instantText}>Add to Queue</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class WhichPlaylist extends React.Component {
  render() {
    let list = this.props.playlists.map((playlist, index) => {
      return (
        <View
          key={index}
          style={styles.playlistContainer} >
          <Playlist
          data={playlist}
          trackId={this.props.trackId}/>
          <Separator />
        </View>
      );
    });
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          onScroll={() => console.log('Playlist OnScroll activated!')}
          showVerticalScrollIndicator={true}>
          <View>
            <Instant/>
          </View>
          {list}
          <TextInput />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    backgroundColor: '#161c20',
  },
  playlistContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 3,
    paddingLeft: 3,
    paddingBottom: 3
  },
  infoContainer: {
    flexDirection: 'column'
  },
  title: {
    color: '#f1f3f5',
    fontWeight: 'bold'
  },
  instantContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: 'white'
  },
  instantText: {
    color: '#161c20',
    fontWeight: 'bold'
  }
});

module.exports = WhichPlaylist;
