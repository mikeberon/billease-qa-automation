import WelcomePage from "./welcome.page.js";
import { byPlatform, byText, IOS_BACK_BUTTON } from "../helpers/selector.js";

class LoginPage {
  get title() {
    return byPlatform({
      android: "id=ComposeHost_LogInScreen_title",
      ios: '-ios predicate string:name == "navigationbar-title-text" AND label == "Log in"',
    });
  }
  get mobileOrEmailInput() {
    return byPlatform({
      android: "id=login_input_email_or_phone",
      ios: "~otcMobileEmailTextField",
    });
  }
  get passwordInput() {
    return byPlatform({
      android: "id=login_input_password",
      ios: "~otcPasswordTextField",
    });
  }
  get showPasswordToggle() {
    return byPlatform({
      android: "~Show password",
      ios: "~icons/ios/hide",
    });
  }
  get forgotPasswordLink() {
    return byPlatform({
      android: "id=login_link_forgot_password",
      ios: "~otcForgotPasswordTextLink",
    });
  }
  get loginButton() {
    return byPlatform({
      android: "id=btn_log_in",
      ios: "~otcLogInButton",
    });
  }
  get signUpLink() {
    return byPlatform({
      android: "id=login_link_sign_up",
      ios: "~otcSignUpTextLink",
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