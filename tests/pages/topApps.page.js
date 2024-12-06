import BasePage from './base.page';
import Filters from '../components/filters.component';

export default class TopAppsPage extends BasePage {
  constructor(page) {
    super(page);
    this.filters = new Filters(this.page);
  }
}
