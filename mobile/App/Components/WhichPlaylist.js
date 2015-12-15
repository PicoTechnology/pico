const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const Separator = require('./Separator.js');

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
    let playlistname = {};
    this.toggleSelected;
    fetch(`${SERVER_ENDPOINT}/playlist/${playlistname}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then()
      .then(res => res.json())
      .then(json => true)
      .catch(err => AlertIOS.alert('Error', 'Error adding song to playlist...apologies!'));
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
      <View>
        <View>
          <TouchableHighlight>
            <Text style={styles.instantText}>Play Now</Text>
          </TouchableHighlight>
          <TouchableHighlight>
            <Text style={styles.instantText}>Add to Queue</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class WhichPlaylist extends React.Component {
  render() {
    let list = this.props.playlists.map((playlist, index) => {
      return (
        <View key={index}
          style={styles.playlistContainer}>
          <Playlist data={playlist} />
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
          <Instant style={styles.instantContainer}/>
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
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'center'
  },
  infoContainer: {
    flexDirection: 'column'
  },
  title: {
    color: '#f1f3f5',
    fontWeight: 'bold'
  },
  instantContainer: {
    flexDirection: 'row',
    width: .5,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: '#f1f3f5',
  },
  instantText: {
    color: '#161c20',
    fontWeight: 'bold'
  }
});

module.exports = WhichPlaylist;