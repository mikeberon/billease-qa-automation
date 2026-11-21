// Shown after Reset with an email that isn't registered.
// We never tap Continue since it asks for ID details.
class AccountRecoveryPage {
  get title() {
    return $('android=new UiSelector().text("Account recovery")');
  }
  get continueButton() {
    return $("id=ComposeHost_WelcomeScreen_userEmail_btn_continue");
  }
  get cancelButton() {
    return $("id=ComposeHost_WelcomeScreen_userEmail_btn_cancel");
  }
  async cancel() {
    // Wait for the screen to settle, an early tap gets lost in the transition
    await this.title.waitForDisplayed();
    await this.cancelButton.waitForDisplayed();
    await this.cancelButton.click();
  }
}

export default new AccountRecoveryPage();
