import YarnCard from "../components/YarnCard";
import { sampleYarns } from "../data/sampleYarns";
import { useState } from "react";

function YarnStashPage() {
  const [yarns, setYarns] = useState(sampleYarns);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {yarns.map((yarn) => (
          <YarnCard
            key={yarn.id}
            yarn={yarn}
          />
        ))}
      </div>
    </div>
  )
}

export default YarnStashPage;
