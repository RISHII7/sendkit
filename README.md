<p align="center">
  <br />
  <img width="120" src="https://raw.githubusercontent.com/RISHII7/sendkit/main/assets/logo.png" alt="SendKit" />
  <br />
</p>

<h1 align="center">SendKit</h1>

<p align="center">
  <strong>Universal Messaging Toolkit</strong>
  <br />
  One SDK. One CLI. One MCP server. Every provider.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit"><img src="https://img.shields.io/npm/v/@rishi1006/sendkit?style=flat-square&color=000&label=CLI" alt="CLI version" /></a>
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit-core"><img src="https://img.shields.io/npm/v/@rishi1006/sendkit-core?style=flat-square&color=000&label=Core" alt="Core version" /></a>
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit-mcp"><img src="https://img.shields.io/npm/v/@rishi1006/sendkit-mcp?style=flat-square&color=000&label=MCP" alt="MCP version" /></a>
  <a href="https://github.com/RISHII7/sendkit/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="license" /></a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> ·
  <a href="#packages">Packages</a> ·
  <a href="#mcp-server">MCP Server</a> ·
  <a href="#architecture">Architecture</a> ·
  <a href="#development">Development</a>
</p>

---

## Quick Start

### 30-second setup

```bash
# 1. Configure your Telegram bot token
npx -y @rishi1006/sendkit init

# 2. Send a message
npx -y @rishi1006/sendkit telegram 971579068 "Hello from SendKit! 🚀"
```

### What you'll see

```
  ███████╗███████╗███╗   ██╗██████╗ ██╗  ██╗██╗████████╗
  ██╔════╝██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██║╚══██╔══╝
  ███████╗█████╗  ██╔██╗ ██║██║  ██║█████╔╝ ██║   ██║
  ╚════██║██╔══╝  ██║╚██╗██║██║  ██║██╔═██╗ ██║   ██║
  ███████║███████╗██║ ╚████║██████╔╝██║  ██╗██║   ██║
  ╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝
  v1.0.3  ·  Universal Messaging Toolkit

◇  ✈  Telegram
│
◇  Sending to 971579068...
│
◆  ✔ Delivered! Message ID: 42
│
└  Message sent successfully. 🚀
```

---

## Packages

SendKit is a monorepo with three publishable packages. Use whichever layer fits your use case:

