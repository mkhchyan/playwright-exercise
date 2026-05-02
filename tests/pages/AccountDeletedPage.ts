import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountDeletedPage extends BasePage {
  // Selectors for Account Deleted page
  private readonly ACCOUNT_DELETED_HEADING = 'text=ACCOUNT DELETED!';
  private readonly CONTINUE_BUTTON = 'a[data-qa="continue-button"]';

  constructor(page: Page) {
    super(page);
  }

  async isAccountDeletedHeadingVisible(): Promise<boolean> {
    try {
      await this.waitForSelector(this.ACCOUNT_DELETED_HEADING, 5000);
    } catch {
      return false;
    }
    return await this.isElementVisible(this.ACCOUNT_DELETED_HEADING);
  }

  async clickContinueButton(): Promise<void> {
    await this.clickElement(this.CONTINUE_BUTTON);
  }

  async getAccountDeletedText(): Promise<string> {
    return await this.getText(this.ACCOUNT_DELETED_HEADING);
  }
}
