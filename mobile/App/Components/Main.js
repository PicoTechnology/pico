const React = require('react-native');
const Login = require('./Login.js');
const Search = require('./SearchSoundCloud.js');
const Track = require('./Track.js');

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
  entranceButton(){
    this.props.navigator.push({
      component: Login,
      title: 'Login'
  });
    }
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.bgImageWrapper}>
                <Image style={styles.bgImage} source={require('../Assets/splash-screen.jpg')}/>
            </View>
            <TouchableHighlight
              style={styles.button}
              onPress={this.entranceButton.bind(this)}
              underlayColor="white">
              <Text style={styles.buttonText}> Entrance Button </Text>
            </TouchableHighlight>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#96FFAB',
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
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = Main;
