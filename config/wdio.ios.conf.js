import { config as shared } from './wdio.shared.conf.js';

// Runs on a real iPhone and needs a Mac with Xcode.
// Device details come from environment variables, see the README.
export const config = {
  ...shared,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:udid': process.env.IOS_UDID,
      'appium:bundleId': process.env.IOS_BUNDLE_ID,
      'appium:xcodeOrgId': process.env.IOS_TEAM_ID,
      'appium:xcodeSigningId': 'Apple Development',
      "appium:updatedWDABundleId": process.env.IOS_WDA_BUNDLE_ID,
      'appium:noReset': true,
      'appium:autoAcceptAlerts': true,
    },
  ],
};