"use client";
import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { characterAbi } from '@/lib/web3/contracts';

export function useQuantum() {
  const [activeTokenId, setActiveTokenId] = useState<number | null>(null);

  const { data: hash, writeContract, isPending } = useWriteContract();

  const mint = async (classIndex: number) => {
    writeContract({
      address: '0x...', // CharacterIdentity Contract Address
      abi: characterAbi,
      functionName: 'mintCharacter',
      args: [BigInt(classIndex)],
    });
  };

  return { mint, isPending, hash, activeTokenId };
}
