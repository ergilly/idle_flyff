import { setWorldConstructor } from '@cucumber/cucumber'
import { World, WorldOptions } from 'playwright-bdd'
import * as messages from '@cucumber/messages'
import {
  BrowserContext,
  Page,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  APIRequestContext,
} from '@playwright/test'

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string }
}

export interface ICustomWorld extends World {
  debug: boolean
  feature?: messages.Pickle
  context: BrowserContext
  page: Page

  testName?: string
  startTime?: Date

  server?: APIRequestContext

  playwrightOptions?: PlaywrightTestOptions
  playwrightWorkerOptions?: PlaywrightWorkerOptions
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: WorldOptions) {
    super(options)
  }
  debug = false
}

setWorldConstructor(CustomWorld)