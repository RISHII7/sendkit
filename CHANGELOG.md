# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2026-06-25

### Added

- **MCP Server Package (`sendkit-mcp`)**: Created a local Model Context Protocol server.
  - Exposes the Telegram messaging capabilities natively to AI IDEs (Cursor, Windsurf, Antigravity, etc.).
  - Built on the official `@modelcontextprotocol/sdk` v1.29.0 via `stdio` transport.
  - Completely integrated with the type-safe `sendkit-core` SDK for validation.
  - Added `dev:local-mcp` workspace script to boot the server seamlessly.
- **Documentation**: Added MCP Server setup instructions and `.mcp.json` boilerplate config to the README.
- **Security**: Added `.mcp.json` to `.gitignore` under sensitive data to prevent local token leaks.

## [0.2.1] - 2026-06-25

### Fixed

- **Documentation**: Updated README to reflect the shipped status of `sendkit-core` and removed planned items.
- **Documentation**: Removed the "Planned" section from the CHANGELOG to maintain a strict record of actual changes.

---

## [0.2.0] - 2026-06-25

### Added

- **Core SDK Package (`sendkit-core`)**: Extracted messaging logic into a reusable, type-safe core library.
  - `schemas/` — Zod schemas for runtime validation of all Telegram I/O:
    - `telegramMessageInputSchema` — validates chat ID and message text
    - `telegramMessageOptionsSchema` — extends input with bot token
    - `telegramSendMessageRequestSchema` — validates outgoing API payload
    - `telegramSendMessageResponseSchema` — validates Telegram API response
    - `telegramMessageOutputSchema` — validates structured return value
  - `operations/` — Provider operation functions:
    - `sendTelegramMessage()` — end-to-end validated Telegram message sender
  - Barrel exports via `src/index.ts` for clean public API
  - Zod v4 for zero-dependency runtime type validation

### Changed

- **CLI (`sendkit`)**: Refactored to consume `sendkit-core` as a workspace dependency.
  - Replaced inline `fetch` + manual type cast with `sendTelegramMessage()` from core
  - Removed local `TelegramResponse` type definition (now provided by core schemas)
  - Improved error messages for missing environment variables and arguments
  - Added `try/catch` block for structured error handling of core SDK exceptions
  - Added `sendkit-core: workspace:*` as a workspace dependency

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

[0.3.0]: https://github.com/RISHII7/sendkit/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/RISHII7/sendkit/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/RISHII7/sendkit/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/RISHII7/sendkit/releases/tag/v0.1.0
