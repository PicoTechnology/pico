'use strict';
const React = require('react-native');
const {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} = React;

/* set up album button for play and pause*/
class Button extends React.Component {
  renderButton() {
    const artwork = this.props.artwork_url ? this.props.artwork_url : "http://i569.photobucket.com/albums/ss139/schizotypic/NoAlbumArt.jpg";
    return (
      <TouchableHighlight>
        <Image source={{uri: artwork}} style={{width: 50, height: 50}} onClick={this.props.whenClicked}/>
      </TouchableHighlight>
    );
  }
}

/* set up single tracks component*/
class Single extends React.Component {
  /*handleClick() {
    this.setState({
      played: !this.state.played
    });
  } */ /* on click play and pause*/
  render() {
    return (
      <View>/* add flexbox styling later*/
        <Button whenClicked={this.handleClick} />
        <Text>id: {this.props.id}</Text>
        <Text>{this.props.title}</Text>
        <Text>{this.props.user.username}</Text>
      </View>
    );
  }
}

class Tracks extends React.Component{
  render() {
    /* grab the data and set it to a variable so we can spread it*/
    /* use let or const ?? and is the global data results name correct? */
    let list = this.props.results.map((tracksProps, index) =>
      <Single key={index} {...tracksProps} />
    );
    return (
      <ScrollView
        onScroll={() => console.log('OnScroll activated!')}
        showVerticalScrollIndicator={true}>
        {list}
      </ScrollView>
    );
  }
}

module.exports = Tracks;