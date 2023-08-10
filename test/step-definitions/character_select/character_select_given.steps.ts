import { ICustomWorld } from '../../helpers/config/custom-world'
import { config } from '../../helpers/config/config'
import { Given } from '@cucumber/cucumber'

Given(
  'I load the Application and am logged in',
  async function (this: ICustomWorld) {
    const page = this.page!
    await page.goto(config.BASE_URL)
    await page.getByTestId("login-view").waitFor()
  },
)
