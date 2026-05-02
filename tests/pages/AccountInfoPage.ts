import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountInfoPage extends BasePage {
  // Selectors for Account Information page
  private readonly ACCOUNT_INFO_HEADING = 'text=ENTER ACCOUNT INFORMATION';
  private readonly TITLE_MR_RADIO = 'input[id="id_gender1"]';
  private readonly TITLE_MRS_RADIO = 'input[id="id_gender2"]';
  private readonly NAME_INPUT = 'input[id="name"]';
  private readonly EMAIL_INPUT = 'input[id="email"]';
  private readonly PASSWORD_INPUT = 'input[id="password"]';
  private readonly DAY_DROPDOWN = 'select[id="days"]';
  private readonly MONTH_DROPDOWN = 'select[id="months"]';
  private readonly YEAR_DROPDOWN = 'select[id="years"]';
  private readonly NEWSLETTER_CHECKBOX = 'input[id="newsletter"]';
  private readonly OFFERS_CHECKBOX = 'input[id="optin"]';
  private readonly FIRST_NAME_INPUT = 'input[id="first_name"]';
  private readonly LAST_NAME_INPUT = 'input[id="last_name"]';
  private readonly COMPANY_INPUT = 'input[id="company"]';
  private readonly ADDRESS_INPUT = 'input[id="address1"]';
  private readonly ADDRESS2_INPUT = 'input[id="address2"]';
  private readonly COUNTRY_DROPDOWN = 'select[id="country"]';
  private readonly STATE_INPUT = 'input[id="state"]';
  private readonly CITY_INPUT = 'input[id="city"]';
  private readonly ZIPCODE_INPUT = 'input[id="zipcode"]';
  private readonly MOBILE_INPUT = 'input[id="mobile_number"]';
  private readonly CREATE_ACCOUNT_BUTTON = 'button[data-qa="create-account"]';

  constructor(page: Page) {
    super(page);
  }

  async isAccountInfoHeadingVisible(): Promise<boolean> {
    try {
      await this.waitForSelector(this.ACCOUNT_INFO_HEADING, 5000);
    } catch {
      return false;
    }
    return await this.isElementVisible(this.ACCOUNT_INFO_HEADING);
  }

  async selectTitle(title: 'Mr' | 'Mrs'): Promise<void> {
    const selector = title === 'Mr' ? this.TITLE_MR_RADIO : this.TITLE_MRS_RADIO;
    await this.checkCheckbox(selector);
  }

  async enterName(name: string): Promise<void> {
    await this.fillInput(this.NAME_INPUT, name);
  }

  async enterEmail(email: string): Promise<void> {
    await this.fillInput(this.EMAIL_INPUT, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.PASSWORD_INPUT, password);
  }

  async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.selectDropdown(this.DAY_DROPDOWN, day);
    await this.selectDropdown(this.MONTH_DROPDOWN, month);
    await this.selectDropdown(this.YEAR_DROPDOWN, year);
  }

  async checkNewsletterCheckbox(): Promise<void> {
    await this.checkCheckbox(this.NEWSLETTER_CHECKBOX);
  }

  async checkOffersCheckbox(): Promise<void> {
    await this.checkCheckbox(this.OFFERS_CHECKBOX);
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.fillInput(this.FIRST_NAME_INPUT, firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.fillInput(this.LAST_NAME_INPUT, lastName);
  }

  async enterCompany(company: string): Promise<void> {
    await this.fillInput(this.COMPANY_INPUT, company);
  }

  async enterAddress(address: string): Promise<void> {
    await this.fillInput(this.ADDRESS_INPUT, address);
  }

  async enterAddress2(address2: string): Promise<void> {
    await this.fillInput(this.ADDRESS2_INPUT, address2);
  }

  async selectCountry(country: string): Promise<void> {
    await this.selectDropdown(this.COUNTRY_DROPDOWN, country);
  }

  async enterState(state: string): Promise<void> {
    await this.fillInput(this.STATE_INPUT, state);
  }

  async enterCity(city: string): Promise<void> {
    await this.fillInput(this.CITY_INPUT, city);
  }

  async enterZipcode(zipcode: string): Promise<void> {
    await this.fillInput(this.ZIPCODE_INPUT, zipcode);
  }

  async enterMobileNumber(mobile: string): Promise<void> {
    await this.fillInput(this.MOBILE_INPUT, mobile);
  }

  async clickCreateAccountButton(): Promise<void> {
    await this.clickElement(this.CREATE_ACCOUNT_BUTTON);
  }

  async fillAccountDetails(accountData: {
    title: 'Mr' | 'Mrs';
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }): Promise<void> {
    await this.selectTitle(accountData.title);
    await this.enterPassword(accountData.password);
    await this.selectDateOfBirth(accountData.day, accountData.month, accountData.year);
    await this.checkNewsletterCheckbox();
    await this.checkOffersCheckbox();
    await this.enterFirstName(accountData.firstName);
    await this.enterLastName(accountData.lastName);
    await this.enterCompany(accountData.company);
    await this.enterAddress(accountData.address);
    await this.enterAddress2(accountData.address2);
    await this.selectCountry(accountData.country);
    await this.enterState(accountData.state);
    await this.enterCity(accountData.city);
    await this.enterZipcode(accountData.zipcode);
    await this.enterMobileNumber(accountData.mobile);
  }
}
