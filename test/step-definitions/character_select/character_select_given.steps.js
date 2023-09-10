const { Given } = require('@cucumber/cucumber')

Given('I load the Application and am logged in', async function () {
  await this.loginPage.actions.loadLoginPage()
})
