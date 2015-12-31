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
      isLoading: false
    };
  }
  entranceButton() {
    this.setState({isLoading: true});
    fetch(`${SERVER_ENDPOINT}/connect`)
      .then(res => res.json())
      .then(json => {
        this.setState({isLoading: false});
        this.props.navigator.push({
          component: Login,
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
          <Image style={styles.bgImage} source={require('../Assets/Speaker-Gold.png')}/>
        </View>
        {this.renderEntranceButton()}
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color={STYLES.colors.PICO_GREEN}
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
