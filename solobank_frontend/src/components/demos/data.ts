export type DemoMode = "ai" | "cli";

// ── AI conversation types ──

export interface ChatMessage {
  role: "user" | "assistant" | "tool";
  content: string;
  toolCall?: string;
}

export interface AiScenario {
  id: string;
  mode: "ai";
  tabLabel: string;
  title: string;
  description: string;
  messages: ChatMessage[];
  mcpTools: string[];
}

// ── CLI types ──

export interface CliLine {
  text: string;
  type: "command" | "output" | "success" | "blank";
}

export interface CliScenario {
  id: string;
  mode: "cli";
  tabLabel: string;
  title: string;
  description: string;
  lines: CliLine[];
  commands: string[];
}

export type Scenario = AiScenario | CliScenario;

// ── AI Scenarios ──

export const aiScenarios: AiScenario[] = [
  {
    id: "morning",
    mode: "ai",
    tabLabel: "Morning Check-in",
    title: "Morning Check-in",
    description: "Balances, yield, and action items — one prompt.",
    mcpTools: ["solobank_balance"],
    messages: [
      { role: "user", content: "Good morning — how's my solobank looking?" },
      { role: "assistant", content: "Let me check your accounts.", toolCall: "solobank_balance" },
      {
        role: "tool",
        content: `SOL     2.41 SOL
USDC    1,248.91 USDC
Kamino  800.00 USDC  ·  6.2% APY
Net     $1,312.47`,
      },
      {
        role: "assistant",
        content:
          "You have $1,312.47 across your accounts. Your Kamino lending position is earning 6.2% APY on 800 USDC. Checking has 448.91 USDC liquid — you could sweep more into savings if you don't need it today.",
      },
    ],
  },
  {
    id: "payday",
    mode: "ai",
    tabLabel: "Payday Deposit",
    title: "Payday Deposit",
    description: "AI allocates funds across savings and checking automatically.",
    mcpTools: ["solobank_balance", "solobank_send"],
    messages: [
      { role: "user", content: "I just got 500 USDC. Put 400 into Kamino savings, keep 100 liquid." },
      { role: "assistant", content: "Depositing 400 USDC to Kamino at the current 6.2% APY.", toolCall: "solobank_send" },
      {
        role: "tool",
        content: `Deposited 400.00 USDC to Kamino
TX: 3vGh...8mKp  confirmed (380ms)
New Kamino balance: 1,200.00 USDC
Checking: 548.91 USDC`,
      },
      {
        role: "assistant",
        content:
          "Done. 400 USDC deposited to Kamino — now earning 6.2% on 1,200 USDC. You have 548.91 USDC liquid in checking.",
      },
    ],
  },
  {
    id: "send",
    mode: "ai",
    tabLabel: "Send Money",
    title: "Send Money",
    description: "Send by address with preview and confirmation.",
    mcpTools: ["solobank_send"],
    messages: [
      { role: "user", content: "Send 25 USDC to 9pFr...2kLx" },
      { role: "assistant", content: "Sending 25 USDC now.", toolCall: "solobank_send" },
      {
        role: "tool",
        content: `Sent    25.00 USDC  →  9pFr...2kLx
TX: 4vGh...8mKp  confirmed (420ms)
Balance after: 523.91 USDC`,
      },
      {
        role: "assistant",
        content: "Sent! 25 USDC delivered to 9pFr...2kLx in 420ms. Your checking balance is now 523.91 USDC.",
      },
    ],
  },
  {
    id: "swap",
    mode: "ai",
    tabLabel: "What If — Swap",
    title: "What If — Swap",
    description: "Preview any swap before committing.",
    mcpTools: ["solobank_balance", "solobank_pay"],
    messages: [
      { role: "user", content: "What if I swapped 50 USDC to SOL?" },
      { role: "assistant", content: "Let me get a Jupiter quote.", toolCall: "solobank_balance" },
      {
        role: "tool",
        content: `Quote: 50 USDC → 0.351 SOL
Rate:  1 SOL = 142.38 USDC
Slippage: 0.1%
Route: USDC → SOL (Jupiter)`,
      },
      { role: "assistant", content: "You'd get 0.351 SOL for 50 USDC at a rate of 142.38 USDC/SOL with 0.1% slippage. Want me to execute?" },
      { role: "user", content: "Do it." },
      { role: "assistant", content: "Executing swap.", toolCall: "solobank_pay" },
      {
        role: "tool",
        content: `Swapped 50.00 USDC → 0.351 SOL
TX: 2kNp...7xQw  confirmed (510ms)`,
      },
      { role: "assistant", content: "Swapped. You now have 2.761 SOL and 473.91 USDC." },
    ],
  },
  {
    id: "pay-api",
    mode: "ai",
    tabLabel: "Pay for API",
    title: "Pay for API",
    description: "Agent pays for an MPP-protected API with SOL automatically.",
    mcpTools: ["solobank_pay"],
    messages: [
      { role: "user", content: "Get the weather in Tokyo — use the gateway." },
      { role: "assistant", content: "Calling the weather endpoint. The gateway requires a $0.005 SOL payment via MPP.", toolCall: "solobank_pay" },
      {
        role: "tool",
        content: `402 → Payment Required: 0.005 SOL
Paid: TX 5mRx...3kLp confirmed (440ms)
Response: 200 OK

Tokyo: 22°C, partly cloudy
Humidity: 65%  ·  Wind: 12 km/h NE`,
      },
      {
        role: "assistant",
        content: "Tokyo is 22°C and partly cloudy with 65% humidity. The API call cost 0.005 SOL — paid automatically via MPP.",
      },
    ],
  },
];

