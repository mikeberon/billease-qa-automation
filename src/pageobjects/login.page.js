import WelcomePage from "./welcome.page.js";
import { byPlatform, byText } from "../helpers/selector.js";

class LoginPage {
  get title() {
    return byPlatform({
      android: "id=ComposeHost_LogInScreen_title",
      ios: '-ios predicate string:type == "XCUIElementTypeStaticText" AND label == "Log in"',
    });
  }
  get mobileOrEmailInput() {
    return byPlatform({
      android: "id=login_input_email_or_phone",
      ios: '-ios predicate string:type == "XCUIElementTypeTextField"',
    });
  }
  get passwordInput() {
    return byPlatform({
      android: "id=login_input_password",
      ios: '-ios predicate string:type == "XCUIElementTypeSecureTextField"',
    });
  }
  get showPasswordToggle() {
    return $("~Show password");
  }
  get forgotPasswordLink() {
    return byPlatform({
      android: "id=login_link_forgot_password",
      ios: '-ios predicate string:label == "Forgot password?"',
    });
  }
  get loginButton() {
    return byPlatform({
      android: "id=btn_log_in",
      ios: '-ios predicate string:type == "XCUIElementTypeButton" AND label == "Log in"',
    });
  }
  get signUpLink() {
    return byPlatform({
      android: "id=login_link_sign_up",
      ios: '-ios predicate string:label == "Sign Up"',
    });
  }
  get backButton() {
    return byPlatform({ android: "id=back_btn", ios: "~Back" });
  }

  errorText(message) {
    return byText(message);
  }

  async open() {
    await WelcomePage.skipIntro();
    await WelcomePage.goToLogin();
    await this.title.waitForDisplayed();
  }

  async login(mobileOrEmail, password) {
    await this.mobileOrEmailInput.setValue(mobileOrEmail);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginPage();
