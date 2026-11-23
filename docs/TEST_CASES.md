# Test Cases

**Scope:** Login, Forgot Password, Sign Up

| | Android | iOS |
|---|---|---|
| Device | Pixel 8 emulator, Android 15 (API 35) | iPhone 18 Pro, iOS 27.0.1 (real device) |
| Build | Google Play | App Store 4.72.0 |
| Execution | Manual + Appium | Manual + Appium |
| Date | 21, 23 Nov 2026 | 22 Nov 2026 |

**Test data:** `qa.tester@example.com`, `qa.tester@` (invalid), mobile `09017` / `0917123` (too short to receive an OTP), password `QaTest!2345`. No real account or personal data was used.

**Status:** Pass, Fail, Blocked (needs a real account or real data, not allowed by the assessment). **Auto** = covered by the automated suite under the same ID.

## Launch

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| LCH-001 | Landing screen | Open app, tap Get started | Log in and Sign up buttons shown | ✅ Pass | ✅ Pass | Yes |

## Login

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| LGN-001 | Screen elements | Open Log in | Mobile/Email, Password, show password, Forgot password, Log in, Sign up link, Back | ✅ Pass | ✅ Pass | Yes |
| LGN-002 | Password masked | Enter password | Characters hidden | ✅ Pass | ✅ Pass | Yes |
| LGN-003 | Show password | Enter password, tap eye icon | Password visible | ✅ Pass | ✅ Pass | Yes |
| LGN-004 | Empty fields | Tap Log in | "This field is required" | ✅ Pass | ✅ Pass | Yes |
| LGN-005 | Invalid mobile | `0917123` + password, tap Log in | Invalid mobile error | ✅ Pass | ✅ Pass | Yes |
| LGN-006 | Unregistered account | `qa.tester@example.com` + password, tap Log in | "Please use correct username and password." | ✅ Pass | ✅ Pass | Yes |
| LGN-007 | Empty password | Email only, tap Log in | "This field is required" on Password | ✅ Pass | ✅ Pass | Yes |
| LGN-008 | Forgot password link | Tap Forgot password? | Forgot password screen opens | ✅ Pass | ✅ Pass | Yes |
| LGN-009 | Sign up link | Tap Sign up | Sign up screen opens | ✅ Pass | ✅ Pass | No |
| LGN-010 | Back | Tap Back | Landing screen | ✅ Pass | ✅ Pass | No |
| LGN-011 | Valid login | Registered account | Home screen | Blocked | Blocked | No |

Notes: LGN-005 wording differs per platform (BUG-003). Login shows one error at a time (BUG-007).

## Forgot Password

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| FPW-001 | Screen elements | Log in, tap Forgot password? | Field, Reset, Back | ✅ Pass | ✅ Pass | Yes |
| FPW-002 | Empty field | Tap Reset | Required field error | ✅ Pass | ✅ Pass | Yes |
| FPW-003 | Invalid mobile | `09017`, tap Reset | "Please enter a valid email or mobile number." | ✅ Pass | ✅ Pass | Yes |
| FPW-004 | Unregistered email | `qa.tester@example.com`, tap Reset | Account recovery screen | ✅ Pass | ✅ Pass | Yes |
| FPW-005 | Cancel recovery | From FPW-004, tap Cancel | Landing screen | ✅ Pass | ✅ Pass | Yes |
| FPW-006 | Back | Tap Back | Log in screen | ✅ Pass | ✅ Pass | Yes |
| FPW-007 | Continue recovery | From FPW-004, tap Continue | ID verification | Blocked | Blocked | No |
| FPW-008 | Valid reset | Registered mobile/email | Reset code sent | Blocked | Blocked | No |

Notes: FPW-002 wording differs per platform (BUG-003). FPW-004 and FPW-005 behaviour logged as BUG-005 and BUG-006.

## Sign Up

| ID | Scenario | Steps | Expected | Android | iOS | Auto |
|---|---|---|---|---|---|---|
| SGN-001 | Screen elements | Open Sign up | Mobile, Email, consent checkbox, Sign up, Back | ✅ Pass | ✅ Pass | Yes |
| SGN-002 | Empty form | Tap Sign up | Errors on Mobile, Email and consent | ✅ Pass | ✅ Pass | Yes |
| SGN-003 | Invalid mobile | `09017`, valid email, consent, tap Sign up | "Invalid number" | ✅ Pass | ✅ Pass | Yes |
| SGN-004 | Invalid email | `09017`, `qa.tester@`, consent, tap Sign up | "Invalid email address" | ✅ Pass | ❌ Fail | Yes |
| SGN-005 | No consent | `09017`, valid email, tap Sign up | Consent error | ✅ Pass | ✅ Pass | Yes |
| SGN-006 | Consent clears error | Tap Sign up, then tick consent | Consent error removed | ✅ Pass | ✅ Pass | Yes |
| SGN-007 | Back | Tap Back | Landing screen | ✅ Pass | ✅ Pass | Yes |
| SGN-008 | Policy links | Tap Privacy Policy, then Terms & Conditions | Both documents load | ✅ Pass | ❌ Fail | No |
| SGN-009 | Valid sign up | Valid mobile, email, consent | OTP sent | Blocked | Blocked | No |

Notes: SGN-004 fails on iOS (BUG-001). SGN-008 fails on iOS (BUG-002). SGN-009 would send a real OTP.

## Summary

| | Android | iOS |
|---|---|---|
| Total | 29 | 29 |
| Pass | 25 | 23 |
| Fail | 0 | 2 |
| Blocked | 4 | 4 |
| Automated | 21/21 pass | 20/21 pass (SGN-004, BUG-001) |
