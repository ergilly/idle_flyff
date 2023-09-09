const BrowserConstants = require('../constants/BrowserConstants.js')

class BrowserSetup {
  static type(browser) {
    let browserType
    if (browser === BrowserConstants.FIREFOX) {
      browserType = BrowserConstants.FIREFOX
    } else if (browser === BrowserConstants.WEBKIT) {
      browserType = BrowserConstants.WEBKIT
    } else {
      browserType = BrowserConstants.CHROMIUM
    }
    return browserType
  }

  static channel(browser) {
    let browserChannel
    if (browser === BrowserConstants.CHROME) {
      browserChannel = BrowserConstants.CHROME
    } else if (browser === BrowserConstants.EDGE) {
      browserChannel = BrowserConstants.MSEDGE
    } else {
      browserChannel = BrowserConstants.BLANK
    }
    return browserChannel
  }

  static convertToBoolean(input) {
    try {
      return JSON.parse(input.toLowerCase())
    } catch (e) {
      return undefined
    }
  }
}

module.exports = BrowserSetup
