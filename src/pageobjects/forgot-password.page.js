import LoginPage from "./login.page.js";
import { byPlatform, byText, IOS_BACK_BUTTON } from "../helpers/selector.js";

class ForgotPasswordPage {
  get title() {
    return byPlatform({
      android: "id=ComposeHost_ResetPassword_title",
      ios: '-ios predicate string:type == "XCUIElementTypeStaticText" AND label == "Forgot password?"',
    });
  }
  get mobileOrEmailInput() {
    return byPlatform({
      android: "id=text_field_contact_to_reset",
      ios: '-ios predicate string:type == "XCUIElementTypeTextField"',
    });
  }
  get resetButton() {
    return byPlatform({
      android: "id=btn_reset",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label == "Reset"',
    });
  }
  get backButton() {
    return byPlatform({
      android: "id=back_btn",
      ios: IOS_BACK_BUTTON,
    });
  }

  errorText(message) {
    return byText(message);
  }
  async open() {
    await LoginPage.open();
    await LoginPage.forgotPasswordLink.click();
    await this.title.waitForDisplayed();
  }

  async requestReset(mobileOrEmail) {
    await this.mobileOrEmailInput.setValue(mobileOrEmail);
    await this.resetButton.click();
  }
}

export default new ForgotPasswordPage();
