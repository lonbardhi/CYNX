# CYNX QA Release Checklist

Owner: Carrot, Lead Manual/Automation QA  
Final technical approval: Akka

## Required Before Release

- [ ] Acceptance criteria reviewed and testable
- [ ] Smoke suite passed
- [ ] Regression suite passed or scoped exception approved
- [ ] Known issues reviewed and accepted
- [ ] Blocker bugs resolved
- [ ] Critical bugs resolved
- [ ] High bugs resolved or explicitly accepted with owner/date
- [ ] Mobile critical pages checked
- [ ] Browser compatibility checked for the release scope
- [ ] API health and critical endpoints checked
- [ ] No major console errors on critical routes
- [ ] Security-sensitive behavior reviewed if relevant
- [ ] Rollback plan exists
- [ ] Production checklist complete
- [ ] Post-release smoke plan ready
- [ ] Akka has final approval for release-impacting changes

## Smoke Scope

- [ ] App loads
- [ ] Main navigation works
- [ ] Contact modal opens
- [ ] Contact form validates bad input
- [ ] Contact form accepts valid input
- [ ] API contact endpoint accepts valid payload
- [ ] API contact endpoint rejects invalid payload
- [ ] Mobile viewport renders critical page correctly
- [ ] No broken critical route
- [ ] No major console errors

## Regression Scope

Run regression before production release, major feature release, payment/auth/role/database changes, client demo, or investor demo.

- [ ] Critical user journeys
- [ ] Previous bugs
- [ ] Edge cases
- [ ] Permission behavior if relevant
- [ ] Payment/transaction flows if relevant
- [ ] Mobile responsiveness
- [ ] Browser compatibility
- [ ] API regression
- [ ] Negative testing

## Carrot Release Note Template

```text
QA Status: Approved / Blocked / Approved with Known Issues

Summary:
Smoke: Passed / Failed / Not Run
Regression: Passed / Failed / Scoped Exception
Critical Bugs: 0
High Bugs: 0
Known Issues: 0
Risk Level: Low / Medium / High
Recommendation: Ready for Akka approval / Block release / Approve with known issues

Evidence:
- CI run:
- Playwright report:
- Screenshots/traces:

Rollback Plan:
-
```

## Blocking Rules

Block release if there is:

- Failed smoke test
- Failed login/auth where relevant
- Broken core user journey
- Security vulnerability
- Data loss risk
- Permission bypass
- Broken production build
- Critical API failure
- Unhandled crash
- Broken mobile layout on a critical page
- Missing acceptance criteria
- No QA evidence
- No rollback plan for risky release
