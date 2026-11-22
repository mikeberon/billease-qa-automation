import WelcomePage from "./welcome.page.js";
import { byPlatform, byText, IOS_BACK_BUTTON } from "../helpers/selector.js";

class SignUpPage {
  get title() {
    return byPlatform({
      android: 'android=new UiSelector().textContains("get started")',
      ios: "~Let's get started",
    });
  }
  get mobileInput() {
    return byPlatform({
      android: "id=sign_up_mobile_text",
      ios: "~mobile-text-field",
    });
  }
  get emailInput() {
    return byPlatform({
      android: "id=signup_email_text",
      ios: "~email-text-field",
    });
  }
  // On iOS the checkbox and the consent text are one button
  get consentCheckbox() {
    return byPlatform({
      android: "id=checkBox",
      ios: "~privacy-policy-link-terms-conditions-link",
    });
  }
  get signUpButton() {
    return byPlatform({
      android: "id=sign_up",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label == "Sign up"',
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
    await WelcomePage.skipIntro();
    await WelcomePage.goToSignUp();
    await this.title.waitForDisplayed();
  }

  // Only use invalid numbers here. A valid one would send a real OTP.
  async fillForm({ mobile, email, consent = false }) {
    if (mobile) await this.mobileInput.setValue(mobile);
    if (email) await this.emailInput.setValue(email);
    if (consent) await this.consentCheckbox.click();
  }
}

export default new SignUpPage();