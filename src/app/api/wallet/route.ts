import { NextResponse } from "next/server";
import { recoverMessageAddress, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";
import fs from "fs-extra";
import { WalletRegistration } from "../../../types/wallet";

const WALLET_FILE = "wallets.json";

// Initialize Viem client
const client = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// Check for on-chain activity for anti sybil
async function hasOnchainActivity(address: string): Promise<boolean> {
  const txCount = await client.getTransactionCount({
    address: address as `0x${string}`,
  });
  console.log(txCount);
  return txCount > 0; // Only allow wallets with at least 1 transaction
}

// Load wallets from file
const loadWallets = (): WalletRegistration[] => {
  try {
    return fs.readJsonSync(WALLET_FILE) || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Save wallets to file
const saveWallets = (wallets: WalletRegistration[]) => {
  fs.writeJsonSync(WALLET_FILE, wallets, { spaces: 2 });
};

export async function POST(req: Request) {
  try {
    const { address, signature, type = "evm" } = await req.json();

    if (!address || !signature) {
      return NextResponse.json(
        {
          error:
            "Both wallet address and signature are required for registration",
        },
        { status: 400 }
      );
    }

    const normalizedAddress = address;
    const registeredWallets = loadWallets();

    if (
      registeredWallets.some((wallet) => wallet.address === normalizedAddress)
    ) {
      return NextResponse.json(
        {
          error: `The wallet address ${normalizedAddress} has already been registered`,
        },
        { status: 400 }
      );
    }

    // Check for on-chain activity
    const hasActivity = await hasOnchainActivity(normalizedAddress);
    if (!hasActivity) {
      return NextResponse.json(
        {
          error:
            "This wallet has no on-chain activity. Only active wallets can be registered.",
        },
        { status: 400 }
      );
    }

    // Create a challenge message
    const message = `Sign this message to verify ownership of ${normalizedAddress}`;

    // Recover the address from the signature using viem
    const recoveredAddress = await recoverMessageAddress({
      message,
      signature,
    });

    if (recoveredAddress !== normalizedAddress) {
      console.log(recoveredAddress, normalizedAddress);
      return NextResponse.json(
        {
          error:
            "Signature verification failed. The provided signature does not match the wallet address",
        },
        { status: 400 }
      );
    }

    // Store wallet with additional info
    const newRegistration: WalletRegistration = {
      type,
      address: normalizedAddress,
      timestamp: Date.now(),
    };

    registeredWallets.push(newRegistration);
    saveWallets(registeredWallets);

    return NextResponse.json({ message: "Wallet registered successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your request. Please try again later",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const registeredWallets = loadWallets();
    return NextResponse.json(registeredWallets);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to retrieve registered wallets. Please try again later",
      },
      { status: 500 }
    );
  }
}
