<p align="center">
  <br />
  <img width="100" src="https://raw.githubusercontent.com/RISHII7/sendkit/main/assets/logo.png" alt="SendKit Core" />
  <br />
</p>

<h3 align="center">@rishi1006/sendkit-core</h3>

<p align="center">
  The engine behind SendKit. A tiny, type-safe SDK for sending messages across providers.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit-core"><img src="https://img.shields.io/npm/v/@rishi1006/sendkit-core?style=flat-square&color=000&label=npm" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@rishi1006/sendkit-core"><img src="https://img.shields.io/npm/dm/@rishi1006/sendkit-core?style=flat-square&color=000&label=downloads" alt="npm downloads" /></a>
  <a href="https://github.com/RISHII7/sendkit/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-000?style=flat-square" alt="license" /></a>
  <a href="https://img.shields.io/bundlephobia/minzip/@rishi1006/sendkit-core"><img src="https://img.shields.io/bundlephobia/minzip/@rishi1006/sendkit-core?style=flat-square&color=000&label=size" alt="bundle size" /></a>
</p>

---

## Why

You need to send a Telegram message from your server. You don't need a framework, a CLI, or an MCP server. You need **one function** that validates input, calls the API, and returns a typed result. That's `sendkit-core`.

```typescript
import { sendTelegramMessage } from "@rishi1006/sendkit-core";

const result = await sendTelegramMessage({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  chatId: "971579068",
  message: "Deploy complete ✅",
});

console.log(result.messageId); // 42
```

No config files. No global state. One `await`, one result.

---

## Install

```bash
npm install @rishi1006/sendkit-core
```

```bash
pnpm add @rishi1006/sendkit-core
```

```bash
bun add @rishi1006/sendkit-core
```

---

## API

### `sendTelegramMessage(options)`

Sends a plain-text message to a Telegram chat via the [Bot API](https://core.telegram.org/bots/api#sendmessage).

#### Options

| Param | Type | Description |
|:---|:---|:---|
| `botToken` | `string` | Token from [@BotFather](https://t.me/BotFather) |
| `chatId` | `string` | Chat ID or `@channel` username |
| `message` | `string` | Message text |

All fields are validated at runtime with [Zod](https://zod.dev/). If anything is empty or missing, the call throws immediately — **before** hitting the network.

#### Returns

```typescript
{ ok: true, chatId: string, messageId: number }
```

#### Throws

If the Telegram API returns `ok: false`, the function throws an `Error` whose message is the API's own `description` field (e.g. `"Bad Request: chat not found"`).

---

## Schemas

Every type is exported for reuse in your own validation layers:

```typescript
import {
  telegramMessageInputSchema,     // { chatId, message }
  telegramMessageOptionsSchema,   // { botToken, chatId, message }
  telegramMessageOutputSchema,    // { ok, chatId, messageId }
  type TelegramMessageInput,
  type TelegramMessageOptions,
  type TelegramMessageOutput,
} from "@rishi1006/sendkit-core";
```

---

## Design Principles

| Principle | How |
|:---|:---|
| **Zero config** | No config files, no singletons, no setup. Pass everything as arguments. |
| **Edge-first** | Uses only `fetch`. Works on Vercel Edge, Cloudflare Workers, Deno, Bun, Node. |
| **Fail fast** | Zod validates every input and every API response. Bad data never silently passes. |
| **Tiny** | One function, one file, zero non-essential dependencies. |

---

## Ecosystem

`sendkit-core` is the foundation. Everything else is a thin layer on top.

| Package | Description |
|:---|:---|
| [`@rishi1006/sendkit`](https://www.npmjs.com/package/@rishi1006/sendkit) | Beautiful CLI with interactive prompts & spinners |
| [`@rishi1006/sendkit-mcp`](https://www.npmjs.com/package/@rishi1006/sendkit-mcp) | MCP server — give your AI IDE native messaging |

---

## License

MIT © [Rishi](https://github.com/RISHII7)
