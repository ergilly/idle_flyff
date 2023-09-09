const { Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

Then('I am taken to the Character Selection Page', async function () {
  const element = await this.loginPage.elements.loginView()
  console.log(element)
  await expect(element).toBeVisible()
})
