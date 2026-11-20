import WelcomePage from './welcome.page.js';

class LoginPage {

  get title() {
    return $('id=ComposeHost_LogInScreen_title');
  }
  get mobileOrEmailInput() {
    return $('id=login_input_email_or_phone');
  }
  get passwordInput() {
    return $('id=login_input_password');
  }
  get showPasswordToggle() {
    return $('~Show password');
  }
  get forgotPasswordLink() {
    return $('id=login_link_forgot_password');
  }
  get loginButton() {
    return $('id=btn_log_in');
  }
  get signUpLink() {
    return $('id=login_link_sign_up');
  }
  get backButton() {
    return $('id=back_btn');
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