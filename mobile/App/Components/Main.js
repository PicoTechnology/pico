const React = require('react-native');
const Login = require('./Login.js');
const Track = require('./Tracks.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;

const Glyphicon = require('./Glyphicon.js');

const {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} = React;

const {width, height} = Dimensions.get('window');

class Main extends React.Component {
  entranceButton() {
    this.props.navigator.push({
      component: Login,
      title: 'Login'
    });
    // fetch(`${SERVER_ENDPOINT}/connect`)
    //   .then(res => res.json())
    //   .then(json => {
    //     this.props.navigator.push({
    //       component: Login,
    //       title: 'Login'
    //     });
    //   })
    //   .catch(err => AlertIOS.alert('Error', err));
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image style={styles.bgImage} source={require('../Assets/tealSpeaker.jpg')}/>
        </View>
        <TouchableHighlight
          onPress={this.entranceButton.bind(this)}
          underlayColor="rgba(0,0,0,0)">
          <Image source={require('../Assets/PicoLogo-Medium.png')}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  glyphicon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
      flex: 1,
      padding: 30,
      backgroundColor: 'black',
      flexDirection: 'column',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center'
  },
  bgImageWrapper: {
      position: 'absolute',
      bottom: 0, left: 0
  },
  bgImage: {
      flex: 1,
      width, height
  },
  // buttonText: {
  //   fontSize: 18,
  //   color: '#black',
  //   alignSelf: 'center',
  //   fontFamily: 'helvetica'
  // },
  // button: {
  //   height: 45,
  //   flexDirection: 'row',
  //   backgroundColor: '#99FF00',
  //   borderColor: 'black',
  //   borderWidth: 2,
  //   borderRadius: 8,
  //   marginBottom: 10,
  //   marginTop: 10,
  //   marginLeft: 10,
  //   marginRight: 10,
  //   alignSelf: 'stretch',
  //   justifyContent: 'center'
  // }
});

module.exports = Main;
