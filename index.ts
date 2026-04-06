/**
 * Solobank Price Monitor
 *
 * Checks upstream API costs against gateway prices.
 * Alerts via Telegram if any endpoint is losing money or has low margin.
 *
 * Env vars:
 *   TG_BOT_TOKEN  — Telegram bot token
 *   TG_CHAT_ID    — Telegram chat ID to send alerts to
 *
 * Usage:
 *   npx tsx index.ts
 *   # or via cron: 0 9 * * * cd ~/price-monitor && npx tsx index.ts
 */

const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
  console.error("Missing TG_BOT_TOKEN or TG_CHAT_ID env vars");
  process.exit(1);
}

interface PriceCheck {
  service: string;
  endpoint: string;
  ourPrice: number;
  upstreamCost: number;
}

const UPSTREAM_COSTS: PriceCheck[] = [
  // LLMs (per ~500 input + 200 output tokens)
  { service: "OpenAI GPT-4o", endpoint: "/v1/chat/completions", ourPrice: 0.01, upstreamCost: 0.00325 },
  { service: "Anthropic Claude Sonnet", endpoint: "/v1/messages", ourPrice: 0.01, upstreamCost: 0.0045 },
  { service: "Gemini 2.5 Flash", endpoint: "/v1beta/models/gemini-2.5-flash", ourPrice: 0.005, upstreamCost: 0.00065 },
  { service: "Gemini 2.5 Pro", endpoint: "/v1beta/models/gemini-2.5-pro", ourPrice: 0.02, upstreamCost: 0.002625 },
  { service: "DeepSeek", endpoint: "/v1/chat/completions", ourPrice: 0.005, upstreamCost: 0.00025 },
  { service: "Groq", endpoint: "/v1/chat/completions", ourPrice: 0.005, upstreamCost: 0.00045 },
  { service: "Mistral", endpoint: "/v1/chat/completions", ourPrice: 0.005, upstreamCost: 0.00022 },
  { service: "Perplexity", endpoint: "/v1/chat/completions", ourPrice: 0.01, upstreamCost: 0.0057 },
  { service: "Together AI", endpoint: "/v1/chat/completions", ourPrice: 0.005, upstreamCost: 0.0003 },
  { service: "OpenRouter", endpoint: "/v1/chat/completions", ourPrice: 0.01, upstreamCost: 0.003 },
  { service: "AI21", endpoint: "/v1/chat/completions", ourPrice: 0.01, upstreamCost: 0.002 },

  // Images
  { service: "OpenAI DALL-E 3", endpoint: "/v1/images/generations", ourPrice: 0.05, upstreamCost: 0.04 },
  { service: "Stability SD3", endpoint: "/v1/generate/sd3", ourPrice: 0.08, upstreamCost: 0.065 },
  { service: "Stability Ultra", endpoint: "/v1/generate/ultra", ourPrice: 0.10, upstreamCost: 0.08 },
  { service: "fal.ai Flux Dev", endpoint: "/fal-ai/flux/dev", ourPrice: 0.03, upstreamCost: 0.012 },
  { service: "fal.ai Flux Pro", endpoint: "/fal-ai/flux-pro", ourPrice: 0.05, upstreamCost: 0.03 },

  // Audio
  { service: "ElevenLabs TTS", endpoint: "/v1/text-to-speech", ourPrice: 0.08, upstreamCost: 0.06 },
  { service: "ElevenLabs Sound", endpoint: "/v1/sound-generation", ourPrice: 0.08, upstreamCost: 0.06 },
  { service: "OpenAI Whisper", endpoint: "/v1/audio/transcriptions", ourPrice: 0.01, upstreamCost: 0.006 },
  { service: "OpenAI TTS", endpoint: "/v1/audio/speech", ourPrice: 0.02, upstreamCost: 0.015 },
  { service: "AssemblyAI", endpoint: "/v1/transcribe", ourPrice: 0.02, upstreamCost: 0.0025 },

  // Search
  { service: "Brave Search", endpoint: "/v1/web/search", ourPrice: 0.007, upstreamCost: 0.005 },

  // Translation
  { service: "DeepL", endpoint: "/v1/translate", ourPrice: 0.03, upstreamCost: 0.025 },

  // Data (free upstream)
  { service: "CoinGecko", endpoint: "/v1/price", ourPrice: 0.005, upstreamCost: 0 },
  { service: "OpenWeather", endpoint: "/v1/weather", ourPrice: 0.005, upstreamCost: 0 },

  // Web
  { service: "Firecrawl", endpoint: "/v1/scrape", ourPrice: 0.01, upstreamCost: 0.0053 },
  { service: "NewsAPI", endpoint: "/v1/headlines", ourPrice: 0.02, upstreamCost: 0.015 },

  // Communication
  { service: "Twilio SMS", endpoint: "/v1/messages", ourPrice: 0.02, upstreamCost: 0.0083 },
  { service: "SendGrid", endpoint: "/v1/mail/send", ourPrice: 0.005, upstreamCost: 0.001 },
];

async function sendTelegram(text: string): Promise<void> {
  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: "Markdown" }),
  });
}

async function checkPrices(): Promise<void> {
  const alerts: string[] = [];
  const losses: string[] = [];

  for (const check of UPSTREAM_COSTS) {
    const margin = check.ourPrice - check.upstreamCost;
    const marginPct = check.upstreamCost > 0 ? ((margin / check.ourPrice) * 100).toFixed(0) : "100";

    if (margin < 0) {
      losses.push(`${check.service}: $${check.ourPrice} < $${check.upstreamCost} (-$${(-margin).toFixed(4)})`);
    } else if (margin < 0.002 && check.upstreamCost > 0) {
      alerts.push(`${check.service}: margin $${margin.toFixed(4)} (${marginPct}%)`);
    }
  }

  if (losses.length > 0 || alerts.length > 0) {
    let msg = "*Solobank Price Alert*\n\n";
    if (losses.length > 0) {
      msg += "*LOSING MONEY:*\n" + losses.map((l) => `- ${l}`).join("\n") + "\n\n";
    }
    if (alerts.length > 0) {
      msg += "*Low margin:*\n" + alerts.map((a) => `- ${a}`).join("\n");
    }
    await sendTelegram(msg);
  } else {
    const total = UPSTREAM_COSTS.reduce((s, c) => s + (c.ourPrice - c.upstreamCost), 0);
    await sendTelegram(
      `*Solobank Price Check*\nAll ${UPSTREAM_COSTS.length} endpoints profitable.\nTotal margin per sweep: $${total.toFixed(4)}`,
    );
  }
}

checkPrices().catch(console.error);
