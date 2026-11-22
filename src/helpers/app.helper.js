const ANDROID_APP_ID = "ph.billeasev2.mobile";
const IOS_BUNDLE_ID = process.env.IOS_BUNDLE_ID;

// Fresh app state before each test
export async function resetApp() {
  if (driver.isIOS) {
    // No clearApp on a real iPhone, so restart the app instead
    await driver.terminateApp(IOS_BUNDLE_ID);
    await driver.activateApp(IOS_BUNDLE_ID);
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