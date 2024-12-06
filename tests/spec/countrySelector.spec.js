import { test } from '../utils/fixtures/test.fixture';
import { expect } from '@playwright/test';
import attachScreenshotToReport from '../utils/utils';
import { faker } from '@faker-js/faker';

let selector;

test.beforeEach(async ({ appMagic: { topApps } }) => {
  selector = topApps.filters.countrySelector;
});

test('should be possible to choose country', async () => {
  await selector.open();
  await expect(selector.dropdown).toBeVisible();

  const {countryButton, countryName} = await selector.getRandomCountry();
  await selector.fillInput(countryName);
  await countryButton.click();

  expect(await selector.getSelectedValue()).toBe(countryName);
});

test('should be possible to clear input', async () => {
  await selector.open();
  await expect(selector.dropdown).toBeVisible();

  await selector.fillInput('anyText');
  expect(await selector.getInputValue()).toBe('anyText');

  await selector.clearInput();

  await expect(selector.input).toHaveAttribute('placeholder', selector.placeholderText);
});

test('should show message when no country match filled value', async ({}, testInfo) => {
  await selector.open();
  await expect(selector.dropdown).toBeVisible();

  const countryList = await selector.getCountryList();
  const randomStr = faker.string.alphanumeric(10);

  const isNotCountry = countryList.every((item) => randomStr !== item);
  await selector.fillInput(randomStr);

  expect(isNotCountry).toBeTruthy();
  await expect(selector.dropdown).toContainText(selector.noDataMessage);
  await attachScreenshotToReport(selector.dropdown, 'No data screenshot', testInfo);
});

test('should be possible to close selector by mouse click()', async () => {
  await selector.open();
  await expect(selector.dropdown).toBeVisible();

  await selector.closeByMouseClick();

  await expect(selector.dropdown).toBeHidden();
});

test('should be possible to close selector by keyboard click()', async () => {
  await selector.open();
  await expect(selector.dropdown).toBeVisible();

  await selector.closeByKeyboardClick();

  await expect(selector.dropdown).toBeHidden();
});

test("input should accept max 255 characters string", async () => {
  await selector.open();
  await expect(selector.dropdown).toBeVisible();
  const strOf300characters = faker.string.alphanumeric(300);

  await selector.fillInput(strOf300characters);
  const inputValue = await selector.getInputValue();

  expect(inputValue).toHaveLength(255);
  expect(inputValue).toBe(strOf300characters.slice(0, 255));
});
