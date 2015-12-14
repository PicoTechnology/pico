const React = require('react-native');

const {
	View,
	Text,
	StyleSheet
} = React;

class CurrentlyPlaying extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Now playing...{this.props.id}</Text>
				<Text>Now playing...{this.props.id}</Text>
				<Text>Now playing...{this.props.id}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'red'
	}
});

module.exports = CurrentlyPlaying;