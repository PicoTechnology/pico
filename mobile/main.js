'use strict';

const React = require('react-native');

const {
  AppRegistry,
  View,
  StyleSheet,
  NavigatorIOS,
  Text
} = React;

const Main = require('./App/Components/Main.js');

class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Pico Technology',
          component: Main
      }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('main', () => App);
