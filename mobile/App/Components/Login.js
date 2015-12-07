const React = require('react-native');

const {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    NavigatorIOS,
    Dimensions,
    StyleSheet
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

const {width, height} = Dimensions.get('window');

class Login extends React.Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Login to Your Account</Text>
                <TextInput
                    style={styles.searchInput}
                    defaultValue={'username'}/>
                <TextInput
                    style={styles.searchInput}
                    defaultValue={'password'}/>
            </View>
        );
    }
};

module.exports = Login;