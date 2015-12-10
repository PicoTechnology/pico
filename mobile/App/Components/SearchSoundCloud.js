const React = require('react-native');
const Tracks = require('./Tracks.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;

const {
  AlertIOS,
  ActivityIndicatorIOS,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  NavigatorIOS,
  Dimensions,
  StyleSheet
} = React;

const {width, height} = Dimensions.get('window');

class SearchSoundCloud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isLoading: false,
      error: '',
    };
  }
  clearInputFields() {
    this._searchInput.setNativeProps({text: ''});
  }
  handleSubmit() {
    this.clearInputFields();
    this.setState({isLoading: true});
    let data = {query: this.state.query};
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
  handleChange(event) {
    this.setState({
      query: event.nativeEvent.text
    });
  }
  renderError() {
    if (this.state.error) {
      return (
        <Text
          style={styles.error}>
          {this.state.error}
        </Text>
      );
    }
    return <View></View>;
  }
  render() {
    return (
      <View
        style={styles.mainContainer}>
        <TextInput
          ref={component => this._searchInput = component}
          style={styles.searchInput}
          onChange={this.handleChange.bind(this)}
          placeholder="Search SoundCloud.com..." />
        <View style={styles.spinnerContainer}>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#FFF"
            size="small" />
        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor='#aeff00'>
          <Text
            style={styles.buttonText}>
            Search
          </Text>
        </TouchableHighlight>
        {this.renderError()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#99FF00',
    borderRadius: 8,
    color: 'white'
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
    justifyContent: 'center'
  },
  content: {
    fontSize: 14,
    color: '#FFF'
  },
  error: {
    fontSize: 18,
    color: '#black'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '99FF00',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = SearchSoundCloud;
