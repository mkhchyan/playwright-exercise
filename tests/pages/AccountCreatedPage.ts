import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
  // Selectors for Account Created page
  private readonly ACCOUNT_CREATED_HEADING = 'text=ACCOUNT CREATED!';
  private readonly CONTINUE_BUTTON = 'a[data-qa="continue-button"]';

  constructor(page: Page) {
    super(page);
  }

  async isAccountCreatedHeadingVisible(): Promise<boolean> {
    try {
      await this.waitForSelector(this.ACCOUNT_CREATED_HEADING, 5000);
    } catch {
      return false;
    }
    return await this.isElementVisible(this.ACCOUNT_CREATED_HEADING);
  }

  async clickContinueButton(): Promise<void> {
    await this.clickElement(this.CONTINUE_BUTTON);
  }

  async getAccountCreatedText(): Promise<string> {
    return await this.getText(this.ACCOUNT_CREATED_HEADING);
  }
}
