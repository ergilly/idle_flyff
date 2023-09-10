const {
  BrowserActions,
  ClickActions,
  GetActions,
  KeyboardActions,
  WaitActions,
} = require('../libraries/actions/index.js')

class BasePage {
  constructor(page) {
    this.browserActions = new BrowserActions(page)
    this.clickActions = new ClickActions(page)
    this.getActions = new GetActions(page)
    this.keyboardActions = new KeyboardActions(page)
    this.waitActions = new WaitActions(page)
  }
}
module.exports = { BasePage }
