const React = require('react-native');

const {
	AlertIOS,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  NavigatorIOS,
  Dimensions,
  StyleSheet
} = React;

const SearchBar = require('./SearchBar.js');
const Tracks = require('./Tracks.js');

const {width, height} = Dimensions.get('window');

class SearchSoundCloud extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: []
		};
	}
	updateState(scResults) {
		this.setState({
			results: this.state.results.concat(scResults)
		});
	}
	render() {
		return (
			<View>
				<SearchBar updateParentState={this.updateState.bind(this)} />
				<Tracks results={this.state.results} />
			</View>
		);
	}
}

module.exports = SearchSoundCloud;

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
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
	title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
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
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = SearchBar;
