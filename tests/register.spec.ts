import { test, expect } from './fixtures/auth.fixture';
import { generateTestUserData } from './utils/testData';

test.describe('User Registration and Deletion Flow', () => {
    test('Register User - Complete signup, account creation, login verification, and deletion flow', async ({
        page,
        homePage,
        signupPage,
        accountInfoPage,
        accountCreatedPage,
        loggedInPage,
        accountDeletedPage,
    }) => {
        const testUser = generateTestUserData();

        // Navigate to url 'http://automationexercise.com'
        await homePage.navigateToHome();

        // Verify that home page is visible successfully
        const isHomePageVisible = await homePage.isHomePageVisible();
        expect(isHomePageVisible).toBeTruthy();

        // Click on 'Signup / Login' button
        await homePage.clickSignupLoginButton();

        // Verify 'New User Signup!' is visible
        const isNewUserSignupVisible = await signupPage.isNewUserSignupVisible();
        expect(isNewUserSignupVisible).toBeTruthy();

        // Enter name and email address
        await signupPage.enterSignupName(testUser.name);
        await signupPage.enterSignupEmail(testUser.email);

        // Click 'Signup' button
        await signupPage.clickSignupButton();

        // Verify that 'ENTER ACCOUNT INFORMATION' is visible
        const isAccountInfoVisible = await accountInfoPage.isAccountInfoHeadingVisible();
        expect(isAccountInfoVisible).toBeTruthy();

        // Fill details: Title, Name, Email, Password, Date of birth
        // Select checkbox 'Sign up for our newsletter!'
        // Select checkbox 'Receive special offers from our partners!'
        // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        await accountInfoPage.fillAccountDetails({
            title: testUser.title,
            password: testUser.password,
            day: testUser.day,
            month: testUser.month,
            year: testUser.year,
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            company: testUser.company,
            address: testUser.address,
            address2: testUser.address2,
            country: testUser.country,
            state: testUser.state,
            city: testUser.city,
            zipcode: testUser.zipcode,
            mobile: testUser.mobile,
        });

        // Click 'Create Account' button
        await accountInfoPage.clickCreateAccountButton();

        // Verify that 'ACCOUNT CREATED!' is visible
        const isAccountCreatedVisible = await accountCreatedPage.isAccountCreatedHeadingVisible();
        expect(isAccountCreatedVisible).toBeTruthy();

        await accountCreatedPage.clickContinueButton();

        const isLoggedInVisible = await loggedInPage.isLoggedInAsVisible();
        expect(isLoggedInVisible).toBeTruthy();

        // Verify username is displayed
        const loggedInText = await loggedInPage.getLoggedInText();
        expect(loggedInText).toContain('Logged in as');

        // Click 'Delete Account' button
        await loggedInPage.clickDeleteAccountButton();

        const isAccountDeletedVisible = await accountDeletedPage.isAccountDeletedHeadingVisible();
        expect(isAccountDeletedVisible).toBeTruthy();

        await accountDeletedPage.clickContinueButton();

        const finalHomePageVisible = await homePage.isHomePageVisible();
        expect(finalHomePageVisible).toBeTruthy();
    });
});
