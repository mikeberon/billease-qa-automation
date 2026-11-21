import fs from 'node:fs';

export const config = {
  runner: 'local',
  port: 4723,

  specs: ['../test/specs/**/*.spec.js'],
  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'ph.billeasev2.mobile',
      'appium:appActivity': '.DefaultAppAlias',
      'appium:noReset': false,
      'appium:autoGrantPermissions': true,
      'appium:disableIdLocatorAutocompletion': true,
    },
  ],

  logLevel: 'warn',
  waitforTimeout: 15000,

  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 120000 },

  // Save a screenshot when a test fails
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      fs.mkdirSync('./reports/screenshots', { recursive: true });
      const name = test.title.replace(/[^\w-]+/g, '_');
      await driver.saveScreenshot(`./reports/screenshots/${name}.png`);
    }
  },
};