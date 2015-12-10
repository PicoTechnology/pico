'use strict';
const React = require('react-native');
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
        <Text>Playing</Text>
      );
    }
    return <View />;
  }
  handlePress() {
    AlertIOS.alert('Pressed!', '...');
    this.togglePlaying();
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
  render() {
    let list = this.props.results.map((tracksProps, index) =>
      <Single key={index} {...tracksProps} />
    );
    return (
      <View
        style={styles.mainContainer}>
        <ScrollView
          onScroll={() => console.log('OnScroll activated!')}
          showVerticalScrollIndicator={true}>
          {list}
        </ScrollView>
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
  single: {
    color: 'white'
  }
});

module.exports = Tracks;
