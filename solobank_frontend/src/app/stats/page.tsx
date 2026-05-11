"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://130.61.175.254:3001";

interface StatsData {
  totalTransactions: number;
  totalRevenueUsd: string;
  services: Record<string, { count: number; revenueUsd: string }>;
  period: string;
}

const PERIODS = [
  { value: "1h", label: "1 hour" },
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
];

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [period, setPeriod] = useState("24h");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch(`${GATEWAY_URL}/stats?period=${period}`);
      const data = await res.json();
      setStats(data);
      setLastUpdated(new Date());
    } catch {
      setStats(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, [period]);

  const serviceEntries = stats ? Object.entries(stats.services).sort(([, a], [, b]) => b.count - a.count) : [];

  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Network Stats</h1>
          <p className="text-muted text-lg">
            Real-time data from the Solobank MPP gateway on Solana mainnet.
          </p>
        </div>

        {/* Period selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {PERIODS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  period === p.value
                    ? "bg-solana-green/20 text-solana-green border border-solana-green/30"
                    : "bg-surface border border-border text-muted hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-sm text-dim">
            {lastUpdated && (
              <span>Updated {lastUpdated.toLocaleTimeString()}</span>
            )}
            <button
              onClick={fetchStats}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-surface/40 border border-border rounded-xl px-6 py-5">
            <p className="text-dim text-xs uppercase tracking-wider mb-1">Transactions</p>
            <p className="text-3xl font-bold text-foreground">
              {loading ? "—" : (stats?.totalTransactions ?? 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-surface/40 border border-border rounded-xl px-6 py-5">
            <p className="text-dim text-xs uppercase tracking-wider mb-1">Revenue</p>
            <p className="text-3xl font-bold text-solana-green">
              {loading ? "—" : `$${Number(stats?.totalRevenueUsd ?? 0).toFixed(4)}`}
            </p>
            <p className="text-dim text-xs mt-1">USDC</p>
          </div>
          <div className="bg-surface/40 border border-border rounded-xl px-6 py-5">
            <p className="text-dim text-xs uppercase tracking-wider mb-1">Active services</p>
            <p className="text-3xl font-bold text-foreground">
              {loading ? "—" : serviceEntries.length}
            </p>
          </div>
        </div>

        {/* Per-service breakdown */}
        {serviceEntries.length > 0 && (
          <div className="border border-border rounded-xl bg-surface/40 overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">By service</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-dim text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-2 font-medium">Service</th>
                  <th className="text-right px-6 py-2 font-medium">Requests</th>
                  <th className="text-right px-6 py-2 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {serviceEntries.map(([name, data]) => (
                  <tr key={name} className="border-t border-border/50">
                    <td className="px-6 py-3 text-foreground font-medium">{name}</td>
                    <td className="px-6 py-3 text-right text-muted">{data.count.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-mono text-solana-green">${Number(data.revenueUsd).toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {serviceEntries.length === 0 && !loading && (
          <div className="text-center py-16 text-muted">
            <p className="text-lg mb-2">No transactions yet</p>
            <p className="text-sm">When agents start paying for API access, stats will appear here.</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/services" className="text-solana-green hover:underline text-sm">
            View available services →
          </Link>
        </div>
      </div>
    </main>
  );
}
