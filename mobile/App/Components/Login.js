const React = require('react-native');
const SearchSoundCloud = require('./SearchSoundCloud.js');
const SERVER_ENDPOINT = require('../Auth/endpoints.js').serverEndpoint;

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
					AlertIOS.alert('Error', 'Authentication unsuccessful...');
				}
			})
			.catch(err => AlertIOS.alert('Error', err));
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
				<Text style={styles.title}></Text>
				<TextInput
					style={styles.loginInput}
					placeholder="Username"
					placeholderTextColor="#f2f2f2"
					onChange={this.handleUsername.bind(this)}/>
	 			<TextInput
					password={true}
					style={styles.loginInput}
					placeholder="Password"
					placeholderTextColor="#f2f2f2"
					onChange={this.handlePw.bind(this)}/>
				<TouchableHighlight
					onPress={this.handlePress.bind(this)}
					style={styles.button}
					underlayColor="#00E6E6">
					<Text style={styles.buttonText}> L O G I N </Text>
				</TouchableHighlight>
			</View>
		);
	}
}

var styles = StyleSheet.create({
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
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#1693A5',
		backgroundColor: 'rgba(0,0,0,0)'
	},
	loginInput: {
		height: 50,
		paddingLeft: 10,
		marginBottom: 10,
		fontSize: 20,
		borderWidth: 1,
		borderColor: '#00E6E6',
		backgroundColor: 'black',
		opacity: .85,
		borderRadius: 8,
		fontFamily: 'Bosun'
	},
	buttonText: {
		fontSize: 18,
		color: 'black',
		fontFamily: 'Bosun',
		alignSelf: 'center',
		fontWeight: 'bold'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: '#00ffff',
		opacity: .9,
		borderColor: '#00E6E6',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
});

module.exports = Login;
