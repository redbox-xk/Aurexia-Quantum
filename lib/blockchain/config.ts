import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { defineChain } from 'viem'

// Custom Aurexia Chain Definition
export const aurexiaChain = defineChain({
  id: 8888, // Unique Universe ID
  name: 'Aurexia Chain',
  nativeCurrency: { 
    name: 'Aurexia Coin', 
    symbol: 'AXC', 
    decimals: 18 
  },
  rpcUrls: {
    default: { http: ['https://rpc.aurexia.io'] },
  },
  blockExplorers: {
    default: { name: 'AurexiaScan', url: 'https://explorer.aurexia.io' },
  },
})

export const config = createConfig({
  chains: [aurexiaChain],
  transports: {
    [aurexiaChain.id]: http(),
  },
})
