import { ICustomWorld } from '../../helpers/config/custom-world'
import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

Then(
  'I am taken to the Character Selection Page',
  async function (this: ICustomWorld) {
    const page = this.page!
    const element = await page.getByTestId("login-view")
    expect(element).toBeVisible()
  },
)
