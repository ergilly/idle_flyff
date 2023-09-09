const { setWorldConstructor } = require('@cucumber/cucumber')
const { World } = require('playwright-bdd')
const { LoginPage } = require('../page-objects/character_select/index.js')

class CustomWorld extends World {
  loginPage = new LoginPage(this.page)
}

setWorldConstructor(CustomWorld)
module.exports = { CustomWorld }
