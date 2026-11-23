# BillEase QA Automation

Appium tests for the BillEase mobile app on Android and iOS. Covers Login, Forgot Password and Sign Up.

Stack: Appium 3, WebdriverIO 9, Mocha, JavaScript, Page Object Model.

## Deliverables

- [Test cases](docs/TEST_CASES.md)
- [Test report](docs/TEST_REPORT.md): pass rates, expected vs actual per platform, recommendations
- [Bugs](docs/BUGS.md)
- [Screen recordings](https://drive.google.com/drive/folders/1d2D7QG8Q_hgE5EYkZ8dmdkdj6ti_2TWt?usp=sharing) (Android run, iOS run, BUG-002)

## Results

| | Android | iOS |
|---|---|---|
| Device | Pixel 8 emulator, API 35 | iPhone 18 Pro, iOS 27.0.1 (real device) |
| Automated | 21/21 pass | 20/21 pass |
| Test cases (29) | 25 pass, 4 blocked | 23 pass, 2 fail, 4 blocked |
| Pass rate (executed) | 100% | 92% |

SGN-004 fails on iOS because of a real bug (BUG-001). 8 bugs logged in total. Full details in the [test report](docs/TEST_REPORT.md).

## Test data

No real account or personal data. Emails use `example.com`, mobile numbers are too short to receive an OTP (`09017`, `0917123`), and no sign up or account recovery is completed. Cases that need a real account are marked Blocked.

## Project structure

```
config/            WebdriverIO configs (shared, android, ios)
src/helpers/       platform locator helper, app reset
src/pageobjects/   one page object per screen
test/specs/        launch, login, forgot-password, signup
docs/              test cases, bug report, screenshots
```

- Each element has one locator per platform via `byPlatform({ android, ios })`, so the same specs run on both.
- Android uses resource ids, iOS uses accessibility ids or predicate strings.
- Tests are tagged `@smoke` and `@negative`.
- On failure, a screenshot and the page source are saved to `reports/screenshots/`.

## Setup

```bash
git clone https://github.com/mikeberon/billease-qa-automation.git
cd billease-qa-automation
nvm use
npm install
```

### Android

1. Android Studio with an emulator (tested: Pixel 8, API 35, Google Play image)
2. Install BillEase from the Play Store on the emulator
3. `npx appium driver install uiautomator2`
4. `ANDROID_HOME` set, emulator running (`adb devices`)

### iOS

Needs a Mac with Xcode and a real iPhone with BillEase from the App Store.

1. `npx appium driver install xcuitest`
2. Connect the iPhone, trust the Mac, enable Developer Mode (Settings, Privacy & Security)
3. Sign WebDriverAgent: open `~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent/WebDriverAgent.xcodeproj`, set your team on WebDriverAgentLib and WebDriverAgentRunner, give the runner a unique bundle id, run Product > Test once on the phone
4. Set environment variables:

```bash
export IOS_UDID=<device udid>              # xcrun devicectl list devices
export IOS_BUNDLE_ID=com.billease
export IOS_TEAM_ID=<apple team id>
export IOS_WDA_BUNDLE_ID=<runner bundle id>
```

## Run

| Command | Runs |
|---|---|
| `npm run test:android` | All Android tests |
| `npm run test:android:smoke` | Android smoke |
| `npm run test:android:negative` | Android negative |
| `npm run test:android:login` / `:forgot` / `:signup` | One feature |
| `npm run test:ios` | All iOS tests |
| `npm run test:ios:smoke` | iOS smoke |

Appium is started by WebdriverIO.

## iOS limitations

- **Real device only.** The App Store build cannot run on the iOS Simulator.
- **Mac access was limited to one day.** The iOS suite was set up, run and recorded on a borrowed Mac on 22 Nov.
- **No app data reset.** A real iPhone can't clear app data without reinstalling, and BillEase reopens on the last screen. `resetApp()` restarts the app and taps Back (or Cancel on Account recovery) until the landing screen shows. Android uses `mobile: clearApp`.
- **Free Apple ID.** WebDriverAgent signing expires after 7 days and must be redone.
- **Different error text on iOS.** Where both messages are valid, the test expects each platform's text (FPW-002, LGN-005, logged as BUG-003). Where iOS is wrong, the test stays failing (SGN-004, BUG-001).

## Next steps

- CI: hosted emulator for Android, Mac runner or device cloud for iOS
- Test account and test OTP numbers to unblock the Blocked cases
- Automate LGN-009, LGN-010 and SGN-008
