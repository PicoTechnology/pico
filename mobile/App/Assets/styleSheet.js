const PICO_GREEN = '#00ffff'
const ACCENT_GREEN = '#00E6E6'
const BORDER_CURVE = 8
const CHARCOAL = '#333333'
const LIGHT_GREY = '#cccccc'
const TOBIN = '#f2f2f2'

var styles = StyleSheet.create({
  textInput: {
    color: TOBIN
    borderWidth: 1,
    borderColor: PICO_GREEN,
    borderRadius: borderCurve,
  },
  submitBtnText: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: PICO_GREEN,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: borderCurve,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})

modules.exports = PicoStyle;