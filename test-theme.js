const { chromium } = require('C:/Users/josei/researchnet/node_modules/playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const bodyTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  const htmlTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const header = await page.evaluate(() => {
    const h = document.querySelector('header');
    return h ? getComputedStyle(h).backgroundColor : 'no header';
  });
  const card = await page.evaluate(() => {
    const c = document.querySelector('[style*="border-radius: 12"]');
    return c ? getComputedStyle(c).backgroundColor : 'no card';
  });
  console.log('html data-theme:', htmlTheme);
  console.log('body data-theme:', bodyTheme);
  console.log('body background:', bodyBg);
  console.log('header background:', header);
  console.log('card background:', card);
  await browser.close();
})();
