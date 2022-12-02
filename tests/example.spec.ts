import { test, expect } from '@playwright/test';

test('test', async ({ page }, testInfo) => {
  page.on('filechooser', async (fileChooser) => {
    await fileChooser.setFiles('sine.wav');
  })

  await page.goto('localhost:3000/clips/');
  await page.getByRole('textbox').click();
  // await page.getByLabel('Speed').click();
  // await page.getByLabel('Gain').click();
  await page.getByLabel('Loop').check();
  await page.getByLabel('Hold').check();
  await page.getByText('sine.wav').click();

  testInfo.attach(
    'screenshot',
    {
      body: await page.locator("figure").screenshot(),
      contentType: 'image/png'
    }
  );
});
;