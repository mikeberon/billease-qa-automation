describe("App launch", () => {
  it("shows the landing screen with Log in and Sign up", async () => {
    // A fresh install shows an intro screen first. Wait for it to appear (up to 20s), then tap it.
    const getStarted = $(
      'android=new UiSelector().textMatches("(?i)get started")',
    );
    await getStarted.waitForDisplayed({ timeout: 20000 });
    await getStarted.click();

    await expect($("id=btn_log_in")).toBeDisplayed();
    await expect($("id=sign_up")).toBeDisplayed();
  });
});
