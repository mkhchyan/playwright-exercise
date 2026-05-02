import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Selectors
  private readonly SIGNUP_LOGIN_BUTTON = 'a[href="/login"]';
  private readonly PAGE_TITLE = 'text=AutomationExercise';

  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.navigate('http://automationexercise.com');
    await this.waitForPageLoad();
  }

  async isHomePageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.SIGNUP_LOGIN_BUTTON);
  }

  async clickSignupLoginButton(): Promise<void> {
    await this.clickElement(this.SIGNUP_LOGIN_BUTTON);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
