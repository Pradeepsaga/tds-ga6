const { chromium } = require('playwright');

const SEEDS = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let total = 0;

  for (const seed of SEEDS) {
    await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`,
                    { waitUntil: 'networkidle' });
    await page.waitForSelector('table td');
    const sum = await page.evaluate(() =>
      [...document.querySelectorAll('table td')]
        .map(td => parseFloat(td.textContent.replace(/,/g, '')))
        .filter(Number.isFinite)
        .reduce((a, b) => a + b, 0)
    );
    console.log(`seed ${seed}: ${sum}`);
    total += sum;
  }

  console.log(`TOTAL SUM: ${total}`);
  await browser.close();
})();
