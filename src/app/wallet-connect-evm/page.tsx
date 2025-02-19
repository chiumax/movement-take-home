"use client";

import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useIsMounted } from "@/hooks/useIsMounted";
import { injected, metaMask, coinbaseWallet } from "wagmi/connectors";
import { toast } from "react-toastify";

export default function WalletConnectPage() {
  const { connect } = useConnect({
    mutation: {
      onSuccess() {
        toast.success("Wallet connected successfully!");
      },
      onError(error) {
        toast.error(`Failed to connect wallet: ${error.message}`);
      },
    },
  });
  const { address } = useAccount();
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess() {
        toast.success("Wallet disconnected successfully!");
      },
      onError(error) {
        toast.error(`Failed to disconnect wallet: ${error.message}`);
      },
    },
  });
  const mounted = useIsMounted();

  const wallets = [
    {
      name: "MetaMask",
      connector: metaMask,
      icon: "🦊",
    },
    {
      name: "Coinbase Wallet",
      connector: coinbaseWallet,
      icon: "📱",
    },
    {
      name: "Phantom",
      connector: () => injected({ target: "phantom" }),
      icon: "👻",
    },
    {
      name: "Uniswap Wallet",
      connector: () => injected({ target: "uniswapWallet" }),
      icon: "🦄",
    },
  ];
  if (!mounted) return null;

  return (
    <div className="pt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Connect Your Wallet
      </h1>
      <div className="max-w-2xl mx-auto">
        {!address ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => connect({ connector: wallet.connector() })}
                className="flex items-center justify-center gap-3 p-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                <span className="text-2xl">{wallet.icon}</span>
                <span className="font-medium">{wallet.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-zinc-800 rounded-lg border border-zinc-700">
            <p className="text-zinc-300">Connected with: {address}</p>
            <button
              onClick={() => disconnect()}
              className="mt-4 px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
