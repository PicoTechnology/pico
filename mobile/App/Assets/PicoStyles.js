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
const TEXT_INPUT_HEIGHT = 50;
const TEXT_INPUT_FONTSIZE = 20;

module.exports = PicoStyles = {
  colors: {
    PICO_GREEN,
  },
  //BEGIN - SINGLE STYLING
  singleContainer: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3
  },
  singleImage: {
    height: 50,
    width: 50,
    marginRight: 5,
  },
  singleTitle: {
    color: '#f2f2f2',
    fontWeight: 'bold'
  },
  singleInfo: {
    color: '#cccccc'
  },
  // END - SINGLE STYLING
  mainScrollContainer: {
    flex: 1,
    backgroundColor: '#333333'
  },
  underlayColor: ACCENT_GREEN,
  searchInput: {
    height: TEXT_INPUT_HEIGHT,
    padding: 4,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    fontSize: TEXT_INPUT_FONTSIZE,
    borderWidth: 1,
    borderColor: '#99FF00',
    borderRadius: 8,
    color: 'white'
  },
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
  submitBtnText: {
    color: 'black',
    fontSize: 18,
    opacity: .9,
    fontFamily: 'Apple SD Gothic Neo-Bold',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  sideBySideContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  playlistContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  playlistInput: {
    flex: 1,
    height: TEXT_INPUT_HEIGHT,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    fontSize: TEXT_INPUT_FONTSIZE,
    borderWidth: 1,
    borderColor: '#99FF00',
    borderRadius: 8,
    color: 'white'
  },
  playlistText: {
    fontSize: 16,
    color: '#f1f3f5'
  }
};