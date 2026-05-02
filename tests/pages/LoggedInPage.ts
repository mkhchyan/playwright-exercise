import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoggedInPage extends BasePage {
  // Selectors for Logged In page
  private readonly LOGGED_IN_USERNAME = 'text=/Logged in as/';
  private readonly DELETE_ACCOUNT_BUTTON = 'a[href="/delete_account"]';

  constructor(page: Page) {
    super(page);
  }

  async isLoggedInAsVisible(): Promise<boolean> {
    try {
      await this.waitForSelector(this.LOGGED_IN_USERNAME, 5000);
    } catch {
      return false;
    }
    return await this.isElementVisible(this.LOGGED_IN_USERNAME);
  }

  async getLoggedInText(): Promise<string> {
    return await this.getText(this.LOGGED_IN_USERNAME);
  }

  async clickDeleteAccountButton(): Promise<void> {
    await this.clickElement(this.DELETE_ACCOUNT_BUTTON);
  }
}
