import { config as shared } from "./wdio.shared.conf.js";

export const config = {
  ...shared,
  capabilities: [
    {
      platformName: "Android",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": "emulator-5554",
      "appium:appPackage": "ph.billeasev2.mobile",
      "appium:appActivity": ".DefaultAppAlias",
      "appium:noReset": false,
      "appium:autoGrantPermissions": true,
      "appium:disableIdLocatorAutocompletion": true,
    },
  ],
};