import YarnCard from "../components/YarnCard";
import { sampleYarns } from "../data/sampleYarns";
import { useState } from "react";

function YarnStashPage() {
  const [yarns, setYarns] = useState(sampleYarns);
  const weights = ['all', ...new Set(yarns.map(y => y.weight))];
  const [activeWeight, setActiveWeight] = useState('all');

  const filteredYarns = yarns.filter(y => activeWeight === 'all' || y.weight === activeWeight);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl">Yarn Stash</h2>
        <button
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover"
        >
          + New Yarn
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {weights.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveWeight(filter)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${activeWeight === filter ? "bg-accent text-white" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}
            >
              {filter === "all" ? "All Weights" : filter.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredYarns.map((yarn) => (
          <YarnCard
            key={yarn.id}
            yarn={yarn}
          />
        ))}
      </div>

      {filteredYarns.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center py-15 text-text-secondary">
          <img
            src="src\assets\sad_yarn.png"
            alt="No yarns"
            className="w-30 h-30 mb-3"
          />
          <p className="text-xl mb-2">No yarns here...</p>
          <p className="text-base">
            Your stash is empty. Click "+ New Yarn" to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default YarnStashPage;
