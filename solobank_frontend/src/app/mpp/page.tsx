import type { Metadata } from "next";
import { MppPage } from "@/components/mpp/MppPage";

export const metadata: Metadata = {
  title: "MPP — Machine Payments Protocol on Solana | Solobank",
  description:
    "Accept USDC payments on any API with 5 lines of code. Built on Solana with sub-second settlement and minimal gas costs.",
};

export default function Page(): React.ReactElement {
  return <MppPage />;
}
