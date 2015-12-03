const React = require('react-native');

const {
	View,
	Text,
	StyleSheet
} = React;

class Main extends React.Component {
	render() {
		return (
			<View style={styles.container}>
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
		justifyContent: 'center',
		alignItems: 'center'
	}
});

module.exports = Main;