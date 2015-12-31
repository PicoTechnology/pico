const React = require('react-native');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;
const STYLES = require('../Assets/PicoStyles.js');
const SearchSoundCloud = require('./SearchSoundCloud.js');

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

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			retypePassword: ''
		};
	}
	handleSignup() {
		if(this.state.password === this.state.retypePassword) {
			let data = {
					username: this.state.username,
					password: this.state.password
			};
			fetch(`${SERVER_ENDPOINT}/signup`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(json => {
					if(json.result){
						this.props.navigator.push({
							title: 'Dashboard',
							component: SearchSoundCloud
						});
					} else {
						AlertIOS.alert('Error', 'Sign Up unsuccessful... Please try again later!');
					}
				})
		} else {
			AlertIOS.alert('Error', 'Please make sure your passwords match!');
		}
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
	handleRetypePw(event) {
		this.setState({
			retypePassword: event.nativeEvent.text
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
	 			<TextInput
					password={true}
					style={Object.assign({}, styles.loginInput, STYLES.textInput)}
					placeholder="RETYPE PASSWORD"
					placeholderTextColor="#cccccc"
					onChange={this.handleRetypePw.bind(this)}/>
				<TouchableHighlight
					onPress={this.handleSignup.bind(this)}
					style={Object.assign({}, styles.signUpButton, STYLES.signUpBtn)}
					underlayColor={STYLES.underlayColor}>
					<Text style={STYLES.signUpBtnText}> S I G N  U P  N O W</Text>
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
	signUpButton: {
		height: 45,
		marginTop: 10
	}
};

module.exports = Signup;
