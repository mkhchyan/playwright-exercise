import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupPage extends BasePage {
  // Selectors for Signup/Login page
  private readonly NEW_USER_SIGNUP_HEADING = 'text=New User Signup!';
  private readonly SIGNUP_NAME_INPUT = 'input[placeholder="Name"]';
  private readonly SIGNUP_EMAIL_INPUT = 'input[data-qa="signup-email"]';
  private readonly SIGNUP_BUTTON = 'button[data-qa="signup-button"]';

  constructor(page: Page) {
    super(page);
  }

  async isNewUserSignupVisible(): Promise<boolean> {
    try {
      await this.waitForSelector(this.NEW_USER_SIGNUP_HEADING, 5000);
    } catch {
      return false;
    }
    return await this.isElementVisible(this.NEW_USER_SIGNUP_HEADING);
  }

  async enterSignupName(name: string): Promise<void> {
    await this.fillInput(this.SIGNUP_NAME_INPUT, name);
  }

  async enterSignupEmail(email: string): Promise<void> {
    await this.fillInput(this.SIGNUP_EMAIL_INPUT, email);
  }

  async clickSignupButton(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/\/signup/, { timeout: 30000 }),
      this.clickElement(this.SIGNUP_BUTTON),
    ]);
  }

  async getNewUserSignupText(): Promise<string> {
    return await this.getText(this.NEW_USER_SIGNUP_HEADING);
  }
}
