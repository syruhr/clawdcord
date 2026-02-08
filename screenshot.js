const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Main page - general channel
  await page.goto('http://localhost:3456', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot-general.png' });
  console.log('Saved: screenshot-general.png');
  
  await browser.close();
}

takeScreenshots().catch(console.error);
