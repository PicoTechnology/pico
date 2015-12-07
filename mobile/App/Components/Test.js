const React = require('react-native');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  Dimensions
} = React;

const {width, height} = Dimensions.get('window');

class Test extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgImageWrapper}>
                    <Image
                        style={styles.bgImage}
                        source={require('../Assets/splash-screen.jpg')}/>
                </View>
        <TouchableHighlight
          style={styles.button}
          underlayColor="green">
            <Text style={styles.buttonText}>Initial button</Text>
        </TouchableHighlight>
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
    },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    width: 125,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'auto',
    justifyContent: 'center'
  }
});


module.exports = Test;
