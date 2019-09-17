const puppeteer = require('puppeteer');

const ticketsUrl = process.argv[2];
if (!ticketsUrl) {
  console.log('no tickets url provided');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(ticketsUrl);
  await page.setCacheEnabled(false);
  while (await page.$('.error-404-body') !== null) {
    console.log('404 =(');
    await page.waitFor(4000);
    await page.reload({waitUntil: 'networkidle2'});
  }
  page.evaluate(() => alert('Here is your tickets page'));
})();