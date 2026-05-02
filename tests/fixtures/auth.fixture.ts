import { test as base } from '@playwright/test';
import {
  HomePage,
  SignupPage,
  AccountInfoPage,
  AccountCreatedPage,
  LoggedInPage,
  AccountDeletedPage,
} from '../pages';

type AuthFixtures = {
  homePage: HomePage;
  signupPage: SignupPage;
  accountInfoPage: AccountInfoPage;
  accountCreatedPage: AccountCreatedPage;
  loggedInPage: LoggedInPage;
  accountDeletedPage: AccountDeletedPage;
};

export const test = base.extend<AuthFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  accountInfoPage: async ({ page }, use) => {
    await use(new AccountInfoPage(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  loggedInPage: async ({ page }, use) => {
    await use(new LoggedInPage(page));
  },
  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },
});

export { expect } from '@playwright/test';
