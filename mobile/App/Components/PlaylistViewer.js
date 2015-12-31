'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const STYLES = require('../Assets/PicoStyles.js');
const UI_HELPERS = require('../Utils/UiHelpers.js');

const BIN = require('../Assets/icons/recycle_bin.png');

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

class PlaylistName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  handlePress() {
    this.setState({
      selected: true
    });
    this.props.updateParentState(this.props.name);
    // render this playlist
  }
  generateBtnStyle() {
    if (this.state.selected) {
      return styles.playlistNameBtnSelected;
    }
    return styles.playlistNameBtn;
  }
  render() {
    let btnStyle = (this.props.selected) ? 
      styles.playlistNameBtnSelected : styles.playlistNameBtn;
    let textColor = (this.props.selected) ?
      styles.playlistNameTextSelected : styles.playlistNameText;
    return (
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View style={btnStyle}>
          <Text style={textColor}>
            {this.props.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class ScrollLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowViewing: this.props.initialPlaylist
    };
  }
  updateNowViewing(playlistName) {
    this.setState({
      nowViewing: playlistName
    });
    this.props.updateParentState(playlistName);
  }
  render() {
    let playlistNames = this.props.playlistNames.map((name, index) => {
      return (
        <View>
          <PlaylistName key={index} name={name}
            selected={name === this.state.nowViewing}
            updateParentState={this.updateNowViewing.bind(this)} />
        </View>
      );
    });
    return (
      <View style={styles.scrollListsContainer}>
        <ScrollView
          horizontal={true}
          centerContent={true}
          informParent={this.updateNowViewing.bind(this)}>
          {playlistNames}
        </ScrollView>
      </View>
    );
  }
}

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isPlaying: false,
    };
  }
  togglePlaying() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
  renderPlayingStatus() {
    if (this.state.isPlaying) {
      return (
        <View style={styles.playing}></View>
      );
    }
    return <View />;
  }
  handlePress() {
    this.togglePlaying();
    let data = {trackId: this.props.id};
    fetch(`${SERVER_ENDPOINT}/playsong`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(text => true)
      .catch(err => AlertIOS.alert('Error!', 'Tracks in PlaylistViewer.js... oops'));
  }
  handleDelete() {
    function onYes() {
      fetch(`${SERVER_ENDPOINT}/playlists/${this.props.playlistName}/${this.props.id}`, {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(json => {
          AlertIOS.alert('playlists', String(JSON.stringify(json, null, 2)));
          // this.props.updateParentState(json);
        })
        .catch(err => AlertIOS.alert('ERROR -- PlaylistViewer.js', err));
    }
    function onNo() {
      return;
    }
    AlertIOS.alert('Are you sure?', `Do you really want to delete "${this.props.title}" from "${this.props.playlistName}"?`,
      [{text: 'Yes', onPress: onYes.bind(this)}, {text: 'No', onPress: onNo}]);
  }
  render() {
    let artwork = this.props.artwork_url ? {uri:this.props.artwork_url} : require('../Assets/Pico-O-grey.png');
    return (
      <View style={styles.singleContainer}>
        {this.renderPlayingStatus()}
        <Image source={artwork} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.info}>{this.props.user.username}</Text>
          <Text style={styles.info}>{UI_HELPERS.makeHumanReadable(this.props.duration)}</Text>
        </View>
        <TouchableHighlight
          style={styles.deleteContainer}
          onPress={this.handleDelete.bind(this)}>
          <View>
            <Image source={BIN} style={styles.delete} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

class Separator extends React.Component {
  render() {
    return (
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
    );
  }
}

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: null
    };
  }
  updatenowPlaying(trackId) {
    this.setState({
      nowPlaying: trackId,
    });
  }
  updatePlaylistViewerState(updatedPlaylist){
    this.props.updateParentState(updatedPlaylist);
  }
  render() {
    let playlistName = Object.keys(this.props.data)[0];
    let list = this.props.data[playlistName].map((trackObj, index) => {
      return (
        <View>
          <Single
            key={index}
            {...trackObj}
            playlistName={playlistName}
            updateParentState={this.updatePlaylistViewerState.bind(this)}
            informParent={this.updatenowPlaying.bind(this)} />
          <Separator />
        </View>
      );
    });
    return (
      <View
        style={styles.tracksContainer}>
        <ScrollView
          onScroll={() => console.log('OnScroll activated!')}
          showVerticalScrollIndicator={true}
          informParent={this.updatePlaylistViewerState.bind(this)}>
          {list}
        </ScrollView>
      </View>
    );
  }
}

class PlaylistViewer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      nowViewing: this.props.initialPlaylist
    };
  }
  updateNowViewing(playlistName) {
    this.setState({
      nowViewing: playlistName
    });
  }
  updateResults(updatedPlaylists) {
    this.props.results = updatedPlaylists;
  }
  render() {
    // find nowViewing playlist data
    var nowViewingList = this.props.results.filter(playlistObj => {
      return Object.keys(playlistObj)[0] === this.state.nowViewing;
    })[0];
    var playlistNames = this.props.results.map(playlistObj => {
      return Object.keys(playlistObj)[0];
    });
    return (
      <View style={styles.playlistViewer}>
        <ScrollLists
          updateParentState={this.updateNowViewing.bind(this)}
          playlistNames={playlistNames}
          initialPlaylist={this.props.initialPlaylist}/>
        <Tracks
          updateParentState={this.updateResults.bind(this)}
          data={nowViewingList}
          updatePlaylistViewerState={this.updateNowViewing.bind(this)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewable: {
    marginTop: 20,
    color: '#FFF',
    fontSize: 16
  },
  floatingWindow: {
    width: 200,
    height: 100,
    marginTop: 30,
    backgroundColor: '#FFF'
  },
  windowText: {
    fontSize: 14,
    color: '#000'
  },
  playlistViewer:{
    marginTop: 30,
    flex: 1,
    backgroundColor: '#161c20'
  },
  currentPlaylist:{
    marginTop: 30,
    color: 'black',
    backgroundColor: '#ffa700'
  },
  playlistNameBtn: {
    height: 45,
    // marginLeft: 5,
    paddingTop: 5,
    paddingRight: 12,
    paddingBottom: 5,
    paddingLeft: 12,
    borderRightColor: STYLES.colors.PICO_GREEN,
    borderRightWidth: 1,
    // borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playlistNameBtnSelected: {
    height: 45,
    // marginLeft: 5,
    paddingTop: 5,
    paddingRight: 12,
    paddingBottom: 5,
    paddingLeft: 12,
    borderRightColor: STYLES.colors.PICO_GREEN,
    borderRightWidth: 1,
    backgroundColor: STYLES.colors.PICO_GREEN,
    // borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playlistNameText: STYLES.instantText,
  playlistNameTextSelected: {
    color: 'black',
    fontSize: 15
  },
  playlistText: {
    fontSize: 20
  },
  scrollListsContainer: {
    flex: 1,
    backgroundColor: '#161c20',
    marginTop: 30,
  },
  nowViewingContainer: {
    backgroundColor: STYLES.colors.PICO_GREEN,
    borderColor: STYLES.colors.ACCENT_GREEN,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 5,
    marginLeft: 2,
    marginRight: 2,
  },
  nowViewingBtnText: {
    color: '#333333',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  tracksContainer: {
    flex: 8,
    paddingTop: 10,
    padding: 5,
    backgroundColor: '#333333',
  },
  singleContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3
  },
  title: {
    color: '#f1f3f5',
    fontWeight: 'bold'
  },
  info: {
    color: '#abbbc6'
  },
  infoContainer: {
    flexDirection: 'column',
  },
  deleteContainer: {
    position: 'absolute',
    right: 0,
    bottom: 13,
    padding: 5,
    width: 30,
    height: 30,
    flexDirection: 'column',
    fontWeight: 'bold',
    backgroundColor: 'red',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  delete: {
    height: 18,
    width: 18
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 5
  },
  separator: {
    height: 1,
    width: 500,
    backgroundColor: '#1e262c'
  },
  separatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  playing: {
    backgroundColor: '#99FF00',
    width: 5,
    height: 50,
    marginRight: 1
  },
});

module.exports = PlaylistViewer;
