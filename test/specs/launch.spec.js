import WelcomePage from "../../src/pageobjects/welcome.page.js";
import { resetApp } from "../../src/helpers/app.helper.js";

describe("App launch", () => {
  beforeEach(async () => {
    await resetApp();
  });

  it("shows the landing screen with Log in and Sign up @smoke", async () => {
    await WelcomePage.skipIntro();

    await expect(WelcomePage.loginButton).toBeDisplayed();
    await expect(WelcomePage.signUpButton).toBeDisplayed();
  });
});