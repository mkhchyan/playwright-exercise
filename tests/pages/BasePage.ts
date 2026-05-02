import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) { }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fillInput(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async selectDropdown(selector: string, value: string): Promise<void> {
    await this.page.selectOption(selector, value);
  }

  async checkCheckbox(selector: string): Promise<void> {
    await this.page.check(selector);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async waitForSelector(selector: string, timeout: number = 15000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }
}
