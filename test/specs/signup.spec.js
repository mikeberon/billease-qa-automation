import { resetApp } from '../../src/helpers/app.helper.js';
import WelcomePage from '../../src/pageobjects/welcome.page.js';
import SignUpPage from '../../src/pageobjects/signup.page.js';

// The sign up flow is never completed, so we only check validation
const INVALID_MOBILE = '09017';
const TEST_EMAIL = 'qa.tester@example.com';
const CONSENT_ERROR = 'Please tick checkbox to indicate that you understand';

describe('Sign Up', () => {
  beforeEach(async () => {
    await resetApp();
    await SignUpPage.open();
  });

  it('SGN-001 shows all sign up elements', async () => {
    await expect(SignUpPage.title).toBeDisplayed();
    await expect(SignUpPage.mobileInput).toBeDisplayed();
    await expect(SignUpPage.emailInput).toBeDisplayed();
    await expect(SignUpPage.consentCheckbox).toBeDisplayed();
    await expect(SignUpPage.signUpButton).toBeDisplayed();
  });

  it('SGN-002 shows all required errors when the form is empty', async () => {
    await SignUpPage.signUpButton.click();
    await expect(SignUpPage.errorText('Please enter mobile number')).toBeDisplayed();
    await expect(SignUpPage.errorText('Please enter email')).toBeDisplayed();
    await expect(SignUpPage.errorText(CONSENT_ERROR)).toBeDisplayed();
  });

  it('SGN-003 shows an error for an invalid mobile number', async () => {
    await SignUpPage.fillForm({ mobile: INVALID_MOBILE, email: TEST_EMAIL, consent: true });
    await SignUpPage.signUpButton.click();
    await expect(SignUpPage.errorText('Invalid number')).toBeDisplayed();
    await expect(SignUpPage.title).toBeDisplayed();
  });

  it('SGN-004 shows an error for an invalid email', async () => {
    await SignUpPage.fillForm({ mobile: INVALID_MOBILE, email: 'qa.tester@', consent: true });
    await SignUpPage.signUpButton.click();
    await expect(SignUpPage.errorText('Invalid email address')).toBeDisplayed();
  });

  it('SGN-005 asks for consent when the checkbox is not ticked', async () => {
    await SignUpPage.fillForm({ mobile: INVALID_MOBILE, email: TEST_EMAIL });
    await SignUpPage.signUpButton.click();
    await expect(SignUpPage.errorText(CONSENT_ERROR)).toBeDisplayed();
  });

  it('SGN-006 ticking the checkbox clears the consent error', async () => {
    await SignUpPage.signUpButton.click();
    await expect(SignUpPage.errorText(CONSENT_ERROR)).toBeDisplayed();
    await SignUpPage.consentCheckbox.click();
    await expect(SignUpPage.errorText(CONSENT_ERROR)).not.toBeDisplayed();
  });

  it('SGN-007 back button returns to the landing screen', async () => {
    await SignUpPage.backButton.click();
    await expect(WelcomePage.loginButton).toBeDisplayed();
  });
});