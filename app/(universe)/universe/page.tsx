import { DIMENSIONS } from "@/lib/constants/dimensions";
import { DimensionCard } from "@/components/universe/DimensionCard";
import { ParticleField } from "@/components/quantum/ParticleField";

export default function UniversePage() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-6">
      <ParticleField />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            The 8 Dimensions
          </h1>
          <p className="text-[#6b7db3] max-w-2xl text-lg">
            Every dimension offers unique resources and challenges. Your NFT Identity 
            level determines which realms you can safely navigate.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIMENSIONS.map((dim) => (
            <DimensionCard key={dim.id} dimension={dim} />
          ))}
        </div>
      </div>
    </main>
  );
}
