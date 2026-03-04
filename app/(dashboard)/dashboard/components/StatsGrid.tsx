import { Shield, Zap, Brain, Globe } from "lucide-react";

const stats = [
  { label: "AXC Balance", value: "1,240", icon: Zap, color: "#2563ff" },
  { label: "Consciousness Score", value: "842", icon: Brain, color: "#a855f7" },
  { label: "Dimensions Visited", value: "3 / 8", icon: Globe, color: "#22c55e" },
  { label: "NFT Level", value: "14", icon: Shield, color: "#ffc800" },
];

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="p-6 rounded-xl border border-[#141d38] bg-[#080c1a] hover:border-[#2563ff]/30 transition-all">
          <div className="flex items-center gap-4 mb-2">
            <stat.icon size={20} style={{ color: stat.color }} />
            <span className="text-xs text-[#6b7db3] uppercase tracking-widest">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};
