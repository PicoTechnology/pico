const React = require('react-native');
const Tracks = require('./Tracks.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const STYLES = require('../Assets/PicoStyles.js');

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
            <Image style={styles.bgImage} source={require('../Assets/searchBarBlackBG.png')}/>
        </View>
        <TextInput
          ref={component => this._searchInput = component}
          style={Object.assign({}, styles.searchInput, STYLES.textInput)}
          onChange={this.handleChange.bind(this)}
          placeholder="search soundcloud.com" />
        <View style={styles.spinnerContainer}>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color={STYLES.colors.PICO_GREEN}
            size="large" />
        </View>
        <TouchableHighlight
          style={Object.assign({}, styles.button, STYLES.submitBtn)}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='#aeff00'>
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={Object.assign({}, styles.button, STYLES.submitBtn)}
          onPress={this.handleLogout.bind(this)}
          underlayColor='#aeff00'>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
        {this.renderError()}
      </View>
    );
  }
}

const styles = {
  loginIcon: {
    marginBottom: -40,
    height: 50,
    left: 90,
    position: 'relative',
    top: -21,
    width: 16
  },
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
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'stretch'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  content: {
    fontSize: 14,
    color: '#FFF'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  button: {
    height: 45,
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10
  },
};

module.exports = SearchSoundCloud;
