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
			<View style={styles.bgImageWrapper}>
					<Image style={styles.bgImage} source={require('../Assets/login.jpg')}/>
			</View>
				<Text style={styles.title}></Text>
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
					underlayColor="#75ACB5">
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
		backgroundColor: 'gba(0,0,0,0)'
	},
	loginInput: {
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
	buttonText: {
		fontSize: 18,
		color: 'black',
		alignSelf: 'center',
		fontWeight: 'bold'
	},
	button: {
		height: 45,
		flexDirection: 'row',
		backgroundColor: '#99FF00',
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
});

module.exports = Login;
