import type { Metadata } from "next";
import { DemosPage } from "@/components/demos/DemosPage";

export const metadata: Metadata = {
  title: "Live Demos — Solobank",
  description: "Interactive demos of Solobank AI agent banking — CLI commands, MCP tools, and real output.",
};

export default function Page() {
  return <DemosPage />;
}
