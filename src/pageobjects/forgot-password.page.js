import LoginPage from './login.page.js';

class ForgotPasswordPage {
  get title() { return $('id=ComposeHost_ResetPassword_title'); }
  get mobileOrEmailInput() { return $('id=text_field_contact_to_reset'); }
  get resetButton() { return $('id=btn_reset'); }
  get backButton() { return $('id=back_btn'); }

  errorText(message) { return $(`android=new UiSelector().text("${message}")`); }

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