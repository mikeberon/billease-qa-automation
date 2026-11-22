import { byPlatform, byText } from "../helpers/selector.js";

// Shown after Reset with an email that isn't registered.
// We never tap Continue since it asks for ID details.
class AccountRecoveryPage {
  get title() {
    return byText("Account recovery");
  }
  get continueButton() {
    return byPlatform({
      android: "id=ComposeHost_WelcomeScreen_userEmail_btn_continue",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label ==[c] "Continue"',
    });
  }
  get cancelButton() {
    return byPlatform({
      android: "id=ComposeHost_WelcomeScreen_userEmail_btn_cancel",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label ==[c] "Cancel"',
    });
  }

  async cancel() {
    // Wait for the screen to settle, an early tap gets lost in the transition
    await this.title.waitForDisplayed();
    await this.cancelButton.waitForDisplayed();
    await this.cancelButton.click();
  }
}

export default new AccountRecoveryPage();