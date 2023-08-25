import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
  paths: ['test/features/**/*.feature'],
  require: ['test/step-definitions/**/*.ts'],
  outputDir: 'test/.features-gen',
})

export default defineConfig({
  testDir,
  reporter: 'html',
})
