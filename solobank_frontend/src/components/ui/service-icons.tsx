const iconClass = "w-5 h-5 fill-current";

// Each icon is a white SVG that works on dark backgrounds
const icons: Record<string, React.ReactNode> = {
  openai: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  anthropic: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.304 3.541h-3.476l6.182 16.918h3.476zm-10.59 0L.533 20.459h3.476l1.27-3.573h6.476l1.27 3.573h3.476L10.32 3.541zm-.476 10.468 2.09-5.883 2.091 5.883z" />
    </svg>
  ),
  gemini: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C6.276 0 1.461 4.342.214 10.012a.5.5 0 0 0 .276.572C4.682 12.724 7.5 16.943 7.5 21.73c0 .47.02.934.058 1.393a.5.5 0 0 0 .498.463h7.888a.5.5 0 0 0 .498-.463c.038-.46.058-.923.058-1.393 0-4.787 2.818-9.006 7.01-11.146a.5.5 0 0 0 .276-.572C22.539 4.342 17.724 0 12 0z" />
    </svg>
  ),
  deepseek: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H8v-2h3zm4.5-4.5c0 2.49-2.01 4.5-4.5 4.5H8v-2h3c1.38 0 2.5-1.12 2.5-2.5S12.38 10 11 10H8V8h3c2.49 0 4.5 2.01 4.5 4.5z" />
    </svg>
  ),
  groq: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  ),
  cohere: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.51 3C4.015 3 2 5.015 2 7.51s2.015 4.51 4.51 4.51h5.98c.553 0 1-.447 1-1V7.51C13.49 5.015 11.49 3 8.99 3zm0 12.98c-2.495 0-4.51 2.015-4.51 4.51S4.015 25 6.51 25c2.495 0 4.51-2.015 4.51-4.51 0-.553-.447-1-1-1H6.51zm8.98-1c-2.495 0-4.49 2.015-4.49 4.51S13.015 24 15.49 24c2.495 0 4.51-2.015 4.51-4.51s-2.015-4.51-4.51-4.51z" />
    </svg>
  ),
  mistral: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3h4v4H3zm14 0h4v4h-4zM3 7h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 11h4v4H3zm3.5 0h4v4h-4zm3.5 0h4v4h-4zm3.5 0h4v4h-4zm3.5 0h4v4h-4zM3 15h4v4H3zm7 0h4v4h-4zm7 0h4v4h-4zM3 19h4v4H3zm14 0h4v4h-4z" />
    </svg>
  ),
  perplexity: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1L4 5v6l8 4 8-4V5zm0 2.236L17.528 6 12 8.764 6.472 6zM5.5 6.618L11.25 9.5v7.382L5.5 13.618zm13 0v7l-5.75 3.264V9.5z" />
    </svg>
  ),
  together: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm10 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM7 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm10 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  ),
  fal: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5l5 5 5-5m-5 5V3" />
    </svg>
  ),
  firecrawl: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c-1 4-4 6-4 10a4 4 0 0 0 8 0c0-4-3-6-4-10zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  ),
  brave: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4.5 5.5v6.7c0 4.5 3.2 8.7 7.5 9.8 4.3-1.1 7.5-5.3 7.5-9.8V5.5zm0 2.3l5.5 2.5v5.9c0 3.4-2.4 6.6-5.5 7.5-3.1-.9-5.5-4.1-5.5-7.5V6.8z" />
    </svg>
  ),
  exa: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  serper: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  serpapi: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  newsapi: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V8h16zm-6-1h4v-4h-4zM4 9h16v2H4z" />
    </svg>
  ),
  alphavantage: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h2v7H3zm4-4h2v11H7zm4-3h2v14h-2zm4 5h2v9h-2zm4-7h2v16h-2z" />
    </svg>
  ),
  coingecko: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1.5 5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM8.5 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3.5 7a5 5 0 0 1-4.33-2.5h8.66A5 5 0 0 1 12 18z" />
    </svg>
  ),
  openweather: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41z" />
    </svg>
  ),
  googlemaps: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
  translate: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z" />
    </svg>
  ),
  deepl: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.1 17.2l5-5.1-5-5 1.4-1.4 6.4 6.4-6.4 6.5zm5.9 0l5-5.1-5-5 1.4-1.4 6.4 6.4-6.4 6.5z" />
    </svg>
  ),
  resend: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5z" />
    </svg>
  ),
  elevenlabs: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3v18h2V3zm4 0v18h2V3z" />
    </svg>
  ),
  assemblyai: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM5 10a1 1 0 0 0-2 0 9 9 0 0 0 8 8.94V22h2v-3.06A9 9 0 0 0 21 10a1 1 0 0 0-2 0 7 7 0 0 1-14 0z" />
    </svg>
  ),
  judge0: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6z" />
    </svg>
  ),
  hunter: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5z" />
    </svg>
  ),
  ipinfo: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  jina: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5zM8 15h8v2H8zm0-4h8v2H8z" />
    </svg>
  ),
  replicate: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4h6v6H2zm0 10h6v6H2zm10-10h6v6h-6zm0 10h6v6h-6z" />
    </svg>
  ),
  screenshot: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H3V5h18zM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
    </svg>
  ),
  pdfshift: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 18H6V4h7v5h5zM7 13h4v2H7zm0 3h7v2H7zm0-6h3v2H7z" />
    </svg>
  ),
  stability: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5zm0 15l-10-5v5l10 5 10-5v-5z" />
    </svg>
  ),
  huggingface: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-8 6c0-1 1.79-3 4-3s4 2 4 3z" />
    </svg>
  ),
  ai21: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 5v8h2v-3h2v3h2V8zm2 2v1h2v-1z" />
    </svg>
  ),
  runway: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  twilio: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm4 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
    </svg>
  ),
  sendgrid: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6l10 7 10-7v12H2zm10 5.5L4 6h16z" />
    </svg>
  ),
  birdeye: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    </svg>
  ),
  dexscreener: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18V3zm16 16H5V5h14zM7 12h2v5H7zm4-3h2v8h-2zm4-3h2v11h-2z" />
    </svg>
  ),
  helius: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a6 6 0 0 1 5.6 8.1L12 12V6z" />
    </svg>
  ),
  jupiter: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c3.87 0 7 3.13 7 7h-3a4 4 0 0 0-8 0H5c0-3.87 3.13-7 7-7zm0 14c-3.87 0-7-3.13-7-7h3a4 4 0 0 0 8 0h3c0 3.87-3.13 7-7 7z" />
    </svg>
  ),
  notion: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3h12l4 4v14H4zm2 2v14h12V8h-3V5zm3 5h6v2H9zm0 3h6v2H9zm0 3h4v2H9z" />
    </svg>
  ),
  linear: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 19.5L19.5 3c.5-.5 1.3-.1 1.2.6l-1.5 12.7c-.1.4-.3.7-.6.9L7.5 21.8c-.4.2-.8.2-1.1 0L3.2 20.5c-.3-.3-.4-.7-.2-1z" />
    </svg>
  ),
  airtable: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7v2l10 5 10-5V7zm-8 9v4l8 4 8-4v-4l-8 4z" />
    </svg>
  ),
  clearbit: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-4 9c0-2.7 2.7-4 4-4s4 1.3 4 4z" />
    </svg>
  ),
  wolfram: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 12l10 10 10-10zm0 3.4L18.6 12 12 18.6 5.4 12z" />
    </svg>
  ),
  polygon: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h2v7H3zm4-4h2v11H7zm4-3h2v14h-2zm4 5h2v9h-2zm4-7h2v16h-2z" />
    </svg>
  ),
  openrouter: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h7v7H4zm9 0h7v7h-7zm-9 9h7v7H4zm9 0h7v7h-7z" />
    </svg>
  ),
  crunchbase: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3v18h18V3zm8 14H7v-4h4zm0-6H7V7h4zm6 6h-4v-4h4zm0-6h-4V7h4z" />
    </svg>
  ),
  tavily: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  ),
  pinecone: (
    <svg className={iconClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L8 6l4 4-4 4 4 4 4-4-4-4 4-4zm-4 8l-4 4 4 4m8-8l4 4-4 4" />
    </svg>
  ),
};

export function ServiceIcon({ serviceId }: { serviceId: string }) {
  const icon = icons[serviceId];
  if (!icon) {
    // Fallback: first letter in a circle
    return (
      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/60">
        {serviceId[0]?.toUpperCase()}
      </div>
    );
  }
  return <>{icon}</>;
}
