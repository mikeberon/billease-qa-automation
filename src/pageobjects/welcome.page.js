class WelcomePage {

  get getStartedButton() {
    return $('android=new UiSelector().textMatches("(?i)get started")');
  }
  get loginButton() {
    return $('id=btn_log_in');
  }
  get signUpButton() {
    return $('id=sign_up');
  }

  // Actions
  async skipIntro() {
    await this.getStartedButton.waitForDisplayed({ timeout: 20000 });
    await this.getStartedButton.click();
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