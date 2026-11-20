export const config = {
  runner: 'local',
  port: 4723,

  // Where the tests live (relative to this config file)
  specs: ['../test/specs/**/*.spec.js'],
  maxInstances: 1, // one emulator, so one test file at a time

  // Same idea as the capabilities you typed into Inspector
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:appPackage': 'ph.billeasev2.mobile',
      'appium:appActivity': '.DefaultAppAlias',
      'appium:noReset': false, // clear app data on start, so every run begins fresh
      'appium:autoGrantPermissions': true, // auto-accept permission pop-ups
      'appium:disableIdLocatorAutocompletion': true, // use Compose ids exactly as written
    },
  ],

  logLevel: 'warn',
  waitforTimeout: 15000, // default wait for elements, like Cypress's defaultCommandTimeout

  services: ['appium'], // starts/stops the Appium server for us
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 120000 },
};