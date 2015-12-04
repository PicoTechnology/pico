const React = require('react-native');

const {
	View,
	Dimensions,
	Image,
	Text,
	StyleSheet
} = React;

const {width, height} = Dimensions.get('window');

class Main extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.bgImageWrapper}>
					<Image
						style={styles.bgImage}
						source={require('../Assets/splash-screen.jpg')}/>
				</View>
				<Text>
					This is some test with React-Native
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#96FFAB',
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
	}
});

module.exports = Main;
