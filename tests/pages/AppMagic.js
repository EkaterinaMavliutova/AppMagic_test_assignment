import BasePage from './base.page';
import TopAppsPage from './topApps.page';

export default class AppMagic extends BasePage {
  constructor(page) {
    super(page);
    this.topApps = new TopAppsPage(this.page);
  }
}
