const React = require('react-native');

const {
  StyleSheet,
  View
} = React;

class Separator extends React.Component {
  render() {
    return (
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  separatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    width: 500,
    backgroundColor: '#1e262c'
  },
})

module.exports = Separator;