'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const dbHelper = require('../../../server/database-helpers.js');

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

var playlists = [];

class List extends React.Component {
  handlePress() {
    let playlistname = {this.props.playlistName};
    fetch(`${SERVER_ENDPOINT}/playlists/:playlistname`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      body: JSON.stringify(playlistname);
    })
      .then(res => playlists.push(res.text()))
      .catch(err => AlertIOS.alert('Error!', 'Unable to get playlist.'));
  }
  render() {
    return (
      <TouchableHighlight onPress={this.handlePress.bind(this)}
        <View>
          <Text>{this.props.playlistName}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class ScrollLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowViewing: null;
    };
  }
  updateNowViewing(playlistName) {
    this.setState({
      nowViewing: playlistName;
    })
  }
  render() {
    let list = this.props.playlists.map((playlistObj, index) => {
      return (
          <View>
            <List key={index} {...playlistObj} />
          </View>
      );
    });
    return (
      <View>
        <ScrollView horizontal={true} informParent={this.updateNowViewing.bind(this)}> {list} </ScrollView>
      </View>
    )
  }
}


class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isPlaying: false
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
      .catch(err => AlertIOS.alert('Error!', 'Track.js... oops'));
  }
  handleDelete() {
    let data = {
      playlistname: this.props.playlistName,
      trackId: this.props.id
    };
      fetch(`${SERVER_ENDPOINT}/Playlists/${playlistname}/${trackId}`, {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(data);
      })
  }
  makeHumanReadable(ms) {
    let minutesRaw = ms/1000/60;
    let minutesPure = Math.floor(minutesRaw);
    let secondsRaw = minutesRaw % minutesPure * 60;
    let secondsPure = '0' + secondsRaw.toFixed(0);
    var endOfString = secondsPure.length - 1;
    secondsPure = secondsPure.charAt(endOfString) + secondsPure.charAt(endOfString - 1);
    return `${minutesPure}:${secondsPure}`;
  }
  render() {
    let artwork = this.props.artwork_url ? {uri:this.props.artwork_url} : require("../Assets/Pico-O-grey.png");
    return (
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View style={styles.singleContainer}>
          {this.renderPlayingStatus()}
          <Image source={artwork} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.info}>{this.props.user.username}</Text>
            <Text style={styles.info}>{this.makeHumanReadable(this.props.duration)}</Text>
            <Text onPress={this.handleDelete.bind(this)}>Delete</Text>
          </View>
        </View>
      </TouchableHighlight>
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
  render() {
    let list = this.props.playlist.playlistTracks.map((trackObj, index) => {
      return (
        <View>
          <Single key={index} {...trackObj} informParent={this.updatenowPlaying.bind(this)} />
          <Separator />
        </View>
      );
    });
    return (
      <View
        style={styles.mainContainer}>
        <ScrollView
          onScroll={() => console.log('OnScroll activated!')}
          showVerticalScrollIndicator={true}>
          {list}
        </ScrollView>
        {/* Keep the following component for debugging! */}
        <View style={styles.floatingMessage}>
          <Text style={styles.messageText}>{this.state.nowPlaying}</Text>
          <Text style={styles.messageText}>{queue.storage}</Text>
        </View>
      </View>
    );
  }
}

class PlayList extends React.Component{
  render() {
    return (
      <ScrollList />
      <Tracks />
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    backgroundColor: '#161c20',
  },
  singleContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3
  },
  floatingMessage: {
    position: 'absolute',
    width: 200,
    height: 100,
    top: 100,
    left: 100,
    backgroundColor: '#FFF'
  },
  messageText: {
    fontSize: 16,
    color: '#000'
  },
  single: {
    flexDirection: 'row',
    margin: 2,
    borderWidth: 2,
    borderColor: '#4e6472',
    justifyContent: 'center',
  },
  title: {
    color: '#f1f3f5',
    fontWeight: 'bold'
  },
  info: {
    color: '#abbbc6',
  },
    infoContainer: {
    flexDirection: 'column'
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 5,
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
  }
});

module.exports = PlayList;
