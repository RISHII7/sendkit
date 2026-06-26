<p align="center">
  <br />
  <img width="100" src="https://raw.githubusercontent.com/RISHII7/sendkit/main/assets/logo.png" alt="SendKit" />
  <br />
</p>

<h3 align="center">@rishi1006/sendkit</h3>

<p align="center">
  The most beautiful CLI for sending messages from your terminal.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit"><img src="https://img.shields.io/npm/v/@rishi1006/sendkit?style=flat-square&color=000&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit"><img src="https://img.shields.io/npm/dm/@rishi1006/sendkit?style=flat-square&color=000&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/RISHII7/sendkit/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="license" /></a>
</p>

---

## Demo

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
│  Chat: 971579068  ·  Length: 26 chars
│
└  Message sent successfully. 🚀
```

---

## Install

Run instantly — no install required:

```bash
npx -y @rishi1006/sendkit --help
```

Or install globally:

```bash
npm install -g @rishi1006/sendkit
```

```bash
bun add -g @rishi1006/sendkit
```

---

## Setup

### Interactive (recommended)

Just run `init`. You'll be guided through a beautiful, secure setup wizard:

```bash
sendkit init
```

```
◇  🔧  Setup Wizard
│
│  Your token will be securely saved to:
│  ~/.config/sendkit/config.json
│
◆  Enter your Telegram Bot Token:
│  ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
│
◇  Configuration saved successfully.
│
│  ╭──────────────────────────────────────────╮
│  │  Try sending a test message:             │
│  │  sendkit telegram <chatId> "Hello!"      │
│  ╰──────────────────────────────────────────╯
│
└  Happy messaging! 🚀
```

### Non-interactive

Pass the token directly — ideal for CI/CD or Docker:

```bash
sendkit init --telegram-bot-token "123456:ABC-DEF..."
```

Your token is saved to `~/.config/sendkit/config.json` with `0600` permissions (owner-only read/write).

---

## Usage

### Send a message

```bash
sendkit telegram <chatId> "Your message here"
```

You'll see a spinner, delivery confirmation, and message metadata — all beautifully formatted in your terminal.

### Scripting mode

Pass `--json` to strip all UI and emit pure JSON to stdout — perfect for piping into `jq`, logging, or CI:

```bash
sendkit telegram 971579068 "Deploy finished" --json
# {"ok":true,"chatId":"971579068","messageId":42}
```

### Health check

Validate your configuration **and** test connectivity to the Telegram API in one command:

```bash
sendkit status
```

```
◇  🩺  Health Check
│
◆  ✔ Config file found
◆  ✔ Telegram bot token configured
◆  ✔ Connected as @your_bot_name
│
└  All checks complete.
```

---

## Commands

| Command | Description |
|:---|:---|
| `sendkit init` | Interactive setup wizard for provider credentials |
| `sendkit status` | Validate config & test API connectivity |
| `sendkit telegram <chatId> <message>` | Send a Telegram message with live UI |
| `sendkit telegram <chatId> <message> --json` | Send with raw JSON output (scripting) |
| `sendkit --version` | Show version |
| `sendkit --help` | Show help with ASCII banner |

---

## How it works

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   sendkit CLI   │────▶│ sendkit-core │────▶│  Telegram API   │
│  (this package) │     │  (SDK layer) │     │  api.telegram.org│
└─────────────────┘     └──────────────┘     └─────────────────┘
     Clack UI              Zod validation          Bot API
     Commander             fetch()
     Picocolors
```

The CLI is a **thin, beautiful shell** around [`@rishi1006/sendkit-core`](https://www.npmjs.com/package/@rishi1006/sendkit-core). All business logic, validation, and API calls live in core. The CLI adds interactive prompts ([Clack](https://github.com/bombshell-dev/clack)), colors ([picocolors](https://github.com/alexeyraspopov/picocolors)), and argument parsing ([Commander](https://github.com/tj/commander.js)).

---

## Ecosystem

| Package | What it does |
|:---|:---|
| [`@rishi1006/sendkit-core`](https://www.npmjs.com/package/@rishi1006/sendkit-core) | Core SDK — one function, one `await`, typed result |
| **`@rishi1006/sendkit`** | **← You are here.** The CLI. |
| [`@rishi1006/sendkit-mcp`](https://www.npmjs.com/package/@rishi1006/sendkit-mcp) | MCP server for AI IDEs (Cursor, Windsurf, Antigravity) |

### AI Agent Skill

Teach your AI IDE to use SendKit natively:

```bash
npx skills add https://github.com/RISHII7/sendkit/tree/main/skills/sendkit
```

---

## License

MIT © [Rishi](https://github.com/RISHII7)
