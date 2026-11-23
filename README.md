# BillEase QA Automation

Mobile test automation for the BillEase app, covering **Login**, **Forgot Password** and **Sign Up** on **Android** and **iOS**.

Built with Appium, WebdriverIO and JavaScript, using the Page Object Model. The same tests run on both platforms; only the locators differ.

## Deliverables

| | |
|---|---|
| Test cases and results (per platform) | [docs/TEST_CASES.md](docs/TEST_CASES.md) |
| Bug report (with affected platform) | [docs/BUGS.md](docs/BUGS.md) |
| Screen recordings (Android run, iOS run on a real iPhone, iOS Terms bug) | [Google Drive folder](https://drive.google.com/drive/folders/1d2D7QG8Q_hgE5EYkZ8dmdkdj6ti_2TWt?usp=sharing) |

## Results at a glance

| | Android | iOS |
|---|---|---|
| Device | Pixel 8 emulator, Android 15 (API 35) | iPhone 18 Pro, iOS 27.0.1 (real device) |
| Automated tests | 21 / 21 pass | 20 / 21 pass (SGN-004 fails because of a real iOS bug, see BUG-001) |
| Test cases (manual + automated) | 29: 25 pass, 4 blocked | 29: 23 pass, 2 fail, 4 blocked |
| Bugs found | 8 in total, 2 Medium and 6 Low ([details](docs/BUGS.md)) | |

## Test data and safety rules

The assessment asked not to create a real account or use real personal data, so:

- Emails use `example.com`, which can never reach a real inbox.
- Mobile numbers are deliberately too short (`09017`, `0917123`), so no OTP can ever be sent.
- The password is made up (`QaTest!2345`).
- No sign up is ever completed, and Account recovery is never continued (it asks for ID details).

Cases that can't be tested within these rules (successful login, valid sign up, real password reset, ID verification) are marked **Blocked** in the test cases.

## Tech stack

| Tool | Version |
|---|---|
| Node.js | 24 (see `.nvmrc`) |
| Appium | 3.x |
| UiAutomator2 driver (Android) | 8.x |
| XCUITest driver (iOS) | 12.x |
| WebdriverIO + Mocha | 9.x |

## Project structure

```
config/
  wdio.shared.conf.js     # settings shared by both platforms, failure screenshots
  wdio.android.conf.js    # Android capabilities
  wdio.ios.conf.js        # iOS capabilities (read from environment variables)
src/
  helpers/
    selector.js           # byPlatform(), byText(), shared iOS back button
    app.helper.js         # resetApp(): fresh state before each test
  pageobjects/            # one class per screen
    welcome.page.js
    login.page.js
    forgot-password.page.js
    account-recovery.page.js
    signup.page.js
test/specs/               # the tests
  launch.spec.js
  login.spec.js
  forgot-password.spec.js
  signup.spec.js
docs/                     # test cases, bug report, screenshots
```

### How the code is organised

- **Page objects** hold the locators and actions for each screen. Tests only describe *what* to check.
- **One locator per platform.** Each element is defined once with `byPlatform({ android, ios })`, so the same test runs on both.
  - Android uses the resource ids from the app (`id=login_input_password`).
  - iOS uses accessibility ids where the app provides them (`~otcPasswordTextField`), otherwise predicate strings.
- **Waits, not sleeps.** Page objects wait for a screen to be ready before tapping, which removed the flaky failures seen early on.
- **Tags** in test titles (`@smoke`, `@negative`) let you run a subset.
- **Failure evidence:** when a test fails, a screenshot and the screen's XML are saved to `reports/screenshots/`.

## Setup

```bash
git clone https://github.com/mikeberon/billease-qa-automation.git
cd billease-qa-automation
nvm use            # or install Node 24
npm install
```

### Android

Requirements: Android Studio, an emulator (tested on Pixel 8, API 35, with Google Play), and BillEase installed from the Play Store on that emulator.

```bash
npx appium driver install uiautomator2
```

Make sure `ANDROID_HOME` is set and the emulator is running (`adb devices` should list `emulator-5554`).

### iOS

Requirements: a **Mac with Xcode**, a **real iPhone** with BillEase installed from the App Store, and an Apple ID (a free one works).

1. Install the driver:
   ```bash
   npx appium driver install xcuitest
   ```
2. On the iPhone, connect it by cable, trust the Mac, and turn on **Settings > Privacy & Security > Developer Mode**.
3. Sign WebDriverAgent (the helper app Appium installs on the phone):
   - Open `~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent/WebDriverAgent.xcodeproj` in Xcode.
   - For the **WebDriverAgentLib** and **WebDriverAgentRunner** targets, choose your team under Signing & Capabilities and give WebDriverAgentRunner a unique bundle id (e.g. `com.yourname.WebDriverAgentRunner`).
   - Select your iPhone and run **Product > Test** once. When the phone shows "Automation Running", it works. Stop it.
4. Set your device details as environment variables (they're kept out of the repo on purpose):
   ```bash
   export IOS_UDID=<your iPhone UDID>        # xcrun devicectl list devices
   export IOS_BUNDLE_ID=com.billease
   export IOS_TEAM_ID=<your Apple Team ID>   # Xcode > Settings > Accounts
   export IOS_WDA_BUNDLE_ID=<the WebDriverAgentRunner bundle id from step 3>
   ```

## Running the tests

Appium is started automatically by WebdriverIO; you don't need to start it yourself.

| Command | What it runs |
|---|---|
| `npm run test:android` | All Android tests |
| `npm run test:android:smoke` | Android `@smoke` tests |
| `npm run test:android:negative` | Android `@negative` tests |
| `npm run test:android:login` / `:forgot` / `:signup` | One feature on Android |
| `npm run test:ios` | All iOS tests (same terminal where you exported the variables) |
| `npm run test:ios:smoke` | iOS `@smoke` tests |

## What couldn't be done on iOS, and why

- **No simulator, real device only.** The BillEase build from the App Store can't be installed on the iOS Simulator, and no simulator build was provided. All iOS runs were on a real iPhone.
- **A Mac was only available for one day.** iOS needs Xcode, so the iOS suite was set up, debugged and recorded in one session on a borrowed Mac (22 Nov). Android was developed and run on Windows.
- **App data can't be cleared on a real iPhone.** On Android each test starts from a clean install state (`mobile: clearApp`). On iOS that isn't possible without reinstalling the App Store app, and BillEase **reopens on the last screen** after a restart. Instead, `resetApp()` restarts the app and taps back (or Cancel on Account recovery) until it reaches the landing screen.
- **Free Apple ID limits.** WebDriverAgent was signed with a free Apple ID. Its provisioning profile expires after 7 days, so the signing step has to be repeated after that.
- **Some error messages differ on iOS.** Where both wordings are correct, the test accepts each platform's text (FPW-002, LGN-005) and the difference is logged as BUG-003. Where iOS shows a wrong message, the test is left failing on purpose (SGN-004, BUG-001).
- **Manual-only cases on iOS** (Sign Up link, Back on Login, Privacy/Terms links) were checked by hand on the iPhone rather than automated.

## Known limitations and next steps

- The suite runs on one device at a time; no CI pipeline yet (Android could run on a hosted emulator, iOS needs a Mac runner or a device cloud).
- The Blocked cases need a dedicated test account and test OTP numbers from the BillEase team.
- LGN-009, LGN-010 and SGN-008 could be automated next.
