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
      <View>
        <Main />
      </View>
    );
  }
}

AppRegistry.registerComponent('main', () => App);