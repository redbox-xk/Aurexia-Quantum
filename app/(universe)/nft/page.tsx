"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ORIGIN_CLASSES } from "@/lib/constants/dimensions";
import { useQuantum } from "@/hooks/useQuantum";
import { WalletButton } from "@/components/web3/WalletButton";
import { ParticleField } from "@/components/quantum/ParticleField";

export default function MintPage() {
  const [selectedClass, setSelectedClass] = useState(0); // Index of Class
  const { mint, isPending, hash } = useQuantum();

  const classes = Object.values(ORIGIN_CLASSES);

  return (
    <main className="min-h-screen pt-24 pb-12 px-6 flex flex-col items-center">
      <ParticleField />
      
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tighter">
          CHOOSE YOUR ORIGIN
        </h1>
        <p className="text-[#6b7db3] text-lg">
          Your class is your identity in the quantum fabric. Choose wisely; 
          this soul-bound NFT will evolve with your consciousness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {classes.map((cls, idx) => (
          <motion.div
            key={cls.name}
            onClick={() => setSelectedClass(idx)}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              selectedClass === idx 
                ? "border-[#2563ff] bg-[#0d162e] shadow-[0_0_30px_rgba(37,99,255,0.2)]" 
                : "border-[#141d38] bg-[#080c1a] hover:border-[#2563ff]/30"
            }`}
          >
            <div 
              className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${cls.color}22`, color: cls.color }}
            >
              <span className="text-2xl font-bold">{cls.name[0]}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{cls.name}</h3>
            <span className="text-[10px] uppercase tracking-widest text-[#2563ff] font-bold">
              {cls.role}
            </span>
            <p className="text-xs text-[#6b7db3] mt-4 leading-relaxed">
              {cls.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
          onClick={() => mint(selectedClass)}
          className="px-12 py-4 bg-[#2563ff] text-white font-bold rounded-full quantum-glow hover:brightness-110 transition-all disabled:opacity-50"
        >
          {isPending ? "MINTING IN PROGRESS..." : "MINT NFT IDENTITY"}
        </motion.button>
        
        {hash && (
          <a 
            href={`https://explorer.aurexia.io/tx/${hash}`} 
            target="_blank" 
            className="text-xs text-[#2563ff] underline opacity-70"
          >
            View Transaction on AurexiaScan
          </a>
        )}
      </div>
    </main>
  );
}
