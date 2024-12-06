import BasePage from '../pages/base.page';
import { faker } from '@faker-js/faker';

export default class CountrySelector extends BasePage {
  constructor(page) {
    super(page);
    this.element = this.page.locator('css=selector:has-text("Geography")').locator('css=[clickelementref]');
    this.dropdown = this.page.locator('css=country-single-select-panel');
    this.input = this.dropdown.getByRole('textbox');
    this.clearInputButton = this.page.locator('css=.g-clear-search-icon');
    this.countriesList = this.dropdown.locator('css=div:has(> div.region-title:has-text("Countries"))').getByRole('button');
    this.outerArea = this.page.locator('css=div.am-dropdown-backdrop');
    this.noDataMessage = 'Nothing to display';
    this.placeholderText = 'Start typing country name...';
  }

  async open() {
    this.element.click();
  }

  async closeByMouseClick() {
    await this.outerArea.click();
  }

  async closeByKeyboardClick() {
    await this.page.keyboard.press('Escape');
  }

  async getCountryList() {
    const countries = await this.countriesList.allTextContents();
    const countryNames = countries.map((item) => item.slice(2));

    return countryNames;
  }

  async getRandomCountry() {
    const countries = await this.countriesList.all();
    const countriesCount = countries.length;
    const randomIndex = faker.number.int({ max: countriesCount });
    const countryName = await countries[randomIndex].textContent();
    const countryNameWithoutCode = countryName.slice(2);
    const countryLocator = this.countriesList.filter({ hasText: countryNameWithoutCode });

    return {
      countryButton: countryLocator,
      countryName: countryNameWithoutCode,
    };
  }

  async getSelectedValue() {
    const selectedValue = await this.element.locator('css=span.text-overflow').textContent();

    return selectedValue;
  }

  async fillInput(countryName) {
    await this.input.fill(countryName);
  }

  async clearInput() {
    await this.clearInputButton.click();
  }

  async getInputValue() {
    const inputValue = await this.input.inputValue();

    return inputValue;
  }
}
