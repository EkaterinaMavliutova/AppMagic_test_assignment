import { test } from '../utils/fixtures/test.fixture';
import { expect } from '@playwright/test';
import attachScreenshotToReport from '../utils/utils';
import { faker } from '@faker-js/faker';

test('should be possible to choose country', async ({ appMagic: { topApps } }) => {
  await expect(topApps.title).toBeVisible();
  await topApps.filters.countrySelector.open();
  await expect(topApps.filters.countrySelector.selectorForm).toBeVisible();

  const allCountries = await topApps.filters.countrySelector.getAllCountries();
  const firstCountry = allCountries[0];
  const firstCountryName = await firstCountry.textContent();
  const countryWithoutCode = firstCountryName.slice(2);
  await topApps.filters.countrySelector.fillInput(countryWithoutCode);

  await expect(firstCountry).toBeVisible();
  await firstCountry.click();

  await expect(topApps.filters.countrySelector.selectorElement).toHaveText(
    firstCountryName
  );
});

test("should be possible to clear input", async ({ appMagic: { topApps } }, testInfo) => {
  await topApps.filters.countrySelector.open();
  await expect(topApps.filters.countrySelector.selectorForm).toBeVisible();

  await topApps.filters.countrySelector.fillInput(faker.string.alphanumeric(10));
  await expect(topApps.filters.countrySelector.selectorForm).toContainText(topApps.filters.countrySelector.noDataMessage);

  await attachScreenshotToReport(topApps.filters.countrySelector.selectorForm, 'No data screenshot', testInfo);

  await topApps.filters.countrySelector.clearInput();
  await expect(topApps.filters.countrySelector.countryInput).toHaveAttribute(
    "placeholder",
    topApps.filters.countrySelector.placeholderText
  );
});

test("should close selector two ways", async ({ appMagic: { topApps } }) => {
  await topApps.filters.countrySelector.open();
  await expect(topApps.filters.countrySelector.selectorForm).toBeVisible();

  await topApps.filters.countrySelector.closeByMouseClick();
  await expect(topApps.filters.countrySelector.selectorForm).toBeHidden();

  await topApps.filters.countrySelector.open();
  await expect(topApps.filters.countrySelector.selectorForm).toBeVisible();

  await topApps.filters.countrySelector.closeByKeyboardClick();
  await expect(topApps.filters.countrySelector.selectorForm).toBeHidden();
});

test("input should accept max 255 characters string", async ({ appMagic: { topApps } }) => {
  const strOf300characters = faker.string.alphanumeric(300);
  await topApps.filters.countrySelector.open();
  await expect(topApps.filters.countrySelector.selectorForm).toBeVisible();

  await topApps.filters.countrySelector.fillInput(strOf300characters);
  const inputValue = await topApps.filters.countrySelector.getInputValue();
  expect(inputValue).toHaveLength(255);
  expect(inputValue).toBe(strOf300characters.slice(0, 255));
});
