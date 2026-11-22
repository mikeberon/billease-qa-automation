# Test Cases

App: BillEase (Play Store / App Store build)
Scope: Login, Forgot Password, Sign Up

## Test environment

| | Android | iOS |
|---|---|---|
| Device | Pixel 8 emulator, Android 15 (API 35) | iPhone 18 Pro (real device) |
| App source | Google Play | App Store |
| How it was run | Manual + automated (Appium) | Manual + automated (Appium, real device) |
| Date | 21 Nov 2026 | 22 Nov 2026 |

## Test data

Only fake data was used. No account was created and no sign up was completed.

| Data | Value | Why |
|---|---|---|
| Email | `qa.tester@example.com` | example.com is reserved, it can't reach a real inbox |
| Invalid email | `qa.tester@` | Missing domain |
| Mobile | `09017` / `0917123` | Too short to be a real PH number, so no OTP can be sent |
| Password | `QaTest!2345` | Made up |

A valid 11-digit mobile number was never entered on any screen that sends an OTP.

## Results key

- **Pass** / **Fail**: result of the run
- **Not run**: not executed yet
- **Blocked**: can't be run without breaking the assessment rules (real account or real data)
- **Auto**: also covered by the automated suite (test ID matches the spec)

---

## Launch

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| LCH-001 | Landing screen loads | 1. Fresh install, open app 2. Tap Get started | Landing screen shows Log in and Sign up | Pass | Pass | Yes |

## Login

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| LGN-001 | Login screen elements | Landing > Log in | Title, Mobile/Email, Password, show password, Forgot password?, Log in button, Sign Up link, Back are shown | Pass | Pass | Yes |
| LGN-002 | Password is masked | Type `QaTest!2345` in Password | Characters are hidden | Pass | Pass | Yes |
| LGN-003 | Show password | Type password, tap the eye icon | Password is shown in plain text | Pass | Pass | Yes |
| LGN-004 | Both fields empty | Tap Log in with nothing entered | "This field is required" under Mobile/Email, stays on Login | Pass | Pass | Yes |
| LGN-005 | Invalid mobile format | Mobile `0917123`, any password, tap Log in | "Invalid email or mobile" (iOS: "This is not a valid phone number") | Pass | Pass | Yes |
| LGN-006 | Unregistered account | `qa.tester@example.com` + `QaTest!2345`, tap Log in | "Please use correct username and password.", stays on Login | Pass | Pass | Yes |
| LGN-007 | Password empty | Valid looking email, empty password, tap Log in | "This field is required" under Password | Pass | Pass | Yes |
| LGN-008 | Forgot password link | Tap Forgot password? | Forgot password screen opens | Pass | Pass | Yes (via FPW tests) |
| LGN-009 | Sign Up link | Tap Sign Up | Sign up screen opens | Not run | Pass | No |
| LGN-010 | Back button | Tap Back | Returns to landing screen | Not run | Pass | No |
| LGN-011 | Successful login | Log in with a real registered account | User lands on home screen | Blocked | Blocked | No |

Notes:
- LGN-005 wording differs on iOS (see BUGS.md).
- After a failed login, a "Get one time code" option appears and the Sign Up link is hidden.
- With both fields empty only the first field shows an error. The password error only appears once the first field is filled (LGN-007).

## Forgot Password

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| FPW-001 | Screen elements | Login > Forgot password? | Title, Mobile/Email field, Reset button, Back are shown | Pass | Pass | Yes |
| FPW-002 | Empty field | Tap Reset with nothing entered | "Please enter a valid email or mobile number." (iOS: "This field is required"), stays on screen | Pass | Pass | Yes |
| FPW-003 | Invalid mobile | Enter `09017`, tap Reset | Same error, no request sent, stays on screen | Pass | Pass | Yes |
| FPW-004 | Unregistered email | Enter `qa.tester@example.com`, tap Reset | Account recovery screen opens with Continue and Cancel | Pass | Pass | Yes |
| FPW-005 | Cancel account recovery | From FPW-004, tap Cancel | Returns to landing screen | Pass | Pass | Yes |
| FPW-006 | Back button | Tap Back | Returns to Login | Pass | Pass | Yes |
| FPW-007 | Continue account recovery | From FPW-004, tap Continue | ID verification flow | Blocked | Blocked | No |
| FPW-008 | Reset for a registered account | Enter a real registered mobile/email | Reset code or link is sent | Blocked | Blocked | No |

Notes:
- The error shows while typing, before Reset is tapped.
- FPW-007 asks for ID details, so it was not continued.
- On iOS the Account recovery screen shows "Account Recovery", "CONTINUE" and "CANCEL", and has no back arrow.
- The empty-field message differs by platform (see BUGS.md).

## Sign Up

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| SGN-001 | Screen elements | Landing > Sign up | Title, Mobile, Email, consent checkbox, Sign up button, Back are shown | Pass | Pass | Yes |
| SGN-002 | Empty form | Tap Sign up with nothing entered | "Please enter mobile number", "Please enter email", "Please tick checkbox to indicate that you understand" | Pass | Pass | Yes |
| SGN-003 | Invalid mobile | Mobile `09017`, valid email, consent ticked, tap Sign up | "Invalid number", stays on screen | Pass | Pass | Yes |
| SGN-004 | Invalid email | Mobile `09017`, email `qa.tester@`, consent ticked, tap Sign up | "Invalid email address" | Pass | **Fail** | Yes |
| SGN-005 | Consent not ticked | Mobile `09017`, valid email, consent unticked, tap Sign up | Consent error shown | Pass | Pass | Yes |
| SGN-006 | Tick consent clears error | Tap Sign up empty, then tick consent | Consent error disappears | Pass | Pass | Yes |
| SGN-007 | Back button | Tap Back | Returns to landing screen | Pass | Pass | Yes |
| SGN-008 | Privacy Policy / Terms links | Tap Privacy Policy, then Terms & Conditions | Each document opens | Not run | **Fail** | No |
| SGN-009 | Valid sign up | Valid mobile + email + consent, tap Sign up | OTP is sent | Blocked | Blocked | No |

Notes:
- SGN-004 fails on iOS: `qa.tester@` shows "Please enter email", as if the field were empty (see BUGS.md).
- SGN-008 fails on iOS: Privacy Policy opens, but Terms & Conditions stays blank after loading (see BUGS.md).
- SGN-009 would send an OTP to a real number and start a real account, which the assessment rules don't allow.

---

## Summary

| | Android | iOS |
|---|---|---|
| Total | 29 | 29 |
| Pass | 22 | 23 |
| Fail | 0 | 2 |
| Not run | 3 | 0 |
| Blocked | 4 | 4 |
| Automated | 21 (21 pass) | 21 (20 pass, SGN-004 fails on a real bug) |
