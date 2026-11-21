import { resetApp } from "../../src/helpers/app.helper.js";
import WelcomePage from "../../src/pageobjects/welcome.page.js";
import LoginPage from "../../src/pageobjects/login.page.js";
import ForgotPasswordPage from "../../src/pageobjects/forgot-password.page.js";
import AccountRecoveryPage from "../../src/pageobjects/account-recovery.page.js";

const INVALID_INPUT_ERROR = "Please enter a valid email or mobile number.";

describe("Forgot Password", () => {
  beforeEach(async () => {
    await resetApp();
    await ForgotPasswordPage.open();
  });

  it("FPW-001 shows all forgot password elements @smoke", async () => {
    await expect(ForgotPasswordPage.title).toBeDisplayed();
    await expect(ForgotPasswordPage.mobileOrEmailInput).toBeDisplayed();
    await expect(ForgotPasswordPage.resetButton).toBeDisplayed();
    await expect(ForgotPasswordPage.backButton).toBeDisplayed();
  });

  it("FPW-002 shows an error when the field is empty @negative", async () => {
    await ForgotPasswordPage.resetButton.click();
    await expect(
      ForgotPasswordPage.errorText(INVALID_INPUT_ERROR),
    ).toBeDisplayed();
    await expect(ForgotPasswordPage.title).toBeDisplayed();
  });

  it("FPW-003 shows an error for an invalid mobile number @negative", async () => {
    await ForgotPasswordPage.requestReset("09017");
    await expect(
      ForgotPasswordPage.errorText(INVALID_INPUT_ERROR),
    ).toBeDisplayed();
    await expect(ForgotPasswordPage.title).toBeDisplayed();
  });

  it("FPW-004 opens account recovery for an unregistered email @negative", async () => {
    await ForgotPasswordPage.requestReset("qa.tester@example.com");
    await expect(AccountRecoveryPage.title).toBeDisplayed();
    await expect(AccountRecoveryPage.continueButton).toBeDisplayed();
    await expect(AccountRecoveryPage.cancelButton).toBeDisplayed();
  });

  it("FPW-005 cancel on account recovery goes back to the landing screen", async () => {
    await ForgotPasswordPage.requestReset("qa.tester@example.com");
    await AccountRecoveryPage.cancel();
    await expect(WelcomePage.signUpButton).toBeDisplayed();
  });

  it("FPW-006 back button returns to login", async () => {
    await ForgotPasswordPage.backButton.click();
    await expect(LoginPage.title).toBeDisplayed();
  });
});
