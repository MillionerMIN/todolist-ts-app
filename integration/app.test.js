const puppeteer = require('puppeteer');

describe('AddItemForm', () => {
   it('base example, visually looks correct', async () => {
      // APIs from jest-puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--primary&viewMode=story');
      // eslint-disable-next-line no-undef
      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot();
   });
});