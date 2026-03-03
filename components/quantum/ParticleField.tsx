"use client";
import { motion } from "framer-motion";

export const ParticleField = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#04060f] overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#2563ff] rounded-full opacity-20"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{
            y: [null, Math.random() * -100 + "%"],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};
