# Branch Protection Readiness

Recommended protection for `main` before CYNX is treated as production-ready.

## Required settings

- Require a pull request before merging.
- Require at least 1 approving review.
- Require status checks to pass before merging.
- Required check: `Typecheck, test, and build`.
- Require branches to be up to date before merging.
- Block force pushes.
- Block branch deletion.
- Restrict direct pushes to trusted maintainers only.

## Why this matters

CYNX is a public client-facing website repo. Branch protection prevents accidental
or unauthorized direct changes to `main`, keeps builds reproducible, and gives
FLOCK a review gate before deployment.

## GitHub UI path

Repository settings → Branches → Branch protection rules → Add rule.

Use branch name pattern:

```text
main
```

Then enable the settings above after the first CI run has registered the check
name in GitHub.
