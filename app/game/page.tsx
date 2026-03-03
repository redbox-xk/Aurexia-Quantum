'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Sphere } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAccount } from 'wagmi'
import { useOwnedNFTs, useCharacterData } from '@/hooks/useCharacterNFT'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Game() {
  const { address } = useAccount()
  const { ownedTokens } = useOwnedNFTs() // new hook that returns token IDs
  const [selectedToken, setSelectedToken] = useState<number>()
  const [character, setCharacter] = useState<any>(null)
  const [otherPlayers, setOtherPlayers] = useState<any[]>([])
  const socket = useRef<any>(null)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 20 })

  // Fetch character data when selectedToken changes
  const { data: characterData } = useCharacterData(selectedToken)

  useEffect(() => {
    if (characterData) setCharacter(characterData)
  }, [characterData])

  // Generate a seed for procedural universe based on character's quantumSeed
  const universeSeed = character?.quantumSeed || 0

  useEffect(() => {
    socket.current = io('http://localhost:3001')
    socket.current.on('playerMove', (data: any) => setOtherPlayers(data))

    const handleKey = (e: KeyboardEvent) => {
      if (!character) return
      setPosition(p => {
        let { x, y, z } = p
        const speed = character.agility / 50 || 1 // speed based on agility
        if (e.key === 'w') z -= speed
        if (e.key === 's') z += speed
        if (e.key === 'a') x -= speed
        if (e.key === 'd') x += speed
        socket.current.emit('move', { x, y, z })
        return { x, y, z }
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      socket.current.disconnect()
    }
  }, [character])

  // Procedural stars – use seed to generate deterministic positions
  const starsPositions = useMemo(() => {
    const pos = []
    for (let i = 0; i < 2000; i++) {
      // Use seed + i to create deterministic random
      const r = (universeSeed * i) % 1000
      const theta = (universeSeed * i * 100) % (2 * Math.PI)
      const phi = (universeSeed * i * 1000) % Math.PI
      const x = 200 * Math.sin(phi) * Math.cos(theta)
      const y = 200 * Math.sin(phi) * Math.sin(theta)
      const z = 200 * Math.cos(phi)
      pos.push([x, y, z])
    }
    return pos
  }, [universeSeed])

  if (!character) {
    return (
      <div className="h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Select a character to enter the universe</h2>
          <Select onValueChange={(val) => setSelectedToken(parseInt(val))}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Choose your NFT" />
            </SelectTrigger>
            <SelectContent>
              {ownedTokens?.map((tokenId: number) => (
                <SelectItem key={tokenId} value={tokenId.toString()}>
                  Character #{tokenId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-black relative">
      <Canvas camera={{ position: [0, 0, 50] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        {/* Procedural stars */}
        <Stars radius={300} depth={60} count={2000} factor={7} saturation={0} fade speed={1} customPositions={starsPositions} />
        
        {/* 8 Quantum Dimensions – each gets a color based on character's power/mind/agility */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Sphere key={i} args={[2 + i * 0.3]} position={[Math.cos(i * 0.8 + universeSeed) * 15, Math.sin(i * 0.8) * 8, Math.sin(i * 0.8) * 15]}>
            <meshStandardMaterial 
              color={new THREE.Color().setHSL((character.power / 255 + i/8) % 1, 0.8, 0.5)} 
              emissive="#ffffff" 
              emissiveIntensity={0.2} 
            />
          </Sphere>
        ))}

        {/* Player ship – appearance based on class */}
        <Sphere args={[1.5]} position={[position.x, position.y, position.z]}>
          <meshStandardMaterial 
            color={character.className === 'Void Walker' ? '#2563ff' : 
                   character.className === 'Star Forger' ? '#f5a623' : 
                   character.className === 'Nebula Sage' ? '#7c3aed' : '#ef4444'} 
            emissive="#ffffff" 
            emissiveIntensity={0.8} 
          />
        </Sphere>

        {/* Other players */}
        {otherPlayers.map((p, i) => (
          <Sphere key={i} args={[1]} position={[p.x, p.y, p.z]}>
            <meshStandardMaterial color="#00ff85" emissive="#00ff85" emissiveIntensity={0.5} />
          </Sphere>
        ))}

        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
      <div className="absolute top-4 left-4 text-white text-2xl font-display">
        8D QUANTUM UNIVERSE — {character.className} #{selectedToken}
      </div>
      <div className="absolute bottom-4 left-4 text-white text-sm">
        Speed: {character.agility} • Power: {character.power} • Mind: {character.mind}
      </div>
    </div>
  )
}
