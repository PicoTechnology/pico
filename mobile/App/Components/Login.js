const React = require('react-native');
const SearchSoundCloud = require('./SearchSoundCloud.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const STYLES = require('../Assets/PicoStyles.js');

const {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	NavigatorIOS,
	Dimensions,
	StyleSheet,
	AlertIOS,
	Image
} = React;

const {width, height} = Dimensions.get('window');

class Login extends React.Component {
	constructor(props) {
	super(props);
		this.state = {
			username: '',
			password: ''
		};
	}
	handlePress() {
		fetch(`${SERVER_ENDPOINT}/users`, {
			headers: {
				'Accept': 'application/json',
      	'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(json => {
				if(json.result){
					this.props.navigator.push({
						title: 'Search SC',
						component: SearchSoundCloud
					});
				} else {
					AlertIOS.alert('Error', 'Authentication unsuccessful... Please try again!');
				}
			})
			.catch(err => AlertIOS.alert('Error', err));
	}
	handleSignup() {
		fetch(`${SERVER_ENDPOINT}/signup`, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(this.state)
		})
			.then(res => res.json())
			.then(json => {
				if(json.result){
					this.props.navigator.push({
						title: 'Search SC',
						component: SearchSoundCloud
					});
				} else {
					AlertIOS.alert('Error', 'Sign Up unsuccessful... Please try again later!');
				}
			})
	}
	handleUsername(event) {
		this.setState({
			username: event.nativeEvent.text
		});
	}
	handlePw(event) {
		this.setState({
			password: event.nativeEvent.text
		});
	}
	render() {
		return (
			<View style={styles.mainContainer}>
				<View style={styles.bgImageWrapper}>
					<Image style={styles.bgImage} source={require('../Assets/login.jpg')}/>
				</View>
				<TextInput
					style={Object.assign({}, styles.loginInput, STYLES.textInput)}
					autoCorrect={false}
					placeholder="USERNAME"
					placeholderTextColor="#cccccc"
					onChange={this.handleUsername.bind(this)}/>
	 			<TextInput
					password={true}
					style={Object.assign({}, styles.loginInput, STYLES.textInput)}
					placeholder="PASSWORD"
					placeholderTextColor="#cccccc"
					onChange={this.handlePw.bind(this)}/>
				<TouchableHighlight
					onPress={this.handlePress.bind(this)}
					style={Object.assign({}, styles.loginButton, STYLES.submitBtn)}
					underlayColor={STYLES.underlayColor}>
					<Text style={STYLES.submitBtnText}> L O G I N </Text>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={this.handleSignup.bind(this)}
					style={Object.assign({}, styles.loginButton, STYLES.submitBtn)}
					underlayColor={STYLES.underlayColor}>
					<Text style={STYLES.submitBtnText}> S I G N  U P </Text>
				</TouchableHighlight>
			</View>
		);
	}
}

var styles = {
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
	loginInput: {
		height: 50,
		paddingLeft: 10,
		marginBottom: 10
	},
	loginButton: {
		height: 45,
		marginBottom: 10,
		marginTop: 10,
	}
};

module.exports = Login;
