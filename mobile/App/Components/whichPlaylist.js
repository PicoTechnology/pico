'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Queue = require('./Queue.js');
const Tracks = require('./Tracks.js');

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

// var playlistQ = new Queue;

// set up single playlist component
class Playlist extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      queue: new Queue
    };
  }
  toggleSelected() {
    this.setState({
      isSelected: !this.state.isSelected
    });
    if (this.state.isSelected) {
      // add selected song to playlist's queue
      this.setState({
        queue: queue.enqueue({this.props.songData});
      })
    }
  }
  handlePress() {
    this.toggleSelected;
  }

  render() {
    return(
      <TouchableHighlight
        onPress={this.handlePress.bind(this)}>
        <View style={styles.playlistContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.props.playlistName}</Text>
          </View>
        </View>
    );
  }
}

class AddToQueue extends React.component {
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
  render() {
    return (
    );
  }
}

class Options extends React.component {
  render() {
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
        onScroll={() => console.log('Playlist OnScroll activated!')}
        showVerticalScrollIndicator={true}>
        {list}
      </ScrollView>
      {/* Keep the following component for debugging! */}
      <View style={styles.floatingMessage}>
        <Text style={styles.messageText}>{this.state.nowPlaying}</Text>
        <Text style={styles.messageText}>{queue.storage}</Text>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    backgroundColor: '#161c20',
  },
  playlistContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3
  },
  addToQueueContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3
  },
  infoContainer: {
    flexDirection: 'column'
  },
  title: {
    color: '#f1f3f5',
    fontWeight: 'bold'
  }