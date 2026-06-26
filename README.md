# SendKit

> **Universal Messaging Toolkit** — A blazing-fast CLI and SDK for sending messages across multiple providers.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0+-f9f1e1?logo=bun&logoColor=000)](https://bun.sh/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Overview

SendKit is a monorepo-based messaging toolkit that provides a unified interface for sending messages across multiple communication platforms. Start with the CLI, scale with the SDK.

### Supported Providers

| Provider | Status       | Description                            |
| -------- | ------------ | -------------------------------------- |
| Telegram | ✅ Available | Send messages via the Telegram Bot API |

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or later
- A Telegram Bot Token ([create one here](https://t.me/BotFather))
- (Optional for Remote MCP) A [Clerk](https://clerk.com/) account for OAuth 2.0 authentication

### Installation

```bash
# Clone the repository
git clone https://github.com/RISHII7/sendkit.git
cd sendkit

# Install dependencies
bun install

# Configure environment variables
cp .env.example .env
# Edit .env and add your TELEGRAM_BOT_TOKEN
# For Remote MCP, also add CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
```

### Usage

Before sending messages from the CLI, you must initialize your local configuration:

```bash
# Configure your local CLI settings
bun run dev:cli init --telegram-bot-token "<your-bot-token>"
```

Once configured, you can send messages. The CLI outputs structured JSON for easy integration into scripts:

```bash
# Send a Telegram message
bun run dev:cli telegram <chatId> "<message>"

# Example
bun run dev:cli telegram "971579068" "Hello from SendKit!"
# Output: {"ok":true,"chatId":"971579068","messageId":12}

# View help
bun run dev:cli --help
bun run dev:cli telegram --help
```

### MCP Server Usage

SendKit comes with an officially supported Model Context Protocol (MCP) server. This allows AI IDEs (like Cursor, Windsurf, or Antigravity) to send messages natively.

To connect the local MCP server, add the following boilerplate to your MCP configuration file (e.g. `.mcp.json` in the root of your workspace, or your global MCP config):

```json
{
  "mcpServers": {
    "sendkit": {
      "command": "bun",
      "args": [
        "run",
        "/absolute/path/to/sendkit/packages/local-mcp/src/index.ts"
      ],
      "env": {
        "TELEGRAM_BOT_TOKEN": "<your-telegram-bot-token>"
      }
    }
  }
}
```

> **Note:** We recommend using the absolute path to the script to ensure the server starts correctly regardless of the IDE's launch context.

### Remote MCP Server (Cloud / API)

If you want to host SendKit remotely (e.g. on Railway, Render, or a VPS) and connect your IDE over the network, you can use the **Remote MCP Server**. This server uses **Clerk** to enforce OAuth 2.0 authentication natively with AI IDEs.

1. Create a [Clerk](https://clerk.com) application and copy your API Keys.
2. Add your keys to `.env`:
   ```env
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
3. Start the remote server (uses [Hono](https://hono.dev)):
   ```bash
   bun run dev:remote-mcp
   ```
4. Expose your server to the internet (e.g. via `ngrok`).
5. Configure your AI IDE (like Claude Desktop) to connect to a **Custom MCP Server**:
   - URL: `http://<your-server-url>/<TELEGRAM_BOT_TOKEN>/mcp`
   - **OAuth Client ID**: Paste your `CLERK_PUBLISHABLE_KEY` here.

> **Note**: Claude does not support Dynamic Client Registration. When it prompts you that "Automatic client registration isn't supported", you must manually supply the `CLERK_PUBLISHABLE_KEY` in the OAuth Client ID field within the connector's settings.

---

## Project Structure

```
sendkit/
├── apps/
│   └── remote-mcp/           # Remote MCP Server (HTTP/SSE)
│       ├── src/
│       │   └── index.ts      # Server implementation
│       └── package.json      # Remote package config
├── packages/
│   ├── cli/                  # CLI package (thin layer over core)
│   │   ├── src/
│   │   │   └── index.ts      # CLI entry point
│   │   └── package.json      # CLI package config
│   ├── core/                 # Core SDK package (sendkit-core)
│   │   ├── src/
│   │   │   ├── index.ts      # Barrel exports
│   │   │   ├── schemas/      # Zod validation schemas
│   │   │   └── operations/   # Provider operations
│   │   └── package.json      # Core package config
│   └── local-mcp/            # MCP Server package (sendkit-mcp)
│       ├── src/
│       │   └── index.ts      # MCP Server implementation
│       └── package.json      # MCP package config
├── .env.example              # Environment variable template
├── .gitignore                # Enterprise-level gitignore
├── package.json              # Workspace root config
├── tsconfig.json             # TypeScript configuration
├── bun.lock                  # Dependency lockfile
├── LICENSE                   # MIT License
├── CONTRIBUTING.md           # Contribution guidelines
├── CODE_OF_CONDUCT.md        # Code of Conduct
├── SECURITY.md               # Security policy
└── CHANGELOG.md              # Version changelog
```

---

## Architecture

SendKit uses a **monorepo architecture** powered by Bun workspaces:

```
┌──────────────────────────────────────────────┐
│             sendkit (workspace)              │
├──────────────────────────────────────────────┤
│  packages/core    →  Core SDK (Zod schemas,  │
│                      operations, types)      │
│  packages/cli     →  CLI interface (consumes │
│                      core as workspace dep)  │
│  packages/local-mcp → Local MCP Server (stdio)│
│  apps/remote-mcp  →  Remote MCP Server (HTTP)│
└──────────────────────────────────────────────┘
```

### Tech Stack

- **Runtime**: [Bun](https://bun.sh/) — fast all-in-one JavaScript runtime
- **Language**: [TypeScript](https://www.typescriptlang.org/) — strict mode enabled
- **Validation**: [Zod](https://zod.dev/) v4 — runtime type validation for all I/O
- **CLI Framework**: [Commander.js](https://github.com/tj/commander.js/) — complete CLI solution
- **Module System**: ESM (ES2022 target)

---

## Development

```bash
# Install all workspace dependencies
bun install

# Run the CLI in development mode
bun run dev:cli telegram <chatId> "<message>"

# Type check
bun run tsc --noEmit
```

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- How to submit pull requests
- Coding standards and conventions
- Commit message format (Conventional Commits)
- Branch naming conventions

---

## Security

For security vulnerabilities, please see our [Security Policy](SECURITY.md). Do **not** open public issues for security concerns.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Commander.js](https://github.com/tj/commander.js/) for the CLI framework
- [Telegram Bot API](https://core.telegram.org/bots/api) for messaging infrastructure

---

<p align="center">
  <sub>Built by <a href="https://github.com/RISHII7">RISHII7</a></sub>
</p>
