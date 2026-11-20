import LoginPage from "../../src/pageobjects/login.page.js";

const APP_ID = "ph.billeasev2.mobile";
const FAKE_PASSWORD = "QaTest!2345"; // dummy pw

describe("Login", () => {
  beforeEach(async () => {
    await driver.execute("mobile: clearApp", { appId: APP_ID });
    await driver.execute("mobile: changePermissions", {
      permissions: "android.permission.POST_NOTIFICATIONS",
      appPackage: APP_ID,
      action: "grant",
    });
    await driver.activateApp(APP_ID);
    await LoginPage.open();
  });

  it("LGN-001 shows all login elements", async () => {
    await expect(LoginPage.mobileOrEmailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await expect(LoginPage.forgotPasswordLink).toBeDisplayed();
    await expect(LoginPage.loginButton).toBeDisplayed();
    await expect(LoginPage.signUpLink).toBeDisplayed();
  });

  it("LGN-002 masks the password by default", async () => {
    await LoginPage.passwordInput.setValue(FAKE_PASSWORD);
    await expect(LoginPage.passwordInput).not.toHaveText(FAKE_PASSWORD);
  });

  it("LGN-003 show password reveals the password", async () => {
    await LoginPage.passwordInput.setValue(FAKE_PASSWORD);
    await LoginPage.showPasswordToggle.click();
    await expect(LoginPage.passwordInput).toHaveText(FAKE_PASSWORD);
  });
});
