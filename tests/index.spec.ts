import { test } from "@playwright/test";

test("test", async ({ page }, testInfo) => {
  page.on("filechooser", async (fileChooser) => {
    await fileChooser.setFiles("sine.wav");
  });

  await page.goto("/");
  await page.getByText("add clips").click();
  await page.locator("article:has-text('sine.wav')").getByLabel("Loop").check();
  await page.locator("article:has-text('sine.wav')").getByLabel("Hold").check();
  await page.getByText("sine.wav").click();

  testInfo.attach(
    "screenshot",
    {
      body: await page.locator("body").screenshot(),
      contentType: "image/png",
    },
  );
});
