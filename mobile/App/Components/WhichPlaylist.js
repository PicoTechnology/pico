const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Separator = require('./Separator.js');
const Tracks = require('./Tracks.js');
const PlaylistViewer = require('./PlaylistViewer.js');

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
  render() {
    return (
      <View style={styles.instantContainer}>
        <View style={styles.instantBtn}>
          <TouchableHighlight >
            <Text style={styles.instantText}>Play Now</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.instantBtn}>
          <TouchableHighlight>
            <Text style={styles.instantText}>Add to Queue</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

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

        // this.props.navigator.push({
        //   title: 'Playlists',
        //   passProps: {results: [1,2,3]},
        //   component: PlaylistViewer
        // });
        // this.props.updateParentState();
      })
      .catch(err => {
        AlertIOS.alert('Error', err);
      });
  }
  render() {
    return(
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View style={styles.playlistContainer}>
          <Text style={styles.playlistText}>{Object.keys(this.props.data)[0]}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

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
      <View style={styles.playlistContainer}>
        <TextInput
          style={styles.playlistInput}
          placeholder="Create new playlist..."
          placeholderTextColor="#FFF"
          onChange={this.handleChange.bind(this)}/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handlePress.bind(this)}>
          <Text style={styles.buttonText}> SUBMIT </Text>
        </TouchableHighlight>
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
            color="#99FF00"
            size="large" />
        </View>
      );
  }
  render() {
    let list = (this.state.isLoading) ? <View /> :
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
        <ScrollView
          onScroll={() => console.log('Playlist OnScroll activated!')}
          showVerticalScrollIndicator={true}>
          <InstantControls />
          <View style={styles.whichPlaylistHeaderContainer}>
            <Text style={styles.whichPlaylistHeader}>Add to Playlist:</Text>
          </View>
          {this.renderSpinner()}
          <View>
            {list}
          </View>
          <PlaylistCreator
            updateParentState={this.props.updateParentState} />
        </ScrollView>
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
    height: 40,
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#99FF00',
    borderRadius: 8,
    color: 'white'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#99FF00',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  playlistContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 10,
  },
  playlistText: {
    fontSize: 16,
    color: '#f1f3f5'
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
    borderColor: '#99FF00',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instantText: {
    color: '#99FF00',
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
