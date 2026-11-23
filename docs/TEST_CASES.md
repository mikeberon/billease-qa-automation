# Test Cases

**Scope:** Login, Forgot Password, Sign Up
**Platforms:** Android, iOS (same cases on both)
**Results:** see [TEST_REPORT.md](TEST_REPORT.md)

**Test data:** `qa.tester@example.com`, `qa.tester@` (invalid), mobile `09017` / `0917123` (too short to receive an OTP), password `QaTest!2345`. No real account or personal data.

**Precondition for all cases:** app installed, user logged out, on the landing screen.

**Type:** F = functional, N = negative, UI = screen elements. **Auto** = automated under the same ID.

## Launch

| ID | Title | Type | Priority | Steps | Expected result | Auto |
|---|---|---|---|---|---|---|
| LCH-001 | Landing screen loads | F | High | 1. Open the app<br>2. Tap Get started (first launch only) | Log in and Sign up buttons are shown | Yes |

## Login

| ID | Title | Type | Priority | Steps | Expected result | Auto |
|---|---|---|---|---|---|---|
| LGN-001 | Login screen elements | UI | High | 1. Tap Log in | Mobile/Email, Password, show password icon, Forgot password, Log in button, Sign up link and Back are shown | Yes |
| LGN-002 | Password is masked | F | High | 1. Open Log in<br>2. Enter `QaTest!2345` in Password | Characters are hidden | Yes |
| LGN-003 | Show password | F | Medium | 1. Enter a password<br>2. Tap the eye icon | Password is shown in plain text | Yes |
| LGN-004 | Both fields empty | N | High | 1. Open Log in<br>2. Tap Log in | Required field error is shown, user stays on Log in | Yes |
| LGN-005 | Invalid mobile format | N | High | 1. Enter `0917123` and a password<br>2. Tap Log in | Invalid mobile error is shown | Yes |
| LGN-006 | Unregistered account | N | High | 1. Enter `qa.tester@example.com` and `QaTest!2345`<br>2. Tap Log in | "Please use correct username and password." is shown, user stays on Log in | Yes |
| LGN-007 | Password empty | N | Medium | 1. Enter `qa.tester@example.com` only<br>2. Tap Log in | Required field error under Password | Yes |
| LGN-008 | Forgot password link | F | Medium | 1. Tap Forgot password? | Forgot password screen opens | Yes |
| LGN-009 | Sign up link | F | Medium | 1. Tap Sign up | Sign up screen opens | No |
| LGN-010 | Back button | F | Low | 1. Tap Back | Landing screen is shown | No |
| LGN-011 | Successful login | F | High | 1. Log in with a registered account | Home screen opens | No |

## Forgot Password

| ID | Title | Type | Priority | Steps | Expected result | Auto |
|---|---|---|---|---|---|---|
| FPW-001 | Forgot password elements | UI | High | 1. Open Log in<br>2. Tap Forgot password? | Mobile/Email field, Reset button and Back are shown | Yes |
| FPW-002 | Empty field | N | High | 1. Tap Reset with the field empty | Required field error is shown, user stays on the screen | Yes |
| FPW-003 | Invalid mobile | N | High | 1. Enter `09017`<br>2. Tap Reset | "Please enter a valid email or mobile number." is shown, no request sent | Yes |
| FPW-004 | Unregistered email | N | Medium | 1. Enter `qa.tester@example.com`<br>2. Tap Reset | User is told the account was not found, or is offered recovery | Yes |
| FPW-005 | Cancel account recovery | F | Low | 1. Do FPW-004<br>2. Tap Cancel | User returns to the previous screen | Yes |
| FPW-006 | Back button | F | Low | 1. Tap Back | Log in screen is shown | Yes |
| FPW-007 | Continue account recovery | F | Medium | 1. Do FPW-004<br>2. Tap Continue | ID verification flow starts | No |
| FPW-008 | Reset for a registered account | F | High | 1. Enter a registered mobile/email<br>2. Tap Reset | Reset code or link is sent | No |

## Sign Up

| ID | Title | Type | Priority | Steps | Expected result | Auto |
|---|---|---|---|---|---|---|
| SGN-001 | Sign up elements | UI | High | 1. Tap Sign up | Mobile, Email, consent checkbox, Privacy Policy and Terms links, Sign up button and Back are shown | Yes |
| SGN-002 | Empty form | N | High | 1. Tap Sign up with everything empty | Errors for Mobile, Email and consent are shown | Yes |
| SGN-003 | Invalid mobile | N | High | 1. Enter `09017`, a valid email, tick consent<br>2. Tap Sign up | "Invalid number" is shown | Yes |
| SGN-004 | Invalid email | N | High | 1. Enter `09017`, `qa.tester@`, tick consent<br>2. Tap Sign up | "Invalid email address" is shown | Yes |
| SGN-005 | Consent not ticked | N | High | 1. Enter `09017` and a valid email<br>2. Tap Sign up | Consent error is shown | Yes |
| SGN-006 | Ticking consent clears the error | F | Medium | 1. Tap Sign up with everything empty<br>2. Tick consent | Consent error disappears | Yes |
| SGN-007 | Back button | F | Low | 1. Tap Back | Landing screen is shown | Yes |
| SGN-008 | Privacy Policy and Terms links | F | Medium | 1. Tap Privacy Policy, close it<br>2. Tap Terms & Conditions | Both documents load | No |
| SGN-009 | Successful sign up | F | High | 1. Enter a valid mobile and email, tick consent<br>2. Tap Sign up | OTP is sent | No |

**Not executed by design:** LGN-011, FPW-007, FPW-008 and SGN-009 need a real account, real ID details or a real mobile number. The assessment does not allow this, so they are reported as Blocked.
