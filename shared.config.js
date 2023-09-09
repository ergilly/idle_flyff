const { devices } = require('@playwright/test')
const dotenv = require('dotenv')
const BrowserSetup = require('./test/helpers/config/BrowserSetup.js')

dotenv.config()
const timeInMin = 60 * 1000

const config = {
  use: {
    browserName: BrowserSetup.type(process.env.BROWSER_NAME.toLowerCase()),
    trace: 'off',
    headless: BrowserSetup.convertToBoolean(process.env.HEADLESS_MODE),
    launchOptions: {
      args: ['--start-maximized', '--disable-plugins', '--disable-extensions'],
      headless: BrowserSetup.convertToBoolean(process.env.HEADLESS_MODE),
      timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10),
    },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    channel: BrowserSetup.channel(process.env.BROWSER_NAME.toLowerCase()),
    video: 'retain-on-failure',
    viewport: null,
    actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
    navigationTimeout:
      Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin,
  },
  testDir: '.features-gen',
  outputDir: './test/reports',
  timeout: Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: Number.parseInt(process.env.RETRIES, 10),
  workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
  reporter: [
    [
      'html',
      {
        outputFolder: 'test/reports/html-reports',
      },
    ],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'test/reports/allure-results',
        suiteTitle: false,
      },
    ],
  ],
  projects: [
    {
      name: 'local',
      testMatch: '*.spec.js',
      testIgnore: '',
    },
  ],
}
module.exports = config
