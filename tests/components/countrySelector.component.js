import BasePage from '../pages/base.page';

export default class CountrySelector extends BasePage {
  constructor(page) {
    super(page);
    this.selectorElement = this.page.locator('css=selector:has-text("Geography")').locator('css=[clickelementref]');
    this.selectorForm = this.page.locator('css=country-single-select-panel');
    this.formOuterArea = this.page.locator('css=div.am-dropdown-backdrop');
    this.countryInput = this.selectorForm.getByRole('textbox');
    this.clearInputButton = this.page.locator('css=.g-clear-search-icon');
    this.noDataMessage = 'Nothing to display';
    this.placeholderText = 'Start typing country name...';
  }

  async open() {
    this.selectorElement.click();
  }

  async closeByMouseClick() {
    await this.formOuterArea.click();
  }

  async closeByKeyboardClick() {
    await this.page.keyboard.press('Escape');
  }

  async getAllCountries() {
    const countries = await this.selectorForm.locator('css=div:has(> div.region-title:has-text("Countries"))').getByRole('button').all();

    return countries;
  }

  async fillInput(countryName) {
    await this.countryInput.fill(countryName);
  }

  async clearInput() {
    await this.clearInputButton.click();
  }

  async getInputValue() {
    const inputValue = await this.countryInput.inputValue();

    return inputValue;
  }
}