| Package                                                                            | What                                                          | Install                         |
| :--------------------------------------------------------------------------------- | :------------------------------------------------------------ | :------------------------------ |
| [`@rishi1006/sendkit-core`](https://www.npmjs.com/package/@rishi1006/sendkit-core) | **SDK** — one function, one `await`, typed result             | `npm i @rishi1006/sendkit-core` |
| [`@rishi1006/sendkit`](https://www.npmjs.com/package/@rishi1006/sendkit)           | **CLI** — beautiful terminal UI with spinners & health checks | `npm i -g @rishi1006/sendkit`   |
| [`@rishi1006/sendkit-mcp`](https://www.npmjs.com/package/@rishi1006/sendkit-mcp)   | **MCP Server** — give your AI IDE native messaging            | Add to `.mcp.json`              |

### Supported Providers

| Provider     | Status       | Transport                                     |
| :----------- | :----------- | :-------------------------------------------- |
| Telegram     | ✅ Available | [Bot API](https://core.telegram.org/bots/api) |
| Discord      | 🔜 Planned   | Webhook                                       |
| Slack        | 🔜 Planned   | Web API                                       |
| Email (SMTP) | 🔜 Planned   | SMTP                                          |

---

## SDK Usage

```typescript
import { sendTelegramMessage } from "@rishi1006/sendkit-core";

const result = await sendTelegramMessage({
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  chatId: "971579068",
  message: "Deploy complete ✅",
});

console.log(result.messageId); // 42
```

Zero config. Edge-ready. Works on Vercel Edge, Cloudflare Workers, Deno, Bun, and Node.

---

## CLI Usage

### Interactive setup

```bash
sendkit init          # Guided wizard with secure token input
sendkit status        # Health check — validates config & API connectivity
```

### Send messages

```bash
sendkit telegram <chatId> "Your message"       # Beautiful UI with spinner
sendkit telegram <chatId> "Msg" --json         # Raw JSON for scripts/CI
```

---

## MCP Server

Give your AI IDE (Cursor, Windsurf, Claude Desktop, Antigravity) the native ability to send messages.

### Local MCP (stdio)

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "sendkit": {
      "command": "npx",
      "args": ["-y", "@rishi1006/sendkit-mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "<your-token>"
      }
    }
  }
}
```

### Remote MCP (Cloud)

Host SendKit over the network with OAuth 2.0 authentication via [Clerk](https://clerk.com). Deployed on [Vercel Edge](https://vercel.com).

1. Create a [Clerk](https://clerk.com) application.
2. Set environment variables:
   ```env
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
3. Deploy to Vercel (or run locally with `bun run dev:remote-mcp`).
4. Connect your IDE to: `https://<your-domain>/<TELEGRAM_BOT_TOKEN>/mcp`

> **Note**: For Claude Desktop, manually enter the `CLERK_PUBLISHABLE_KEY` as the OAuth Client ID when prompted.

### AI Agent Skill

Teach your AI IDE to use SendKit automatically:

```bash
npx skills add https://github.com/RISHII7/sendkit/tree/main/skills/sendkit
```

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    SendKit Monorepo                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐   ┌─────────────┐   ┌──────────────────┐   │
│  │  sendkit     │   │ sendkit-mcp │   │ remote-mcp       │   │
│  │  (CLI)       │   │ (MCP stdio) │   │ (Hono + Vercel)  │   │
│  └──────┬───────┘   └──────┬──────┘   └────────┬─────────┘   │
│         │                  │                    │            │
│         └──────────┬───────┘────────────────────┘            │
│                    │                                         │
│           ┌────────▼────────┐                                │
│           │  sendkit-core   │                                │
│           │  (SDK engine)   │                                │
│           └────────┬────────┘                                │
│                    │                                         │
│              Zod + fetch()                                   │
│                    │                                         │
└────────────────────┼─────────────────────────────────────────┘
                     │
              ┌──────▼──────┐
              │ Telegram API │
              └─────────────┘
```

### Tech Stack

| Layer         | Technology                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime       | [Bun](https://bun.sh/)                                                                                                                                         |
| Language      | [TypeScript](https://www.typescriptlang.org/) (strict)                                                                                                         |
| Validation    | [Zod](https://zod.dev/) v4                                                                                                                                     |
| CLI Framework | [Commander](https://github.com/tj/commander.js) + [Clack](https://github.com/bombshell-dev/clack) + [picocolors](https://github.com/alexeyraspopov/picocolors) |
| Build         | [tsdown](https://github.com/nicolo-ribaudo/tsdown) (Rolldown)                                                                                                  |
| Linting       | [oxlint](https://oxc.rs/)                                                                                                                                      |
| Formatting    | [oxfmt](https://oxc.rs/)                                                                                                                                       |
| MCP           | [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)                                                                            |
| Remote Server | [Hono](https://hono.dev/) on [Vercel Edge](https://vercel.com)                                                                                                 |
| Auth          | [Clerk](https://clerk.com/) OAuth 2.0                                                                                                                          |

---

## Project Structure

```
sendkit/
├── apps/
│   └── remote-mcp/              # Remote MCP Server (Hono + Vercel Edge)
│       └── api/index.ts
├── packages/
│   ├── core/                    # @rishi1006/sendkit-core
│   │   └── src/
│   │       ├── schemas/         # Zod validation schemas
│   │       └── operations/      # Provider operations (Telegram)
│   ├── cli/                     # @rishi1006/sendkit
│   │   └── src/index.ts         # CLI entry (Clack + Commander)
│   └── local-mcp/               # @rishi1006/sendkit-mcp
│       └── src/index.ts         # MCP stdio server
├── skills/
│   └── sendkit/SKILL.md         # AI Agent skill definition
├── assets/
│   └── logo.png                 # Project logo
├── CHANGELOG.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE
```

---

## Development

```bash
# Install dependencies
bun install

# Run CLI in dev mode
bun run dev:cli -- telegram <chatId> "test"

# Run local MCP server
bun run dev:local-mcp

# Run remote MCP server
bun run dev:remote-mcp

# Build all packages
bun run build

# Lint, format, typecheck
bun run lint
bun run format
bun run typecheck
```

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for:

- Pull request guidelines
- Coding standards
- Commit message format ([Conventional Commits](https://www.conventionalcommits.org/))
- Branch naming conventions

---

## Security

For security vulnerabilities, see [SECURITY.md](SECURITY.md). Do **not** open public issues for security concerns.

---

## License

MIT © [Rishi](https://github.com/RISHII7)

---

<p align="center">
  <sub>Built with ❤️ by <a href="https://github.com/RISHII7">RISHII7</a></sub>
</p>
