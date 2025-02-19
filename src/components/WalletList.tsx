"use client";

import { useWallets } from "../hooks/useWallets";
import { WalletRegistration } from "../types/wallet";

export default function WalletList() {
  const { data: wallets, isLoading } = useWallets();

  return (
    <div className="mt-8">
      <h2 className="text-xl mb-4 text-zinc-200">Registered Wallets</h2>
      {isLoading ? (
        <p className="text-zinc-400">Loading wallets...</p>
      ) : (
        <ul className="space-y-2">
          {wallets?.length > 0 ? (
            wallets.map((wallet: WalletRegistration) => (
              <li
                key={wallet.address}
                className="bg-zinc-800 p-3 rounded-lg border border-zinc-700"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-200">{wallet.address}</span>
                  <div className="text-sm text-zinc-400">
                    <span className="mr-4">Type: {wallet.type}</span>
                    <span>
                      Registered: {new Date(wallet.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-zinc-400">No wallets registered yet.</li>
          )}
        </ul>
      )}
    </div>
  );
}
