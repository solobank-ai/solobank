---
name: solobank-pay
description: >-
  Pay for an MPP-protected (Machine Payments Protocol) API endpoint with SOL
  or USDC on Solana. Use when the user asks to "call this paid API", "use a
  gated service", "pay for an LLM call", "fetch from a 402 endpoint", or any
  service hosted behind the Solobank MPP gateway. Do NOT use for
  peer-to-peer transfers — that's `solobank-send`.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, mpp, api, payment, http, 402, solobank]
---

# Solobank: Pay for an MPP API

## Purpose
Call an MPP-protected HTTP endpoint. The CLI handles the full HTTP 402
"Payment Required" negotiation: signs an on-chain SOL/USDC transfer to
the gateway recipient, waits for confirmation, retries the request with
the payment proof, and returns the upstream API response.

## Gateway
The canonical Solobank MPP gateway lives at:

```
https://mpp.solobank.lol
```

There are **46 services and 95 endpoints** wired up at the time of
writing — full live list at <https://www.solobank.lol/services>.

The gateway runs on **Solana devnet**.

## Command
```bash
solobank pay <url> [--method <METHOD>] [--data <json|string>] [--max-price <usd>]
```

| Option | Default | Description |
|---|---|---|
| `--method` | `GET` | HTTP method for the upstream call |
| `--data` | _none_ | Request body. JSON is parsed; otherwise sent as a string. |
| `--max-price` | _safeguard `maxAmountPerTx`_ | Reject the call if the gateway quotes more than this in USD |

## Examples
```bash
# OpenAI chat completion via the gateway
solobank pay https://mpp.solobank.lol/openai/v1/chat/completions \
  --method POST \
  --data '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"hello"}]}' \
  --max-price 0.05

# Brave Search
solobank pay "https://mpp.solobank.lol/brave/web?q=solana" --max-price 0.005

# CoinGecko price
solobank pay "https://mpp.solobank.lol/coingecko/simple/price?ids=solana&vs_currencies=usd"
```

## Flow (handled automatically by `solobank pay`)
1. Plain HTTP request → upstream returns **HTTP 402** with a payment
   challenge (recipient address, asset, price).
2. CLI checks `price ≤ --max-price` and `price ≤ maxAmountPerTx`. Aborts
   if either check fails.
3. CLI builds and signs an SPL token (USDC) or SOL transfer to the
   recipient.
4. CLI broadcasts and waits for confirmation.
5. CLI replays the original request with `x-payment-signature: <sig>`.
6. Gateway verifies the signature on chain and returns the upstream
   API's response body.

## Output
```
✓ Paid $0.005 → mpp.solobank.lol (brave/web)
  Signature: 4BFGYc6o3kUMswsn...
  Status:    200
  Body:      {"web":{"results":[...]}}
```

## Discovery
To enumerate available services and per-endpoint pricing:

```bash
curl -s https://mpp.solobank.lol/services | jq .
```

There is also an MCP tool `solobank_services` that returns the same list
in a Claude/OpenClaw-friendly shape.

## Notes
- `--max-price` is **on top of** the global `maxAmountPerTx` safeguard.
  Whichever is lower wins.
- Devnet currently uses USDC for MPP payments.
- The wallet must be funded before calling — run `solobank balance`
  first.
- Failed upstream calls (5xx, timeout) **do not get refunded** —
  payments go to the gateway recipient regardless. Use `--max-price`
  conservatively for new endpoints.
