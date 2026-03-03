'use client'
import { useEffect, useState } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { AXC_ABI, CHARACTER_NFT_ABI, MARKETPLACE_ABI } from '@/lib/web3/abis'

const AXC_ADDRESS = process.env.NEXT_PUBLIC_AXC_ADDRESS as `0x${string}`
const NFT_ADDRESS = process.env.NEXT_PUBLIC_CHARACTER_NFT_ADDRESS as `0x${string}`
const MARKETPLACE_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as `0x${string}`

export default function Marketplace() {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()
  const [listings, setListings] = useState<any[]>([])
  const [price, setPrice] = useState('')
  const [selectedToken, setSelectedToken] = useState<number>()

  // Fetch listings (simplified – in production you'd index events)
  // For now, we'll just show a placeholder

  const listCharacter = async (tokenId: number) => {
    if (!price) return toast.error('Enter price')
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'listCharacter',
      args: [BigInt(tokenId), BigInt(parseFloat(price) * 1e18)],
    }, {
      onSuccess: () => toast.success('Listed!'),
      onError: (e) => toast.error('Failed: ' + e.message)
    })
  }

  const buyCharacter = async (tokenId: number, priceWei: bigint) => {
    // First approve AXC spending
    writeContract({
      address: AXC_ADDRESS,
      abi: AXC_ABI,
      functionName: 'approve',
      args: [MARKETPLACE_ADDRESS, priceWei],
    }, {
      onSuccess: () => {
        writeContract({
          address: MARKETPLACE_ADDRESS,
          abi: MARKETPLACE_ABI,
          functionName: 'buyCharacter',
          args: [BigInt(tokenId)],
        }, {
          onSuccess: () => toast.success('Purchased!'),
          onError: (e) => toast.error('Buy failed: ' + e.message)
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-display mb-8">Marketplace</h1>
      <p className="text-gray-400 mb-8">Trade your quantum characters with AXC</p>

      {/* Your owned NFTs (simplified) */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Map through owned NFTs and show list button */}
        <Card className="p-4 bg-card border-border">
          <h3>Void Walker #1</h3>
          <Input placeholder="Price in AXC" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Button onClick={() => listCharacter(1)} className="mt-2">List</Button>
        </Card>
      </div>

      {/* Listings (would come from event indexing) */}
      <h2 className="text-3xl mt-12 mb-4">Buy Characters</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 bg-card border-border">
          <h3>Star Forger #5</h3>
          <p>Price: 250 AXC</p>
          <Button onClick={() => buyCharacter(5, 250n * 10n**18n)}>Buy</Button>
        </Card>
      </div>
    </div>
  )
}
