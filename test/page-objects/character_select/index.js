const { PageElements } = require('./page-elements.js')
const { PageActions } = require('./page-actions.js')
const { BasePage } = require('../BasePage.js')

class LoginPage extends BasePage {
  constructor(Page) {
    super(Page)
    this.elements = new PageElements(Page)
    this.actions = new PageActions(Page)
  }
}

module.exports = { LoginPage }
