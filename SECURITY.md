# Security Policy

## Scope

Git for Designers is a static, client-side web application. It has no backend,
no accounts, and makes no runtime network requests. Learner progress is stored
only in the browser's `localStorage`. The realistic security surface is limited
to the client-side code and repository content (for example: unsafe rendering of
user-editable text, or an accidentally committed credential).

## Reporting a vulnerability

Please report suspected vulnerabilities through **GitHub**:

- Preferred: open a report via the repository's **Security** tab ("Report a
  vulnerability") if private vulnerability reporting is enabled for this
  repository.
- Otherwise: open a regular GitHub issue that describes the *area* of the
  problem without publishing exploit details, and the maintainer will follow up.

Please do not publish exploit details publicly before the maintainer has had a
reasonable chance to respond. Response times depend on maintainer availability
and are not guaranteed.

## Out of scope

- Vulnerabilities requiring a modified client or browser extensions
- Issues in third-party platforms (GitHub itself, hosting providers)
- The learner editing their own local progress in their own browser
