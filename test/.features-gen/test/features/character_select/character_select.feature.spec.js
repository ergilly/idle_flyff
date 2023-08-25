/** Generated from: test\features\character_select\character_select.feature */
import { test } from "playwright-bdd";

test.describe("Character selection page", () => {

  test("Test load of Character Selection Page", async ({ Given, Then }) => {
    await Given("I load the Application and am logged in");
    await Then("I am taken to the Character Selection Page");
  });

});

// == technical section ==

test.use({
  $tags: ({}, use, testInfo) => use({
    "Test load of Character Selection Page": ["@feature","@demo"],
  }[testInfo.titlePath.slice(2).join("|")] || [])
});