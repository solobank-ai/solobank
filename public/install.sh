#!/usr/bin/env bash
# Solobank CLI installer
#
# Usage:
#   curl -fsSL https://solobank.lol/install.sh | bash
#
# What this does:
#   1. Checks for Node.js (v18+)
#   2. Installs @solobank/cli globally via npm
#   3. Runs solobank init (wallet creation + MCP setup)
#
# Environment variables:
#   SOLOBANK_SKIP_INIT  - Skip solobank init (default: false)

main() {

set -euo pipefail

# ─── Colors (only when outputting to a terminal) ─────────────────────────────

Color_Off='' Red='' Green='' Dim='' Bold='' Blue='' Yellow='' Cyan=''

if [[ -t 1 ]]; then
  Color_Off='\033[0m'
  Red='\033[0;31m'
  Green='\033[0;32m'
  Yellow='\033[0;33m'
  Blue='\033[0;34m'
  Cyan='\033[0;36m'
  Dim='\033[0;2m'
  Bold='\033[1m'
fi

# ─── Helpers ─────────────────────────────────────────────────────────────────

error() {
  printf "%b\n" "${Red}error${Color_Off}: $*" >&2
  exit 1
}

warn() {
  printf "%b\n" "${Yellow}warn${Color_Off}: $*" >&2
}

info() {
  printf "%b\n" "${Dim}$*${Color_Off}"
}

success() {
  printf "%b\n" "${Green}$*${Color_Off}"
}

bold() {
  printf "%b\n" "${Bold}$*${Color_Off}"
}

# ─── Banner ──────────────────────────────────────────────────────────────────

echo ""
bold "  ┌──────────────────────────────────────────┐"
bold "  │  ${Cyan}Solobank${Color_Off}${Bold} — a bank account for AI agents    │"
bold "  └──────────────────────────────────────────┘"
echo ""

# ─── Check Node.js ───────────────────────────────────────────────────────────

if ! command -v node >/dev/null 2>&1; then
  error "Node.js is required but not found.

  Install Node.js 18+ from https://nodejs.org
  Or use a version manager:

    # nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    nvm install 22

    # brew (macOS)
    brew install node"
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [[ "$NODE_VERSION" -lt 18 ]]; then
  error "Node.js 18+ is required (found v$(node -v | sed 's/v//'))

  Update Node.js: https://nodejs.org"
fi

info "  ✓ Node.js $(node -v) detected"

# ─── Check npm ───────────────────────────────────────────────────────────────

if ! command -v npm >/dev/null 2>&1; then
  error "npm is required but not found. It should come with Node.js."
fi

# ─── Install @solobank/cli ──────────────────────────────────────────────────

echo ""
bold "  Installing @solobank/cli..."
echo ""

npm install -g @solobank/cli@latest 2>&1 | while IFS= read -r line; do
  printf "  %s\n" "$line"
done

if ! command -v solobank >/dev/null 2>&1; then
  error "Installation failed — solobank command not found after npm install.

  Try installing manually:
    npm install -g @solobank/cli"
fi

INSTALLED_VERSION=$(solobank --version 2>/dev/null || echo "unknown")

echo ""
success "  ✓ solobank ${INSTALLED_VERSION} installed"

# ─── Run solobank init ──────────────────────────────────────────────────────

if [[ "${SOLOBANK_SKIP_INIT:-}" != "true" ]]; then
  echo ""
  bold "  Creating wallet..."
  echo ""
  solobank init
fi

# ─── Done ────────────────────────────────────────────────────────────────────

ADDR=$(solobank address 2>/dev/null || echo "run 'solobank address' to see")

echo ""
success "  ──────────────────────────────────────"
success "  ✓ Solobank is ready"
echo ""
info "  Wallet:  ${ADDR}"
echo ""
info "  Next steps:"
echo ""
bold "    solobank balance          ${Dim}# check SOL + USDC balance${Color_Off}"
bold "    solobank send 10 USDC to… ${Dim}# transfer tokens${Color_Off}"
bold "    solobank lend 100 USDC    ${Dim}# earn yield via Kamino/Marginfi${Color_Off}"
bold "    solobank swap 1 SOL USDC  ${Dim}# swap via Jupiter${Color_Off}"
bold "    solobank mcp install      ${Dim}# connect to Claude/Cursor${Color_Off}"
echo ""
info "  Docs:   https://solobank.lol/docs"
info "  GitHub: https://github.com/solobank-ai"
echo ""

}

# Run the installer — this line MUST be the last line in the file.
# If the download is interrupted, bash will not execute an incomplete function.
main "$@"
