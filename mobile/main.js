'use strict';

const React = require('react-native');

const {
  AppRegistry,
  View,
  StyleSheet,
  NavigatorIOS,
  Text
} = React;

const Test = require('./App/Components/Test.js');

class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Pico Technology',
          component: Test
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
