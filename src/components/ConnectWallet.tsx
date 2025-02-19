"use client";

import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectWallet() {
  const { connect, error } = useConnect();

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => connect({ connector: injected() })}
        className="px-8 py-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 text-lg transition-colors border border-zinc-700 disabled:opacity-50"
      >
        Connect MetaMask
      </button>
      {error && <div className="text-red-400">{error.message}</div>}
    </div>
  );
}
