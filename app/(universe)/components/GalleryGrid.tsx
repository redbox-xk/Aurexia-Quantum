"use client";

import { useAccount, useReadContract } from "wagmi";
import { characterAbi } from "@/lib/web3/contracts";

export const GalleryGrid = () => {
  const { address } = useAccount();

  // Fetch tokens owned by the user
  const { data: balance } = useReadContract({
    address: "0x...", // Contract Address
    abi: characterAbi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  if (!balance || Number(balance) === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-[#141d38] rounded-3xl">
        <p className="text-[#6b7db3]">No Quantum Identities found in this wallet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {/* Map through tokens and render CharacterCards here */}
    </div>
  );
};
