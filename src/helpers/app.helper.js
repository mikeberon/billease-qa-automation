const APP_ID = 'ph.billeasev2.mobile';

// Fresh app state before each test. clearApp also resets permissions,
// so we grant notifications again to keep the popup away.
export async function resetApp() {
  await driver.execute('mobile: clearApp', { appId: APP_ID });
  await driver.execute('mobile: changePermissions', {
    permissions: 'android.permission.POST_NOTIFICATIONS',
    appPackage: APP_ID,
    action: 'grant',
  });
  await driver.activateApp(APP_ID);
}