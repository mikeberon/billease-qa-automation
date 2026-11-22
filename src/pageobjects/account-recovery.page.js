import { byPlatform } from "../helpers/selector.js";

class AccountRecoveryPage {
  get title() {
    return byPlatform({
      android: 'android=new UiSelector().text("Account recovery")',
      ios: "~Account Recovery",
    });
  }
  get continueButton() {
    return byPlatform({
      android: "id=ComposeHost_WelcomeScreen_userEmail_btn_continue",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label BEGINSWITH "CONTINUE"',
    });
  }
  get cancelButton() {
    return byPlatform({
      android: "id=ComposeHost_WelcomeScreen_userEmail_btn_cancel",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label BEGINSWITH "CANCEL"',
    });
  }

  async cancel() {
    await this.title.waitForDisplayed();
    await this.cancelButton.waitForDisplayed();
    await this.cancelButton.click();
  }
}

export default new AccountRecoveryPage();