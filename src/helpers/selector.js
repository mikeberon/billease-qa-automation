// Pick the locator for the platform the test is running on
export function byPlatform({ android, ios }) {
  return driver.isAndroid ? $(android) : $(ios);
}

// Find an element by its exact visible text
export function byText(text) {
  return byPlatform({
    android: `android=new UiSelector().text("${text}")`,
    ios: `-ios predicate string:label == "${text}"`,
  });
}