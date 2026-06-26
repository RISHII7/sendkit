#!/usr/bin/env node
import { Command } from "commander";
import { z } from "zod";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { sendTelegramMessage } from "@rishi1006/sendkit-core";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import * as p from "@clack/prompts";
import pc from "picocolors";

// ─── Constants ───────────────────────────────────────────────────────────────
const VERSION = "1.0.3";
const configPath = join(homedir(), ".config", "sendkit", "config.json");
const cliConfigSchema = z.object({
  telegramBotToken: z.string().min(1).optional(),
});

// ─── ASCII Banner ────────────────────────────────────────────────────────────
function printBanner() {
  const banner = `
${pc.cyan("  ███████╗███████╗███╗   ██╗██████╗ ██╗  ██╗██╗████████╗")}
${pc.cyan("  ██╔════╝██╔════╝████╗  ██║██╔══██╗██║ ██╔╝██║╚══██╔══╝")}
${pc.cyan("  ███████╗█████╗  ██╔██╗ ██║██║  ██║█████╔╝ ██║   ██║   ")}
${pc.cyan("  ╚════██║██╔══╝  ██║╚██╗██║██║  ██║██╔═██╗ ██║   ██║   ")}
${pc.cyan("  ███████║███████╗██║ ╚████║██████╔╝██║  ██╗██║   ██║   ")}
${pc.cyan("  ╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ")}
${pc.dim(`  v${VERSION}  ·  Universal Messaging Toolkit`)}
`;
  console.log(banner);
}

// ─── Config Helpers ──────────────────────────────────────────────────────────
function writeTelegramBotToken(token: string) {
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, `${JSON.stringify({ telegramBotToken: token }, null, 2)}\n`, {
    mode: 0o600,
  });
}

function getTelegramBotToken(): string {
  if (!existsSync(configPath)) {
    console.log();
    p.log.error(
      pc.red("No configuration found. Run ") +
      pc.bold(pc.cyan("sendkit init")) +
      pc.red(" to set up your bot token.")
    );
    console.log();
    process.exit(1);
  }

  const config = cliConfigSchema.parse(JSON.parse(readFileSync(configPath, "utf8")));
  const token = config.telegramBotToken;

  if (!token) {
    console.log();
    p.log.error(
      pc.red("Telegram bot token is missing. Run ") +
      pc.bold(pc.cyan("sendkit init")) +
      pc.red(" to configure it.")
    );
    console.log();
    process.exit(1);
  }

  return token;
}

function getConfigStatus(): { exists: boolean; hasToken: boolean; path: string } {
  if (!existsSync(configPath)) {
    return { exists: false, hasToken: false, path: configPath };
  }
  try {
    const config = cliConfigSchema.parse(JSON.parse(readFileSync(configPath, "utf8")));
    return { exists: true, hasToken: !!config.telegramBotToken, path: configPath };
  } catch {
    return { exists: true, hasToken: false, path: configPath };
  }
}

// ─── Program ─────────────────────────────────────────────────────────────────
const program = new Command();

program
  .name("sendkit")
  .description("Universal Messaging Toolkit — Send messages across providers from the terminal.")
  .version(VERSION, "-v, --version", "Display the current version")
  .hook("preAction", (thisCommand) => {
    const name = thisCommand.args?.[0];
    if (name !== "init" && name !== "status" && name !== "telegram") {
      printBanner();
    }
  });

