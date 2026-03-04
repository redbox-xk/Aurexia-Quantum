"use client";

import { ConnectKitButton } from "connectkit";
import { motion } from "framer-motion";

export const WalletButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName }) => {
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={show}
            className="px-6 py-2 rounded-full border border-[#2563ff]/50 bg-[#080c1a] text-white font-quantum text-sm quantum-glow transition-all"
          >
            {isConnected ? (ensName ?? address?.slice(0, 6) + "...") : "CONNECT WALLET"}
          </motion.button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
