import WelcomePage from '../../src/pageobjects/welcome.page.js';

describe('App launch', () => {
  it('shows the landing screen with Log in and Sign up @smoke', async () => {
    await WelcomePage.skipIntro();

    await expect(WelcomePage.loginButton).toBeDisplayed();
    await expect(WelcomePage.signUpButton).toBeDisplayed();
  });
});