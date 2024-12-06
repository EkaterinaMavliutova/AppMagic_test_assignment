import BasePage from '../pages/base.page';
import CountrySelector from './countrySelector.component';

export default class Filters extends BasePage {
  constructor(page) {
    super(page);
    this.countrySelector = new CountrySelector(this.page);
  }
}
