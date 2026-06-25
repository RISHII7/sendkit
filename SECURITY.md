# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | ✅ Current release |

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability within SendKit, please report it responsibly:

1. **Email**: Open a private security advisory on the [GitHub Security tab](https://github.com/RISHII7/sendkit/security/advisories/new).
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested fix (if any)

### Response Timeline

| Action | Timeline |
|--------|----------|
| Acknowledgment | Within 48 hours |
| Initial Assessment | Within 5 business days |
| Fix & Release | Within 30 days (critical), 90 days (non-critical) |

## Security Best Practices

When using SendKit:

- **Never commit** `.env` files or API tokens to version control.
- **Rotate** your `TELEGRAM_BOT_TOKEN` if you suspect it has been compromised.
- **Use** the `.env.example` template and keep secrets local.
- **Review** the `.gitignore` to ensure sensitive files are excluded.

## Scope

This security policy applies to:

- The `sendkit` CLI package
- All packages within this monorepo
- Official GitHub releases and tags

Thank you for helping keep SendKit and its users safe! 🔒
