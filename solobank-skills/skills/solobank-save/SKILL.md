---
name: solobank-save
description: >-
  Supply USDC or SOL to a Solana lending protocol (Kamino or Marginfi) to
  earn yield. Use when the user asks to "save", "earn yield", "deposit to
  savings", "lend USDC", "put funds to work", or "deposit for interest".
  Always pair with `solobank lend-rates` so the agent can compare APYs
  before committing.
license: MIT
metadata:
  author: solobank
  version: "4.0.2"
  requires: Solobank CLI 4.0.x (npx -y @solobank/cli@latest init)
  tags: [solana, defi, lending, kamino, marginfi, yield, savings, solobank]
---

# Solobank: Save (Lend / Supply)

## Purpose
Supply assets to a DeFi lending protocol on Solana to earn yield. Solobank
auto-routes to the highest-APY market across Kamino and Marginfi by
default. The supplied position can later be withdrawn (`solobank withdraw`)
or used as collateral for borrowing (`solobank borrow`).

## Commands
```bash
solobank lend-rates <asset> [--protocol auto|kamino|marginfi]
solobank lend       <amount> <asset> [--protocol auto|kamino|marginfi]
```

`--protocol` defaults to **auto**, which picks the highest APY across
all known markets for that asset.

## Recommended flow
1. `solobank lend-rates USDC` — list every market and its current APY.
2. Show the user the top option (or pick automatically).
3. `solobank lend 100 USDC` — supply at the best rate (auto-routes).

## Examples
```bash
# Compare every Kamino + Marginfi USDC market
solobank lend-rates USDC

# Force a specific protocol
solobank lend-rates USDC --protocol kamino

# Supply 100 USDC to the best venue
solobank lend 100 USDC

# Supply 0.5 SOL to Kamino specifically
solobank lend 0.5 SOL --protocol kamino
```

## Output (real CLI 4.0.2)
```
$ solobank lend-rates USDC
1. kamino   USDC 8.21% market=45FNL6...Uztc98
2. kamino   USDC 7.94% market=27MKCQ...WVRS4J
3. marginfi USDC 7.05% bank=BkUyfX...PmQ6tk
```

```
$ solobank lend 100 USDC
✓ Supplied 100 USDC to Kamino
  Market:    45FNL6...Uztc98
  APY:       8.21 %
  Signature: 5ScEUtUfzq4SdDti...
```

## Notes
- `auto` protocol queries every market and picks the top APY for the
  asset. Pass `--protocol kamino` or `--protocol marginfi` to force one.
- Supplied funds remain liquid — withdraw any time with
  `solobank withdraw`.
- Supplied funds also count as **collateral** for `solobank borrow`.
  Borrowing against your supply lowers your health factor — monitor it
  via the protocol's UI or borrow output.
- All amounts go through the safeguard layer
  (`maxAmountPerTx`, `maxDailySend`).
