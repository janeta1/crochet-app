import { Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

function YarnModal({ onClose, onAdd, yarn }) {
  const [formData, setFormData] = useState({
    name: yarn?.name || "",
    brand: yarn?.brand || "",
    color: yarn?.color || "#C4A0A0",
    weight: yarn?.weight || "",
    quantity: yarn?.quantity || "",
  });

  function handleInputChange(field, value) {
    setFormData({ ...formData, [field]: value });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-card rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl">{yarn ? "Edit Yarn" : "New Yarn"}</h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g. Cascade 220"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Brand
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
              placeholder="e.g. Cascade"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Weight
            </label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              placeholder="e.g. Worsted"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Quantity
            </label>
            <input
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              placeholder="e.g. 100"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer"
            />
          </div>

          {/* submit */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-red-500 cursor-pointer"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover text-sm cursor-pointer"
              onClick={() => onAdd(formData)}
            >
              {yarn ? "Save Changes" : "Add Yarn"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default YarnModal;
