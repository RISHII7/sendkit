# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.3] - 2026-06-26

### Added

- **CLI Redesign**: Complete rewrite of the CLI with ASCII art banner, interactive setup wizard (`sendkit init`), Clack spinners, color-coded output via picocolors, and a new `sendkit status` health-check command that validates config and tests API connectivity.
- **CLI `--json` flag**: Added `--json` flag to `sendkit telegram` for headless/CI usage — outputs raw JSON, no UI.
- **Package READMEs**: Created world-class READMEs for all three NPM packages (`sendkit-core`, `sendkit`, `sendkit-mcp`) with centered logos, badge rows, API docs, architecture diagrams, and ecosystem tables.
- **Root README**: Rewrote the monorepo README with ASCII art demo, architecture diagram, tech stack table, and project structure.
- **Logo**: Added project logo (`assets/logo.png`) used across all package READMEs and the root README.
- **Remote MCP Landing**: Added a branded JSON landing page at the root of the Vercel deployment with version, status, endpoints, and docs link.

### Changed

- **Package Metadata**: Added `description`, `keywords`, `author`, `license`, `repository`, `homepage`, and `bugs` fields to all three `package.json` files for better NPM discoverability.
- **Version**: Bumped all packages to `1.0.3`.

## [1.0.2] - 2026-06-26

### Added

- **Documentation**: Added global NPM install instructions to the README.
- **AI Agent Skill**: Added the `npx skills add` command in the README to allow users to directly import the SendKit skill into their AI IDEs (e.g. Antigravity).

### Fixed

- **Skill Metadata**: Updated the package namespace in `SKILL.md` from `@cwa-dev` to `@rishi1006` to correctly point to the published NPM packages.
- **Environment Variables**: Updated `.env.example` to include the required Clerk OAuth keys (`CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`) for Remote MCP deployments.


## [1.0.1] - 2026-06-26

### Fixed

- **Vercel Deployment**: Fixed the Bun command syntax in the `remote-mcp` build script so that Vercel properly builds workspace dependencies.
- **Vercel Build Output**: Added an empty `public` directory with a `.keep` file to satisfy Vercel's Edge Function build requirements for API-only projects.


## [1.0.0] - 2026-06-26

### Added

- **NPM Publication**: Officially published all three packages to the NPM registry under the `@rishi1006` scope.
- Added NPM status badges to `README.md`.
- Updated documentation with direct `npx` execution instructions for the CLI and Local MCP server.
- **Vercel Edge Network Support**: Migrated the Remote MCP server to use the `hono/vercel` adapter on the Edge runtime for seamless deployment on Vercel.

## [0.8.1] - 2026-06-26

### Fixed

- **Publishing Configuration**: Fixed NPM publishing configuration and corrected package scopes.
  - Corrected NPM package scope to `@rishi1006` (single 'i').
  - Added `main`, `module`, `types`, and `exports` fields to all package `package.json` files.
  - Configured `publishConfig.access` to `public`.
  - Added executable shebangs (`#!/usr/bin/env node`) to the CLI and Local MCP server entrypoints.

## [0.8.0] - 2026-06-26

### Added

- **Package Scoping**: Renamed internal packages to use the `@rishi1006` npm scope to prepare for registry publishing.
  - `@rishi1006/sendkit-core`
  - `@rishi1006/sendkit` (CLI)
  - `@rishi1006/sendkit-mcp` (Local MCP)
- **Build Pipeline**: Integrated `tsdown` (powered by rolldown) for blazing fast TypeScript bundling and `.d.ts` generation.
  - Added `build:core`, `build:cli`, and `build:local-mcp` scripts to the workspace root.
  - Configured `tsdown.config.ts` and `tsconfig.build.json` for each publishable package.

## [0.7.0] - 2026-06-26

### Added

- **Workspace Tooling**: Integrated high-performance tooling into the monorepo root.
  - Added `oxlint` for blazingly fast linting.
  - Added `oxfmt` for code formatting.
  - Added `tsc --noEmit` for workspace-wide type checking.
  - Centralized `@types/node` dependency to the workspace root.
  - Formatted the entire codebase using the new tools.

## [0.6.0] - 2026-06-26

### Added

- **CLI Configuration**: Introduced a new `sendkit init` command to configure local CLI settings.
  - Generates a local config file at `~/.config/sendkit/config.json` to store provider credentials securely.
  - Added `--telegram-bot-token` flag to the `init` command.
  - The CLI now reads credentials from the local config file instead of relying on environment variables.

### Changed

- **CLI Output**: The `sendkit telegram` command now outputs a structured JSON response instead of human-readable text to improve scriptability.
- **CLI Error Handling**: Improved global error handling using top-level `.catch()` on `program.parseAsync()`.

## [0.5.0] - 2026-06-26

### Added

- **Remote MCP Authentication**: Added native OAuth 2.0 support to the Remote MCP Server using Clerk (`@clerk/backend`, `@clerk/mcp-tools`).
  - Added the `/.well-known/oauth-protected-resource/:botToken/mcp` endpoint for providing OAuth metadata to AI IDE clients like Claude.
  - Secured the main MCP SSE endpoint with `clerkClient.authenticateRequest` to enforce `oauth_token` Bearer authentication.
  - Configured `x-forwarded-proto` and `x-forwarded-host` parsing in Hono to ensure proper metadata generation behind tunneling services like ngrok.
  - Updated environment variables requirement to include `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

## [0.4.0] - 2026-06-25

### Added

- **Remote MCP Server (`sendkit-remote-mcp`)**: Created a cloud-ready Model Context Protocol server.
  - Exposes the Telegram messaging capabilities over HTTP using Server-Sent Events (SSE).
  - Built with `hono` and `@modelcontextprotocol/sdk` v1.29.0 via `WebStandardStreamableHTTPServerTransport`.
  - Added URL parameter-based dynamic authentication for passing the bot token directly via `/not-a-real-token/mcp`.
  - Added `dev:remote-mcp` workspace script to boot the Hono app seamlessly.
- **Project Structure**: Introduced the `apps/` directory to separate network services from `packages/`.

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

[1.0.3]: https://github.com/RISHII7/sendkit/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/RISHII7/sendkit/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/RISHII7/sendkit/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/RISHII7/sendkit/compare/v0.8.2...v1.0.0
[0.8.2]: https://github.com/RISHII7/sendkit/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/RISHII7/sendkit/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/RISHII7/sendkit/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/RISHII7/sendkit/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/RISHII7/sendkit/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/RISHII7/sendkit/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/RISHII7/sendkit/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/RISHII7/sendkit/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/RISHII7/sendkit/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/RISHII7/sendkit/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/RISHII7/sendkit/releases/tag/v0.1.0
