const React = require('react-native');
const Tracks = require('./Tracks.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const STYLES = require('../Assets/PicoStyles.js');
const Users = require('./Users.js');
const SongQueue = require('./SongQueue.js');

const {
  AlertIOS,
  ActivityIndicatorIOS,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  Image
} = React;

const {width, height} = Dimensions.get('window');

class SearchSoundCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isLoading: false,
      error: ''
    };
  }
  clearInputFields() {
    this._searchInput.setNativeProps({text: ''});
  }
  handleSubmit() {
    this.clearInputFields();
    this.setState({isLoading: true});
    let data = {q: this.state.query, downloadable: true};
    fetch(`${SERVER_ENDPOINT}/tracks`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
          error: ''
        });
        this.props.navigator.push({
          title: 'Results',
          passProps: {results: json},
          component: Tracks
        });
      })
      .catch(err => {
        this.setState({isLoading: false, error: err})
      });
  }
  handleLogout() {
    let data = this.props.userObj;
    this.setState({isLoading: true});
    fetch(`${SERVER_ENDPOINT}/disconnect`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        const Main = require('./Main.js');
        this.setState({
          isLoading: false,
          error: ''
        });
        this.props.navigator.push({
          title: 'Pico Technology',
          component: Main
        });
      })
      .catch(err => {
        this.setState({isLoading: false, error: err})
      });
  }
  handleChange(event) {
    this.setState({
      query: event.nativeEvent.text
    });
  }
  handleToQueue() {
    fetch(`${SERVER_ENDPOINT}/partyplaylist`)
      .then(res => res.json())
      .then(json => {
        this.props.navigator.push({
          title: 'Party',
          passProps: {queue: json},
          component: SongQueue
        });
      })
      .catch(err => AlertIOS.alert('Error', err));
  }
  handleViewUsers() {
    fetch(`${SERVER_ENDPOINT}/users`)
      .then(res => res.json())
      .then(json => {
        this.props.navigator.push({
          title: 'Users',
          passProps: {users: json},
          component: Users
        });
      })
      .catch(err => AlertIOS.alert('Error', err));
  }
  renderError() {
    if (this.state.error) {
      return (
        <Text
          style={STYLES.error}>
          {this.state.error}
        </Text>
      );
    }
    return <View />;
  }
  render() {
    return (
      <View
        style={styles.mainContainer}>
        <View style={styles.bgImageWrapper}>
            <Image style={styles.bgImage} source={require('../Assets/search-bg.jpg')}/>
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Welcome back,
            <Text style={styles.username}>{this.props.userObj.username}!</Text>
          </Text>
        </View>
        <TextInput
          ref={component => this._searchInput = component}
          style={Object.assign({}, styles.searchInput, STYLES.textInput)}
          onChange={this.handleChange.bind(this)}
          placeholder="search soundcloud.com" />
        <TouchableHighlight
          style={Object.assign({}, STYLES.searchBtn, STYLES.submitBtn)}
          onPress={this.handleSubmit.bind(this)}
          underlayColor={STYLES.colors.ACCENT_GREEN}>
          <Text
            style={STYLES.submitBtnText}>
            S E A R C H
          </Text>
        </TouchableHighlight>
        <View style={styles.spinnerContainer}>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color={STYLES.colors.PICO_GREEN}
            size="large" />
        </View>
        {this.renderError()}

        <View
          style={styles.dashboardContainer}>
          <TouchableHighlight
            onPress={this.handleToQueue.bind(this)}
            style={Object.assign({}, STYLES.signUpBtn, STYLES.dashBtn)}
            underlayColor={STYLES.colors.ACCENT_GREEN}>
            <Text
              style={Object.assign({}, STYLES.signUpBtnText, STYLES.dashBtnText)}>
              PARTY QUEUE
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.handleViewUsers.bind(this)}
            style={Object.assign({}, STYLES.signUpBtn, STYLES.dashBtn)}
            underlayColor={STYLES.colors.ACCENT_GREEN}>
            <Text
              style={Object.assign({}, STYLES.signUpBtnText, STYLES.dashBtnText)}>
              ACTIVE USERS
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={Object.assign({}, STYLES.signUpBtn, STYLES.dashBtn)}
            onPress={this.handleLogout.bind(this)}
            underlayColor={STYLES.colors.ACCENT_GREEN}>
            <Text
              style={Object.assign({}, STYLES.signUpBtnText, STYLES.dashBtnText)}>
              LOGOUT
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  bgImageWrapper: {
      position: 'absolute',
      bottom: 0, left: 0
  },
  bgImage: {
      flex: 1,
      width, height
  },
  searchInput: {
    height: 50,
    paddingLeft: 10,
    marginBottom: 10
  },
  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  dashboardContainer: {
    flex: 'auto',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  greetingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingBottom: 15
  },
  greetingText: {
    color: STYLES.colors.TOBIN,
    fontSize: 22,
    paddingRight: 8
  },
  username: {
    fontWeight: 'bold'
  }
};

module.exports = SearchSoundCloud;
