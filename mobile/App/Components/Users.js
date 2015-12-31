'use strict';
const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Queue = require('./Queue.js');
const CurrentlyPlaying = require('./CurrentlyPlaying.js');
const WhichPlaylist = require('./WhichPlaylist.js');
const Separator = require('./Separator.js');
const STYLES = require('../Assets/PicoStyles.js');
const UI_HELPERS = require('../Utils/UiHelpers.js');

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
const Single = props => {
  return (
    <View style={STYLES.singleContainer}>
      <View style={STYLES.infoContainer}>
        <Text style={STYLES.singleTitle}>username: {props.username}</Text>
        <Text style={STYLES.singleTitle}>online: {String(props.online)}</Text>
      </View>
      <Separator />
    </View>
  );
};

const Users = props => {
  let users = props.users.map(user => <Single {...user}/>);
  return (
    <View style={STYLES.mainScrollContainer}>
      <View style={styles.scrollContainer}>
        <ScrollView
          showVerticalScrollIndicator={true}>
          {users}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScrollContainer: {
    flex: 1,
    backgroundColor: '#333333'
  },
  scrollContainer: {
    flex: 1
  },
  currentlyPlayingContainer: {
    flex: 1,
    height: 100,
  },
  single: {
    flexDirection: 'row',
    margin: 2,
    borderWidth: 2,
    borderColor: '#cccccc',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'column'
  },
  playing: {
    backgroundColor: '#99FF00',
    width: 5,
    height: 50,
    marginRight: 1
  }
});

module.exports = Users;