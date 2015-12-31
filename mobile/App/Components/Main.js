const React = require('react-native');
const Login = require('./Login.js');
const STYLES = require('../Assets/PicoStyles.js');

const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;

const {
  AlertIOS,
  ActivityIndicatorIOS,
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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loggedIn: false
    };
  }
  updateLoggedIn(status) {
    this.setState({loggedIn: status});
  }
  entranceButton() {
    this.setState({isLoading: true});
    fetch(`${SERVER_ENDPOINT}/connect`)
      .then(res => res.json())
      .then(json => {
        this.setState({isLoading: false});
        this.props.navigator.push({
          component: Login,
          passProps: {
            updateParentLoggedIn: this.updateLoggedIn.bind(this)
          },
          title: 'Login'
        });
      })
      .catch(err => AlertIOS.alert('Error', err));
  }
  renderEntranceButton() {
    if (this.state.isLoading) {
      return <View />
    }
    return (
      <TouchableHighlight
        onPress={this.entranceButton.bind(this)}
        underlayColor="rgba(0,0,0,0)">
        <Image source={require('../Assets/PicoLogo-Medium.png')}/>
      </TouchableHighlight>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image style={styles.bgImage} source={require('../Assets/main-bg.jpg')}/>
        </View>
        {this.renderEntranceButton()}
        <ActivityIndicatorIOS
          style={STYLES.spinner}
          animating={this.state.isLoading}
          color={STYLES.colors.TOBIN}
          size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

module.exports = Main;
