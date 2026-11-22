import fs from 'node:fs';

export const config = {
  runner: 'local',
  port: 4723,

  specs: ['../test/specs/**/*.spec.js'],
  suites: {
    login: ['../test/specs/login.spec.js'],
    forgotPassword: ['../test/specs/forgot-password.spec.js'],
    signup: ['../test/specs/signup.spec.js'],
  },
  maxInstances: 1,

  logLevel: 'warn',
  waitforTimeout: 15000,

  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 120000 },

  // Save a screenshot and the screen's XML when a test fails
  afterTest: async function (test, context, { passed }) {
    if (!passed) await saveFailure(test.title);
  },

  // Same for failures in before/after hooks
  afterHook: async function (test, context, { passed }) {
    if (!passed) await saveFailure(test.title);
  },
};

async function saveFailure(title) {
  fs.mkdirSync("./reports/screenshots", { recursive: true });
  const name = title.replace(/[^\w-]+/g, "_");
  await driver.saveScreenshot(`./reports/screenshots/${name}.png`);
  fs.writeFileSync(`./reports/screenshots/${name}.xml`, await driver.getPageSource());
}
