export type DimensionType = 'Origin' | 'Resource' | 'Combat' | 'Hidden';

export interface Dimension {
  id: string;
  name: string;
  type: DimensionType;
  description: string;
  color: string;
  players: number;
  difficulty: number;
  unlocked: boolean;
}

export const DIMENSIONS: Dimension[] = [
  {
    id: "genesis-realm",
    name: "Genesis Realm",
    type: "Origin",
    description: "The birthplace of all Aurexia explorers. High stability, rich in beginner resources.",
    color: "#22c55e",
    players: 34291,
    difficulty: 1,
    unlocked: true,
  },
  {
    id: "quantum-void",
    name: "Quantum Void",
    type: "Hidden",
    description: "The space between dimensions. Gravity is non-linear and rewards are exponential.",
    color: "#a855f7",
    players: 8822,
    difficulty: 5,
    unlocked: false,
  },
  {
    id: "crystal-caverns",
    name: "Crystal Caverns",
    type: "Resource",
    description: "Subterranean networks of pure energy. Essential for upgrading NFT attributes.",
    color: "#3b82f6",
    players: 12403,
    difficulty: 3,
    unlocked: true,
  }
];
