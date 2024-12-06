import { test as base } from "@playwright/test";
import AppMagic from "../../pages/AppMagic";

export const test = base.extend({
  appMagic: async ({ page }, use) => {
    const appMagic = new AppMagic(page);
    await page.goto("./top-charts/apps");
    await use(appMagic);
  },
});
