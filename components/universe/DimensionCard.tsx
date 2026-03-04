"use client";

import { motion } from "framer-motion";
import { Users, Lock } from "lucide-react";
import { Dimension } from "@/lib/constants/dimensions";

interface DimensionCardProps {
  dimension: Dimension;
}

export const DimensionCard = ({ dimension }: DimensionCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, borderColor: dimension.color }}
      className="relative p-6 rounded-xl border border-[#141d38] bg-[#080c1a] group cursor-pointer transition-colors"
    >
      {!dimension.unlocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-[2px]">
          <Lock className="text-gray-500" size={32} />
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-3 h-3 rounded-full animate-pulse" 
          style={{ backgroundColor: dimension.color, boxShadow: `0 0 12px ${dimension.color}` }}
        />
        <h3 className="text-xl font-bold text-white">{dimension.name}</h3>
      </div>

      <p className="text-sm text-[#6b7db3] mb-6 line-clamp-2">
        {dimension.description}
      </p>

      <div className="flex items-center justify-between text-xs text-[#6b7db3]">
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{dimension.players.toLocaleString()} Explorers</span>
        </div>
        <span className="uppercase tracking-widest">{dimension.type}</span>
      </div>
    </motion.div>
  );
};
