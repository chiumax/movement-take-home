"use client";
import RegisterWallet from "@/components/RegisterWallet";
import WalletList from "@/components/WalletList";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function RegisteredWallets() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Registered Wallets
      </h1>
      <div className="max-w-2xl mx-auto">
        <RegisterWallet />
        <WalletList />
      </div>
    </div>
  );
}
