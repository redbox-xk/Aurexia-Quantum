"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, ShoppingCart, Repeat } from "lucide-react";
import Link from "next/link";

const actions = [
  { label: "Enter Universe", icon: Globe, href: "/universe", color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Upgrade NFT", icon: Shield, href: "/nft", color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Stake AXC", icon: Zap, href: "/staking", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { label: "Marketplace", icon: ShoppingCart, href: "/marketplace", color: "text-green-400", bg: "bg-green-500/10" },
  { label: "Bridge AXC", icon: Repeat, href: "/bridge", color: "text-cyan-400", bg: "bg-cyan-500/10" },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {actions.map((action) => (
        <Link key={action.label} href={action.href}>
          <motion.div
            whileHover={{ y: -5, borderColor: "rgba(37,99,255,0.4)" }}
            className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#141d38] bg-[#080c1a] group transition-all"
          >
            <div className={`w-12 h-12 ${action.bg} ${action.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon size={24} />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-widest">{action.label}</span>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};
