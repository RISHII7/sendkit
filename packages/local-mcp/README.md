<p align="center">
  <br />
  <img width="100" src="https://raw.githubusercontent.com/RISHII7/sendkit/main/assets/logo.png" alt="SendKit MCP" />
  <br />
</p>

<h3 align="center">@rishi1006/sendkit-mcp</h3>

<p align="center">
  Give your AI IDE the native ability to send messages.
  <br />
  A <a href="https://modelcontextprotocol.io">Model Context Protocol</a> server for SendKit.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit-mcp"><img src="https://img.shields.io/npm/v/@rishi1006/sendkit-mcp?style=flat-square&color=000&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit-mcp"><img src="https://img.shields.io/npm/dm/@rishi1006/sendkit-mcp?style=flat-square&color=000&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/RISHII7/sendkit/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="license" /></a>
</p>

---

## What is this?

This package is an [MCP server](https://modelcontextprotocol.io) that exposes SendKit's messaging capabilities as **native tools** to AI agents.

Once connected, your AI IDE can send Telegram messages without any CLI, without any `curl`, and without any code — just by calling a tool.

```
You: "Send a message to chat 971579068 saying hello"
AI:  ✔ Sent Telegram message 42 to chat 971579068
```

**Works with:** Cursor · Windsurf · Claude Desktop · Antigravity · Any MCP-compatible client

---

## Quick Start

Add this to your MCP configuration file (`.mcp.json` in your project root, or your IDE's global MCP config):

```json
{
  "mcpServers": {
    "sendkit": {
      "command": "npx",
      "args": ["-y", "@rishi1006/sendkit-mcp"],
      "env": {
        "TELEGRAM_BOT_TOKEN": "your-token-here"
      }
    }
  }
}
```

That's it. Restart your IDE. Your agent can now send messages.

---

## Environment Variables

| Variable | Required | Description |
|:---|:---:|:---|
| `TELEGRAM_BOT_TOKEN` | ✅ | Your Telegram Bot token from [@BotFather](https://t.me/BotFather) |

---

## Available Tools

### `telegram`

Sends a plain-text message to a Telegram chat.

**Input:**

| Parameter | Type | Required | Description |
|:---|:---|:---:|:---|
| `chatId` | `string` | ✅ | Target chat ID or `@channel` username |
| `message` | `string` | ✅ | Message text to send |

**Output:**

```
Sent Telegram message 42 to chat 971579068
```

Structured content is also returned for programmatic consumption:

```json
{ "ok": true, "chatId": "971579068", "messageId": 42 }
```

---

## How it works

```
┌────────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    AI Agent     │────▶│  sendkit-mcp │────▶│ sendkit-core │────▶│ Telegram API │
│  (your IDE)    │ MCP │ (this pkg)   │     │  (SDK layer) │     │              │
└────────────────┘stdio└──────────────┘     └──────────────┘     └──────────────┘
```

1. Your IDE starts this server as a child process via `npx`.
2. They communicate over **stdio** using the MCP protocol.
3. When the agent calls the `telegram` tool, this server delegates to `@rishi1006/sendkit-core`.
4. Core validates input with Zod, calls the Telegram Bot API, and returns a typed result.

---

## Remote MCP

Need to host this over the network instead of locally? The SendKit monorepo includes a **Remote MCP Server** with OAuth 2.0 authentication via [Clerk](https://clerk.com), deployed on Vercel Edge.

👉 See the [main repository](https://github.com/RISHII7/sendkit#remote-mcp-server-cloud--api) for setup instructions.

---

## AI Agent Skill

Teach your AI IDE *how* to use SendKit without any manual prompting:

```bash
npx skills add https://github.com/RISHII7/sendkit/tree/main/skills/sendkit
```

This installs a skill definition that tells the agent when and how to invoke the `telegram` tool.

---

## Ecosystem

| Package | What it does |
|:---|:---|
| [`@rishi1006/sendkit-core`](https://www.npmjs.com/package/@rishi1006/sendkit-core) | Core SDK — one function, one `await`, typed result |
| [`@rishi1006/sendkit`](https://www.npmjs.com/package/@rishi1006/sendkit) | Beautiful CLI with ASCII art, spinners & health checks |
| **`@rishi1006/sendkit-mcp`** | **← You are here.** The MCP server. |

---

## License

MIT © [Rishi](https://github.com/RISHII7)
