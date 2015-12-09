'use strict';
const React = require('react-native');

const {
  Image,
  Text,
  View,
  Scrollview,
  StyleSheet,
  TouchableHighlight
} = React;
​
/* set up album button for play and pause*/
class Button extends React.Component {
  renderButton() {
    const artwork = this.props.artwork_url ? this.props.artwork_url : "http://i569.photobucket.com/albums/ss139/schizotypic/NoAlbumArt.jpg";
    return (
      <TouchableHighlight>
        <Image source={{uri: artwork}} style={{width: 50, height: 50}} onClick={this.props.whenClicked}/>
      </TouchableHighlight>
    )
  }
}
​
/* set up single track component*/
class Track extends React.Component {
  /*handleClick() {
    this.setState({
      played: !this.state.played
    });
  } */ /* on click play and pause*/
  render() {
    return (
      <View>/* add flexbox styling later*/
        <Button whenClicked={this.handleClick} />
        <Text>{this.props.title}</Text>
        <Text>{this.props.user.username}</Text>
      </View>
    );
  }
}
​
class Page extends React.Component{
  render() {
    /* grab the data and set it to a variable so we can spread it*/
    /* use let or const ?? and is the global data storage name correct? */
    let list = this.props.storage.map((trackProps, index) =>
      <Track key={index} {...trackProps} />
  );
    return (
      /* create Scrollview, make sure to set page size, map over data and put it in track component*/
      <Scrollview
        onScroll={() => { console.log('OnScroll activated!')
        showVerticalScrollIndicator={true}
        }}>
        {list}
      </Scrollview>
    );
  }
}


module.exports = ScrollViewDisplay;
