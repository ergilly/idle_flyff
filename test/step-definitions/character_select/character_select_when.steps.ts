// import { ICustomWorld } from '../../helpers/config/custom-world';
// import { When } from '@cucumber/cucumber';

// When('Change theme to {string} mode', async function (this: ICustomWorld, mode: string) {
//   const page = this.page!;
//   const html = page.locator('html');
//   const current = await html.getAttribute('data-theme');
//   if (current !== mode) {
//     await page.locator('nav >> button[title*="dark and light mode"]').click();
//   }
//   await page.waitForSelector(`html[data-theme=${mode}]`);
// });
