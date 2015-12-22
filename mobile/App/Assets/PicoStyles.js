const React = require('react-native');

const {
  StyleSheet
} = React;

const PICO_GREEN = '#00ffff';
const ACCENT_GREEN = '#00E6E6';
const BORDER_CURVE = 8;
const CHARCOAL = '#333333';
const LIGHT_GREY = '#cccccc';
const TOBIN = '#f2f2f2';

module.exports = PicoStyles = {
  colors: {
    PICO_GREEN,
  },
  underlayColor: ACCENT_GREEN,
  textInput: {
    color: TOBIN,
    fontSize: 18,
    fontFamily: 'Apple SD Gothic Neo',
    fontWeight: 'bold',
    backgroundColor: 'black',
    opacity: .85,
    borderWidth: 1,
    borderColor: PICO_GREEN,
    borderRadius: BORDER_CURVE,
  },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: PICO_GREEN,
    opacity: .9,
    borderColor: ACCENT_GREEN,
    borderWidth: 1,
    borderRadius: BORDER_CURVE,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  error: {
    fontSize: 18,
    color: '#black'
  },
  singleImage: {
    height: 50,
    width: 50,
    marginRight: 5,
  },
  submitBtnText: {
    color: 'black',
    fontSize: 18,
    opacity: .9,
    fontFamily: 'Apple SD Gothic Neo-Bold',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  playlistContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  playlistText: {
    fontSize: 16,
    color: '#f1f3f5'
  },
};