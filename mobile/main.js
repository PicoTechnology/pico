'use strict';

const React = require('react-native');
const {
  AppRegistry,
  View,
  StyleSheet
} = React;

const Main = require('./App/Components/Main.js');

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('main', () => App);