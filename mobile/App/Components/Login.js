const React = require('react-native');
const SearchSoundCloud = require('./SearchSoundCloud.js');

const {
	View,
	Text,
	TextInput,
	TouchableHighlight,
	NavigatorIOS,
	Dimensions,
	StyleSheet,
	AlertIOS
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
		AlertIOS.alert('Alert!', JSON.stringify(this.state, null, 2));
		fetch('http://localhost:8000/users', {
			headers: {
				'Accept': 'application/json',
      	'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(this.state)}
		)
			.then(res => {
				this.props.navigator.push({
					title: 'Search SC',
					component: SearchSoundCloud
				});
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
				<Text style={styles.title}>Access Your Account</Text>
				<TextInput
					style={styles.loginInput}
					placeholder="Username"
					placeholderTextColor="#FFF"
					onChange={this.handleUsername.bind(this)}/>
	 			<TextInput
					password={true}
					style={styles.loginInput}
					placeholder="Password"
					placeholderTextColor="#FFF"
					onChange={this.handlePw.bind(this)}/>
				<TouchableHighlight
					onPress={this.handlePress.bind(this)}
					style={styles.button}
					underlayColor="white">
					<Text style={styles.buttonText}> LOGIN </Text>
				</TouchableHighlight>
			</View>
		);
	}
};

var styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		padding: 30,
		marginTop: 65,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: 'black'
	},
	title: {
		marginBottom: 20,
		fontSize: 25,
		textAlign: 'center',
		color: '#fff'
	},
	loginInput: {
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

module.exports = Login;
