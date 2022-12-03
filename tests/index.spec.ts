import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('sine.wav');
  })

  await page.goto('localhost:3000/clips/');
  await page.getByText('add clips').click();
  await page.getByLabel('Loop').check();
  await page.getByLabel('Hold').check();
  await page.getByText('sine.wav').click();

  testInfo.attach(
    'screenshot',
    {
      body: await page.locator("body").screenshot(),
      contentType: 'image/png'
    }
  );
});
;
