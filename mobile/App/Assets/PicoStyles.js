const React = require('react-native');

const {
  StyleSheet
} = React;

const PICO_GREEN = '#00ffff';
const ACCENT_GREEN = '#89ffff';
const BORDER_CURVE = 8;
const CHARCOAL = '#333333';
const LIGHT_GREY = '#cccccc';
const TOBIN = '#f2f2f2';
const TEXT_INPUT_HEIGHT = 50;
const TEXT_INPUT_FONTSIZE = 20;
const FONT_FAMILY = 'Apple SD Gothic Neo';
const OPACITY_LIGHT = .85;

module.exports = PicoStyles = {
  colors: {
    PICO_GREEN,
    ACCENT_GREEN,
    TOBIN,
    
  },
  underlayColor: ACCENT_GREEN,
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
  searchInput: {
    color: TOBIN,
    fontSize: TEXT_INPUT_FONTSIZE,
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    backgroundColor: 'black',
    opacity: .85,
    borderWidth: 1,
    borderColor: PICO_GREEN,
    borderRadius: BORDER_CURVE,
  },
  textInput: {
    color: TOBIN,
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    fontWeight: 'bold',
    backgroundColor: 'black',
    opacity: OPACITY_LIGHT,
    borderWidth: 1,
    borderColor: TOBIN,
    borderRadius: BORDER_CURVE,
  },
  // BEGIN BUTTONS
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
  submitBtnText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Apple SD Gothic Neo-Bold',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  signUpBtn: {
    flexDirection: 'row',
    backgroundColor: 'black',
    opacity: OPACITY_LIGHT,
    borderColor: PICO_GREEN,
    borderWidth: 1,
    borderRadius: BORDER_CURVE,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  signUpBtnText: {
    color: PICO_GREEN,
    fontSize: 18,
    opacity: OPACITY_LIGHT,
    fontFamily: 'Apple SD Gothic Neo-Bold',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  instantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 3,
    paddingBottom: 3,
  },
  instantBtn: {
    height: 30,
    paddingTop: 5,
    paddingRight: 7,
    paddingBottom: 5,
    paddingLeft: 7,
    borderColor: PICO_GREEN,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  instantText: {
    color: PICO_GREEN,
    fontSize: 15
  },
  // END BUTTONS
  error: {
    fontSize: 18,
    color: '#black'
  },
  sideBySideContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
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
    height: 30,
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    fontSize: 15,
    borderWidth: 1,
    borderColor: ACCENT_GREEN,
    borderRadius: BORDER_CURVE,
    color: PICO_GREEN
  },
  playlistText: {
    fontSize: 16,
    color: '#f1f3f5'
  }
};
