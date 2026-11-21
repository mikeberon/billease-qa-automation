import WelcomePage from './welcome.page.js';

class SignUpPage {
  get title() { return $('android=new UiSelector().textContains("get started")'); }
  get mobileInput() { return $('id=sign_up_mobile_text'); }
  get emailInput() { return $('id=signup_email_text'); }
  get consentCheckbox() { return $('id=checkBox'); }
  get signUpButton() { return $('id=sign_up'); }
  get backButton() { return $('id=back_btn'); }

  errorText(message) { return $(`android=new UiSelector().text("${message}")`); }

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