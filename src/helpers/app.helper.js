import { IOS_BACK_BUTTON } from "./selector.js";
import AccountRecoveryPage from "../pageobjects/account-recovery.page.js";

const ANDROID_APP_ID = "ph.billeasev2.mobile";
const IOS_BUNDLE_ID = process.env.IOS_BUNDLE_ID;

// Fresh app state before each test
export async function resetApp() {
  if (driver.isIOS) {
    await driver.terminateApp(IOS_BUNDLE_ID);
    await driver.activateApp(IOS_BUNDLE_ID);
    await backToLanding();
    return;
  }

  // clearApp also resets permissions, so we grant notifications
  // again to keep the popup away
  await driver.execute("mobile: clearApp", { appId: ANDROID_APP_ID });
  await driver.execute("mobile: changePermissions", {
    permissions: "android.permission.POST_NOTIFICATIONS",
    appPackage: ANDROID_APP_ID,
    action: "grant",
  });
  await driver.activateApp(ANDROID_APP_ID);
}

// The iOS app reopens on the last screen it was on,
// so tap the back arrow until we're on the landing screen (it has none)
// The iOS app reopens on the last screen it was on, so go back
// until we're on the landing screen (it has no back arrow or Cancel)
async function backToLanding() {
  const backButton = $(IOS_BACK_BUTTON);
  const cancelButton = AccountRecoveryPage.cancelButton;
  for (let i = 0; i < 5; i++) {
    const canGoBack = await driver
      .waitUntil(
        async () => (await backButton.isDisplayed()) || (await cancelButton.isDisplayed()),
        { timeout: 3000 },
      )
      .catch(() => false);
    if (!canGoBack) return;
    if (await cancelButton.isDisplayed()) await cancelButton.click();
    else await backButton.click();
  }
}