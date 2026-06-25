# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-06-25

### Added

- **Telegram Provider**: Send text messages via the Telegram Bot API.
  - `sendkit telegram <chatId> "<message>"` command
  - Environment-based authentication via `TELEGRAM_BOT_TOKEN`
  - Response validation with message ID confirmation
  - Graceful error handling with descriptive failure messages

- **CLI Foundation**: Built on Commander.js with subcommand architecture.
  - `sendkit` root command with help system
  - `sendkit telegram` subcommand with positional arguments
  - Built-in `--help` flag for all commands

- **Monorepo Architecture**: Bun workspace-based monorepo.
  - `packages/cli` — CLI interface package
  - Shared TypeScript configuration (ES2022, strict mode)
  - Bun lockfile for deterministic installs

- **Project Infrastructure**:
  - Enterprise-level `.gitignore` (OS, IDE, languages, security)
  - `.env.example` template for environment configuration
  - MIT License
  - Contributing guidelines with Conventional Commits spec
  - Code of Conduct (Contributor Covenant v2.1)
  - Security policy with vulnerability reporting process
  - Comprehensive README with architecture overview

---

## [Unreleased]

### Planned

- Email provider (SMTP / SendGrid)
- Slack provider (Webhook / Bot API)
- Discord provider (Webhook / Bot API)
- Core SDK package (`@sendkit/core`)
- MCP Server package (`@sendkit/mcp-server`)
- Premium CLI styling with ANSI gradients and spinners

---

[0.1.0]: https://github.com/RISHII7/sendkit/releases/tag/v0.1.0
[Unreleased]: https://github.com/RISHII7/sendkit/compare/v0.1.0...HEAD
