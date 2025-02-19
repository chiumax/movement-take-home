"use client";
import { useAccount, useDisconnect } from "wagmi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function Container({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const pathname = usePathname();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="container mx-auto px-4">
        <div className="py-4 flex justify-end gap-4 items-center">
          {pathname !== "/" && (
            <Link
              href="/"
              className="px-3 py-1 text-sm bg-zinc-800 rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Back to Home
            </Link>
          )}
          {isConnected && (
            <>
              <p className="text-sm text-zinc-400">Connected: {address}</p>
              <button
                onClick={() => disconnect()}
                className="px-3 py-1 text-sm bg-zinc-800 rounded hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                Disconnect
              </button>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
