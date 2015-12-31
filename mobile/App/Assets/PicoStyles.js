const React = require('react-native');

const {
  StyleSheet
} = React;

const PICO_GREEN = '#00ffff';
const ACCENT_GREEN = '#89ffff';
const BORDER_CURVE = 8;
const BORDER_ROUND = 50;
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
    LIGHT_GREY,
    TOBIN,
    CHARCOAL
  },
  underlayColor: ACCENT_GREEN,

  //BEGIN - SINGLE STYLING
  singleContainer: {
    flexDirection: 'row',
    padding: 8
  },
  singleImage: {
    height: 50,
    width: 50,
    marginRight: 8,
  },
  voteImage: {
    width: 30,
    height: 30,
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
  searchBtn: {
    opacity: .9,
    height: 45,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 10
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
  dashBtn: {
    flex: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    height: 75,
    width: 75,
    borderRadius: BORDER_CURVE,
    borderColor: PICO_GREEN
  },
  dashBtnText: {
    fontWeight: 'normal',
    fontSize: 15,
    color: PICO_GREEN,
    textAlign: 'center'
  },
  spinner: {
    backgroundColor: 'none'
  },
  instantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 3,
    backgroundColor: 'black',
    paddingBottom: 3,
  },
  instantBtn: {
    height: 30,
    marginTop: 10,
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
  whichPlaylistHeader: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: LIGHT_GREY,
    fontSize: 18,
    fontWeight: 'bold'
  },
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
    paddingBottom: 10,
  },
  playlistInput: {
    height: 35,
    width: 275,
    paddingLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: TOBIN,
    borderRadius: BORDER_CURVE,
    color: LIGHT_GREY
  },
  playlistText: {
    fontSize: 16,
    color: PICO_GREEN
  }
};
