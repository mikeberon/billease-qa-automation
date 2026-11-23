import LoginPage from "../../src/pageobjects/login.page.js";
import { resetApp } from "../../src/helpers/app.helper.js";

const FAKE_PASSWORD = "QaTest!2345";

describe("Login", () => {
  beforeEach(async () => {
    await resetApp();
    await LoginPage.open();
  });

  it("LGN-001 shows all login elements @smoke", async () => {
    await expect(LoginPage.mobileOrEmailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await expect(LoginPage.forgotPasswordLink).toBeDisplayed();
    await expect(LoginPage.loginButton).toBeDisplayed();
    await expect(LoginPage.signUpLink).toBeDisplayed();
  });

  it("LGN-002 masks the password by default @smoke", async () => {
    await LoginPage.passwordInput.setValue(FAKE_PASSWORD);
    await expect(LoginPage.passwordInput).not.toHaveText(FAKE_PASSWORD);
  });

  it("LGN-003 show password reveals the password", async () => {
    await LoginPage.passwordInput.setValue(FAKE_PASSWORD);
    await LoginPage.showPasswordToggle.click();
    await expect(LoginPage.passwordInput).toHaveText(FAKE_PASSWORD);
  });
  it("LGN-004 shows required error when fields are empty @negative", async () => {
    await LoginPage.loginButton.click();

    await expect(LoginPage.errorText("This field is required")).toBeDisplayed();
    await expect(LoginPage.title).toBeDisplayed();
  });

  it("LGN-005 shows error for an invalid mobile number @negative", async () => {
    await LoginPage.login("0917123", FAKE_PASSWORD);

    const invalidMobileError = driver.isIOS
      ? "This is not a valid phone number"
      : "Invalid email or mobile";
    await expect(LoginPage.errorText(invalidMobileError)).toBeDisplayed();
  });

  it("LGN-006 rejects an unregistered account @negative", async () => {
    await LoginPage.login("qa.tester@example.com", FAKE_PASSWORD);

    await expect(
      LoginPage.errorText("Please use correct username and password."),
    ).toBeDisplayed();
    await expect(LoginPage.title).toBeDisplayed();
  });

  it("LGN-007 shows required error when password is empty @negative", async () => {
    await LoginPage.login("qa.tester@example.com", "");

    await expect(LoginPage.errorText("This field is required")).toBeDisplayed();
  });
});
