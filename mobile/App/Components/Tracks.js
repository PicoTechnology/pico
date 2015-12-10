'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

/* set up single tracks component*/
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
        <Text>Now playing: {this.props.id}</Text>
      );
    }
    return <View />;
  }
  handlePress() {
    this.props.informParent(this.props.id);
    // if no other songs are playing, play the current song
    // otherwise, if songs are playing, add the pressed song
    // to the global queue
    this.togglePlaying();
    let data = {a: 'pizza'};
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
  render() {
    let artwork = this.props.artwork_url ? this.props.artwork_url : "http://i569.photobucket.com/albums/ss139/schizotypic/NoAlbumArt.jpg";
    return (
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View>
          {this.renderPlayingStatus()}
          <Image source={{uri: artwork}} style={{width: 50, height: 50}} onClick={this.props.whenClicked}/>
          <Text>id: {this.props.id}</Text>
          <Text>{this.props.title}</Text>
          <Text>{this.props.user.username}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class Tracks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: null
    };
  }
  updatenowPlaying(trackId) {
    this.setState({
      nowPlaying: trackId
    });
  }
  render() {
    let list = this.props.results.map((trackObj, index) =>
      <Single key={index} {...trackObj} informParent={this.updatenowPlaying.bind(this)} />
    );
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
    marginTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'orange'
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
    color: 'white'
  }
});

module.exports = Tracks;