// ─── Init Command ────────────────────────────────────────────────────────────
program
  .command("init")
  .description("Set up SendKit with your messaging provider credentials")
  .option("--telegram-bot-token <botToken>", "Telegram bot token (skips interactive prompt)")
  .action(async (options: { telegramBotToken?: string }) => {
    let token = options.telegramBotToken;

    if (!token) {
      printBanner();
      p.intro(pc.bgCyan(pc.black(" 🔧  Setup Wizard ")));

      p.log.info(
        `${pc.dim("Your token will be securely saved to:")}\n  ${pc.dim(pc.underline(configPath))}`
      );

      const result = await p.password({
        message: "Enter your Telegram Bot Token:",
        validate: (value) => {
          if (!value || value.trim().length === 0) return "Token cannot be empty.";
          if (!value.includes(":")) return "This doesn't look like a valid bot token (expected format: 123456:ABC-DEF).";
        },
      });

      if (p.isCancel(result)) {
        p.cancel("Setup cancelled.");
        process.exit(0);
      }

      token = result;
    }

    writeTelegramBotToken(token);

    if (!options.telegramBotToken) {
      p.log.success(pc.green("Configuration saved successfully."));
      p.note(
        `${pc.dim("Try sending a test message:")}\n  ${pc.cyan("sendkit telegram <chatId> \"Hello!\"")}`,
        "Next Steps"
      );
      p.outro(pc.dim("Happy messaging! 🚀"));
    } else {
      console.log();
      console.log(`  ${pc.green("✔")} Configuration saved to ${pc.dim(configPath)}`);
      console.log();
    }
  });

// ─── Status Command ──────────────────────────────────────────────────────────
program
  .command("status")
  .description("Check your SendKit configuration and connectivity")
  .action(async () => {
    printBanner();
    p.intro(pc.bgCyan(pc.black(" 🩺  Health Check ")));

    const status = getConfigStatus();
    const s = p.spinner();

    // Config check
    if (!status.exists) {
      p.log.error(`${pc.red("✖")} Config file ${pc.dim("not found")}`);
      p.log.info(`  Run ${pc.bold(pc.cyan("sendkit init"))} to create one.`);
      p.outro(pc.red("Health check failed."));
      return;
    }

    p.log.success(`${pc.green("✔")} Config file found at ${pc.dim(status.path)}`);

    if (!status.hasToken) {
      p.log.error(`${pc.red("✖")} Telegram bot token ${pc.dim("not configured")}`);
      p.outro(pc.red("Health check failed."));
      return;
    }

    p.log.success(`${pc.green("✔")} Telegram bot token ${pc.dim("configured")}`);

    // Connectivity check
    s.start("Testing Telegram API connectivity...");
    try {
      const token = getTelegramBotToken();
      const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      const data = await res.json() as { ok: boolean; result?: { first_name?: string; username?: string } };

      if (data.ok && data.result) {
        s.stop(pc.green(`✔ Connected as @${data.result.username ?? data.result.first_name}`));
      } else {
        s.stop(pc.red("✖ Token is invalid or revoked."));
      }
    } catch {
      s.stop(pc.red("✖ Could not reach Telegram API. Check your network."));
    }

    p.outro(pc.dim("All checks complete."));
  });

// ─── Telegram Command ────────────────────────────────────────────────────────
program
  .command("telegram")
  .description("Send a message via the Telegram Bot API")
  .argument("<chatId>", "Telegram chat ID or @username")
  .argument("<message>", "Message text to send")
  .option("--json", "Output raw JSON (for scripting / CI pipelines)")
  .action(async (chatId: string, message: string, options: { json?: boolean }) => {
    const s = p.spinner();

    if (!options.json) {
      console.log();
      p.intro(pc.bgCyan(pc.black(" ✈  Telegram ")));
      s.start(`Sending to ${pc.bold(chatId)}...`);
    }

    try {
      const result = await sendTelegramMessage({
        botToken: getTelegramBotToken(),
        chatId,
        message,
      });

      if (options.json) {
        console.log(JSON.stringify(result));
      } else {
        s.stop(pc.green(`✔ Delivered! Message ID: ${pc.bold(String(result.messageId))}`));
        p.log.info(pc.dim(`Chat: ${chatId}  ·  Length: ${message.length} chars`));
        p.outro(pc.dim("Message sent successfully. 🚀"));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      if (options.json) {
        console.error(JSON.stringify({ ok: false, error: errorMessage }));
        process.exitCode = 1;
      } else {
        s.stop(pc.red("✖ Failed to deliver."));
        p.log.error(pc.red(errorMessage));
        p.outro(pc.red("Message delivery failed."));
        process.exitCode = 1;
      }
    }
  });

// ─── Parse ───────────────────────────────────────────────────────────────────
program.addHelpText("beforeAll", () => {
  printBanner();
  return "";
});

await program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(pc.red(error instanceof Error ? error.message : String(error)));
  process.exitCode = 1;
});
