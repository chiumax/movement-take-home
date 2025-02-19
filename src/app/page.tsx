"use client";
import Link from "next/link";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Home() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Wallet Management (testnet)
      </h1>
      <div className="flex flex-col space-y-4 max-w-md mx-auto">
        <Link
          href="/registered-wallets"
          className="px-8 py-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 text-center text-lg transition-colors border border-zinc-700"
        >
          View Registered Wallets
        </Link>
        <Link
          href="/wallet-connect-evm"
          className="px-8 py-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 text-center text-lg transition-colors border border-zinc-700"
        >
          Connect EVM Wallet
        </Link>
      </div>
    </div>
  );
}
