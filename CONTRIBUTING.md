# Contributing to SendKit

Thank you for your interest in contributing to SendKit! This document provides guidelines and information about contributing to this project.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Requesting Features](#requesting-features)

---

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/sendkit.git
   cd sendkit
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Create a branch** for your work:
   ```bash
   git checkout -b feat/your-feature-name
   ```

---

## Development Workflow

```bash
# Run the CLI in development mode
bun run dev:cli telegram <chatId> "<message>"

# Type check
bun run tsc --noEmit
```

---

## Branch Naming Convention

We follow a structured branch naming convention:

| Prefix      | Purpose                   | Example                  |
| ----------- | ------------------------- | ------------------------ |
| `feat/`     | New features              | `feat/slack-provider`    |
| `fix/`      | Bug fixes                 | `fix/telegram-timeout`   |
| `docs/`     | Documentation changes     | `docs/update-readme`     |
| `refactor/` | Code refactoring          | `refactor/cli-structure` |
| `chore/`    | Maintenance tasks         | `chore/update-deps`      |
| `test/`     | Adding or updating tests  | `test/telegram-unit`     |
| `ci/`       | CI/CD pipeline changes    | `ci/github-actions`      |
| `release/`  | Release preparation       | `release/v0.1.0`         |
| `hotfix/`   | Critical production fixes | `hotfix/auth-crash`      |

---

## Commit Message Format

We use **[Conventional Commits](https://www.conventionalcommits.org/)** for clear, machine-readable commit history.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature                                           |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only changes                              |
| `style`    | Formatting, missing semicolons, etc. (no logic change)  |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`     | Performance improvements                                |
| `test`     | Adding or correcting tests                              |
| `build`    | Changes to the build system or dependencies             |
| `ci`       | CI/CD configuration changes                             |
| `chore`    | Other changes that don't modify source or test files    |
| `revert`   | Reverts a previous commit                               |

### Scopes

| Scope     | Description             |
| --------- | ----------------------- |
| `cli`     | CLI package changes     |
| `core`    | Core SDK changes        |
| `deps`    | Dependency updates      |
| `config`  | Configuration changes   |
| `release` | Release-related changes |

### Examples

```
feat(cli): add Telegram message sending support

Implement the `telegram` subcommand using the Telegram Bot API.
Supports sending text messages to a given chat ID.

Closes #1
```

```
docs: add comprehensive README with architecture overview
```

```
chore(deps): install Commander.js for CLI argument parsing
```

---

## Pull Request Process

1. **Ensure** your code follows the coding standards below.
2. **Update** the README.md and CHANGELOG.md if applicable.
3. **Write** a clear PR description explaining _what_ and _why_.
4. **Reference** related issues using `Closes #<issue-number>`.
5. **Request** a review from a maintainer.
6. **Squash-merge** is preferred for clean commit history.

### PR Title Format

Follow the same Conventional Commits format:

```
feat(cli): add Slack provider support
fix(cli): handle network timeout gracefully
```

---

## Coding Standards

- **Language**: TypeScript with `strict: true`
- **Module System**: ESM (`"type": "module"`)
- **Target**: ES2022
- **Formatting**: Consistent indentation (2 spaces), trailing commas
- **Naming**:
  - `camelCase` for variables and functions
  - `PascalCase` for types and interfaces
  - `UPPER_SNAKE_CASE` for constants
- **Error Handling**: Always provide user-friendly error messages and exit with appropriate codes

---

## Reporting Bugs

Open a [GitHub Issue](https://github.com/RISHII7/sendkit/issues) with:

1. **Description** — A clear, concise description of the bug.
2. **Steps to Reproduce** — Detailed steps to reproduce the behavior.
3. **Expected Behavior** — What you expected to happen.
4. **Actual Behavior** — What actually happened.
5. **Environment** — OS, Bun version, Node version.
6. **Logs** — Relevant terminal output or error messages.

---

## Requesting Features

Open a [GitHub Issue](https://github.com/RISHII7/sendkit/issues) with:

1. **Problem Statement** — What problem does this feature solve?
2. **Proposed Solution** — How would you like it to work?
3. **Alternatives Considered** — Any other approaches you thought of.
4. **Additional Context** — Mockups, references, or examples.

---

Thank you for contributing to SendKit! 🎉
