# Solobank Price Monitor

Checks upstream API costs against Solobank gateway prices. Sends Telegram alerts if any endpoint is losing money or has low margin.

## Setup

```bash
cp .env.example .env
# Fill in TG_BOT_TOKEN and TG_CHAT_ID
```

## Run

```bash
npx tsx index.ts
```

## Cron (daily at 9:00 UTC)

```bash
0 9 * * * cd ~/price-monitor && TG_BOT_TOKEN=xxx TG_CHAT_ID=xxx npx tsx index.ts
```

## License

MIT
