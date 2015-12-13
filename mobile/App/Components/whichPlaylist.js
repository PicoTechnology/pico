'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Queue = require('./Queue.js');

const {
  AlertIOS,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

var playlistQ = new Queue;

class Playlist extends React.component {
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