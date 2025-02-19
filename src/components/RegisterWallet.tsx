"use client";

import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export default function RegisterWallet() {
  const { address } = useAccount();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const isMounted = useIsMounted();
  const queryClient = useQueryClient();

  const { signMessage } = useSignMessage({
    mutation: {
      onSuccess: async (signature: string) => {
        try {
          const response = await fetch("/api/wallet", {
            method: "POST",
            body: JSON.stringify({
              address,
              signature,
              type: "evm",
            }),
            headers: { "Content-Type": "application/json" },
          });

          const result = await response.json();
          setMessage(result.message || result.error);
          setIsError(!response.ok);

          if (response.ok) {
            toast.success(result.message);
            queryClient.invalidateQueries({ queryKey: ["wallets"] });
          } else {
            toast.error(result.error);
          }
        } catch (error) {
          setMessage((error as Error).message);
          setIsError(true);
          toast.error("Registration failed");
          console.error("Registration error:", error);
        } finally {
          setLoading(false);
        }
      },
      onError: (error: Error) => {
        setMessage(error.message);
        setIsError(true);
        toast.error("Signature failed");
        console.error("Signature error:", error);
        setLoading(false);
      },
    },
  });

  const registerWallet = async () => {
    if (!window.ethereum && !window?.ethereum?.providers?.[0]) {
      alert("Please install a Web3 wallet!");
      return;
    }

    setLoading(true);
    setIsError(false);
    const challengeMessage = `Sign this message to verify ownership of ${address}`;
    signMessage({ message: challengeMessage });
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      <button
        onClick={registerWallet}
        disabled={loading}
        className="px-8 py-4 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 text-lg transition-colors border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Register Wallet"}
      </button>
      {address && (
        <p className="text-zinc-400 text-sm">Current wallet: {address}</p>
      )}
      {message && (
        <p
          className={`text-sm bg-zinc-800 p-3 rounded-lg border ${
            isError
              ? "text-red-400 border-red-700"
              : "text-green-400 border-green-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
