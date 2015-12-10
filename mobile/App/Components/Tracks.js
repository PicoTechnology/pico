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
        <View style={{flexDirection: 'row'}}>
          {this.renderPlayingStatus()}
          <Image source={{uri: artwork}} style={styles.image} onClick={this.props.whenClicked}/>
          <View style={styles.infoContainer}>
            <Text>id: {this.props.id}</Text>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.info}>{this.props.user.username}</Text>
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
    let list = this.props.results.map((trackObj, index) => {
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    backgroundColor: '#263138',
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
    color: '#b7c4cd',
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
    color: '#465966'
  },
  separatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

module.exports = Tracks;
