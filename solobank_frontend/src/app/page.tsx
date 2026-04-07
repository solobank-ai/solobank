import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Accounts } from "@/components/sections/Accounts";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { Install } from "@/components/sections/Install";

export const metadata: Metadata = {
  title: "Solobank — A Bank Account for AI Agents",
  description:
    "Five accounts. Earn, borrow, invest, swap, pay — autonomously. Built on Solana.",
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <Hero />
      <Accounts />
      <HowItWorks />
      <Comparison />
      <Install />
    </>
  );
}