// ── CLI Scenarios ──

export const cliScenarios: CliScenario[] = [
  {
    id: "init",
    mode: "cli",
    tabLabel: "Init",
    title: "Init — Setup in 30 Seconds",
    description: "Wallet, MCP server, and safeguards — one command.",
    commands: ["solobank init"],
    lines: [
      { text: "solobank init", type: "command" },
      { text: "", type: "blank" },
      { text: "Wallet created: 7xKp...3mNq", type: "success" },
      { text: "MCP server configured", type: "success" },
      { text: "Safeguards: $100/tx · $500/day", type: "success" },
      { text: "", type: "blank" },
      { text: "Add to Claude Desktop:", type: "output" },
      { text: '  "solobank": {', type: "output" },
      { text: '    "command": "solobank-mcp"', type: "output" },
      { text: "  }", type: "output" },
      { text: "", type: "blank" },
      { text: "Your agent has a bank account.", type: "success" },
    ],
  },
  {
    id: "balance",
    mode: "cli",
    tabLabel: "Balance",
    title: "Balance & Address",
    description: "Check wallet address and all token balances.",
    commands: ["solobank address", "solobank balance"],
    lines: [
      { text: "solobank address", type: "command" },
      { text: "7xKp...3mNq", type: "output" },
      { text: "", type: "blank" },
      { text: "solobank balance", type: "command" },
      { text: "SOL    2.41 SOL       ($343.80)", type: "output" },
      { text: "USDC   1,248.91 USDC  ($1,248.91)", type: "output" },
      { text: "Kamino 800.00 USDC    (6.2% APY)", type: "output" },
      { text: "", type: "blank" },
      { text: "Net worth: $1,592.71", type: "success" },
    ],
  },
  {
    id: "send-pay",
    mode: "cli",
    tabLabel: "Send & Pay",
    title: "Send & Pay",
    description: "Transfer USDC and pay for an MPP-protected API.",
    commands: ["solobank send", "solobank pay"],
    lines: [
      { text: "solobank send 10 9pFr...2kLx", type: "command" },
      { text: "Sent 10.00 USDC → 9pFr...2kLx", type: "success" },
      { text: "TX: 4vGh...8mKp  confirmed (420ms)", type: "output" },
      { text: "", type: "blank" },
      { text: "solobank pay https://gateway.solobank.ai/openai/v1/chat/completions", type: "command" },
      { text: '  --data \'{"model":"gpt-4o-mini","messages":[...]}\'', type: "output" },
      { text: "402 → 0.01 SOL required", type: "output" },
      { text: "Paid: TX 2kNp...7xQw  confirmed (380ms)", type: "success" },
      { text: '{"choices":[{"message":{"content":"Hello! How can I help?"}}]}', type: "output" },
    ],
  },
  {
    id: "swap",
    mode: "cli",
    tabLabel: "Swap",
    title: "Swap Tokens",
    description: "Get a Jupiter quote and execute a token swap.",
    commands: ["solobank swap-quote", "solobank swap"],
    lines: [
      { text: "solobank swap-quote 100 USDC SOL", type: "command" },
      { text: "Quote: 100 USDC → 0.702 SOL", type: "output" },
      { text: "Rate:  1 SOL = 142.38 USDC", type: "output" },
      { text: "Slippage: 0.1%", type: "output" },
      { text: "Route: USDC → SOL (Jupiter)", type: "output" },
      { text: "", type: "blank" },
      { text: "solobank swap 100 USDC SOL", type: "command" },
      { text: "Swapped 100.00 USDC → 0.702 SOL", type: "success" },
      { text: "TX: 8pLm...4nRx  confirmed (510ms)", type: "output" },
    ],
  },
  {
    id: "lend",
    mode: "cli",
    tabLabel: "Lend & Borrow",
    title: "Lend & Borrow",
    description: "Deposit to lending protocols and borrow against collateral.",
    commands: ["solobank lend-rates", "solobank lend", "solobank borrow"],
    lines: [
      { text: "solobank lend-rates USDC", type: "command" },
      { text: "Protocol     APY     Available", type: "output" },
      { text: "Kamino       6.21%   $12.4M", type: "output" },
      { text: "marginfi     8.10%   $8.1M", type: "output" },
      { text: "", type: "blank" },
      { text: "solobank lend 200 USDC --protocol kamino", type: "command" },
      { text: "Deposited 200.00 USDC to Kamino", type: "success" },
      { text: "TX: 6kPn...2mQx  confirmed (390ms)", type: "output" },
      { text: "APY: 6.21%", type: "output" },
      { text: "", type: "blank" },
      { text: "solobank borrow 50 USDC --protocol kamino", type: "command" },
      { text: "Borrowed 50.00 USDC from Kamino", type: "success" },
      { text: "TX: 9xRm...1kLp  confirmed (410ms)", type: "output" },
      { text: "Borrow rate: 7.67%", type: "output" },
    ],
  },
];

export const allScenarios: Record<DemoMode, Scenario[]> = {
  ai: aiScenarios,
  cli: cliScenarios,
};
