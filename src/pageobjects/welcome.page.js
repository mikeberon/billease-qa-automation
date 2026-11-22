import { byPlatform } from "../helpers/selector.js";

class WelcomePage {
  get getStartedButton() {
    return byPlatform({
      android: 'android=new UiSelector().textMatches("(?i)get started")',
      ios: '-ios predicate string:label ==[c] "Get started"',
    });
  }
  get loginButton() {
    return byPlatform({
      android: "id=btn_log_in",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label == "Log in"',
    });
  }
  get signUpButton() {
    return byPlatform({
      android: "id=sign_up",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label == "Sign up"',
    });
  }

  // The intro only shows on a fresh install, so tap it only if it's there
  async skipIntro() {
    await driver.waitUntil(
      async () =>
        (await this.getStartedButton.isDisplayed()) ||
        (await this.loginButton.isDisplayed()),
      { timeout: 20000, timeoutMsg: "Landing screen did not load" }
    );
    if (await this.getStartedButton.isDisplayed()) {
      await this.getStartedButton.click();
    }
    await this.loginButton.waitForDisplayed();
  }

  async goToLogin() {
    await this.loginButton.click();
  }

  async goToSignUp() {
    await this.signUpButton.click();
  }
}

export default new WelcomePage();