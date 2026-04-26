import { Trash2, Pencil, Heart } from "lucide-react";

function YarnCard({ yarn, onDelete, onEdit, onFavoriteToggle }) {
  return (
    <div className="bg-bg-card rounded-lg overflow-hidden cursor-pointer border border-border hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="h-36 w-full" style={{ backgroundColor: yarn.color }} />
        <div className="flex gap-2">
          <button onClick={onEdit} className="absolute top-2 right-10 bg-mist-600/80 rounded-full p-1 ">
            <Pencil size={16} className="text-white" />
          </button>
          <button
            onClick={onDelete}
            className="absolute top-2 right-2 bg-red-600/80 rounded-full p-1"
          >
            <Trash2 size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* yarn info */}
      <div className="p-4">
        <div className="flex justify-between mb-1 items-start">
          <p className="font-medium text-text-primary">{yarn.name}</p>
          <button
            className="text-accent hover:text-accent-hover"
            onClick={onFavoriteToggle}
          >
            <Heart size={20} fill={yarn.isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-text-secondary">Brand:</p>
          <p className="text-sm text-text-primary">{yarn.brand}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-text-secondary">Weight:</p>
          <p className="text-sm text-text-primary">{yarn.weight}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-text-secondary">Quantity:</p>
          <p className="text-sm text-text-primary">{yarn.quantity}g</p>
        </div>
      </div>
    </div>
  );
}
export default YarnCard;
