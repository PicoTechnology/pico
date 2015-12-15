'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Queue = require('./Queue.js');
const CurrentlyPlaying = require('./CurrentlyPlaying.js');
const WhichPlaylist = require('./WhichPlaylist.js');
const Separator = require('./Separator.js');

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

var queue = new Queue;

/* set up single tracks component*/
class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isPlaying: false,
      isWpVisible: false
    };
  }
  togglePlaying() {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
  toggleWpVisible() {
    this.setState({
      isWpVisible: !this.state.isWpVisible
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
    this.toggleWpVisible();
    // let playlistname = 'test1';
    // let data = {trackID: this.props.id};
    // fetch(`${SERVER_ENDPOINT}/playlist/${playlistname}`, {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // })
    //   .then(res => res.json())
    //   .then(json => true)
    //   .catch(err => AlertIOS.alert('Error', 'Error adding song to playlist...apologies!'));
    // if no other songs are playing, play the current song
    // otherwise, if songs are playing, add the pressed song
    // to the global queue

    // this.props.informParent(this.props);
    // if(queue.isQueued(this.props.id)){
    //   queue.removeItem(this.props.id);
    // } else {
    //   queue.enqueue(this.props.id);
    // }
    // this.togglePlaying();
    // fetch(`${SERVER_ENDPOINT}/playsong`, {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(data)
    // })
    //   .then(res => res.text())
    //   .then(text => true)
    //   .catch(err => AlertIOS.alert('Error!', 'Track.js... oops'));
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
  renderWhichPlaylist() {
    let wp = <View/>;
    if (this.state.isWpVisible) {
      wp = <WhichPlaylist playlists={this.props.playlists} />
    }
    return wp;
  }
  render() {
    let artwork = this.props.artwork_url ? {uri:this.props.artwork_url} : require("../Assets/Pico-O-grey.png");
    return (
      <View>
        <TouchableHighlight
          onPress={this.handlePress.bind(this)}>
          <View style={styles.singleContainer}>
            {this.renderPlayingStatus()}
            <Image source={artwork} style={styles.image} onClick={this.props.whenClicked}/>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.info}>{this.props.user.username}</Text>
              <Text style={styles.info}>{this.makeHumanReadable(this.props.duration)}</Text>
            </View>
          </View>
        </TouchableHighlight>
        {this.renderWhichPlaylist()}
      </View>
    );
  }
}

class Tracks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: null,
      playlists: []
    };
  }
  componentDidMount() {
    fetch(`${SERVER_ENDPOINT}/playlists`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          playlists: [].concat(json)
        })
      });
  }
  updateNowPlaying(trackObj) {
    this.setState({
      nowPlaying: trackObj,
    });
  }
  render() {
    let list = this.props.results.map((trackObj, index) => {
      return (
        <View>
          <Single
            key={index} {...trackObj}
            informParent={this.updateNowPlaying.bind(this)}
            playlists={this.state.playlists} />
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
        <CurrentlyPlaying {...this.state.nowPlaying} />
      </View>
    );
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
  playing: {
    backgroundColor: '#99FF00',
    width: 5,
    height: 50,
    marginRight: 1
  }
});

module.exports = Tracks;
