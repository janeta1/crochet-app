import { Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

function ProjectModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    hookSize: "",
    yarnWeight: "",
    color: "#C4A0A0",
    photo: null,
    yarns: [],
    parts: [],
  });

  function handleInputChange(field, value) {
    setFormData({ ...formData, [field]: value });
  }

  function addPart() {
    setFormData({
      ...formData,
      parts: [
        ...formData.parts,
        { id: Date.now().toString(), name: "", totalRows: 0, completedRows: 0 },
      ],
    });
  }

  function removePart(partId) {
    setFormData({
      ...formData,
      parts: formData.parts.filter((p) => p.id !== partId),
    });
  }

  function updatePart(partId, field, value) {
    setFormData({
      ...formData,
      parts: formData.parts.map((p) =>
        p.id === partId ? { ...p, [field]: value } : p,
      ),
    });
  }

  return (
    // should cover the entire screen
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-card rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl">New Project</h3>
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
              Project name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g. Granny Square Blanket"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Hook size
            </label>
            <input
              type="text"
              value={formData.hookSize}
              onChange={(e) => handleInputChange("hookSize", e.target.value)}
              placeholder="e.g. 5mm"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Yarn weight
            </label>
            <select
              value={formData.yarnWeight}
              onChange={(e) => handleInputChange("yarnWeight", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            >
              <option value="">Select weight</option>
              <option value="Thread">Thread</option>
              <option value="Lace">Lace</option>
              <option value="Sport">Sport</option>
              <option value="DK">DK</option>
              <option value="Worsted">Worsted</option>
              <option value="Bulky">Bulky</option>
            </select>
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Project color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleInputChange("color", e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Project photo (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => handleInputChange("photo", reader.result);
                reader.readAsDataURL(file);
              }}
              className="w-full text-sm text-text-secondary"
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Project"
                className="mt-2 h-32 w-full object-cover rounded-lg"
              />
            )}
          </div>

          {/* Parts section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-base text-text-secondary">
                Project parts
              </label>
              <button
                onClick={addPart}
                className="flex items-center gap-1 text-sm text-accent hover:text-accent-hover"
              >
                <Plus size={14} /> Add Part
              </button>
            </div>

            {formData.parts.length === 0 && (
              <p className="text-sm text-text-secondary italic">
                No parts added yet.
              </p>
            )}

            {formData.parts.map((part) => (
              <div key={part.id} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={part.name}
                  onChange={(e) => updatePart(part.id, "name", e.target.value)}
                  placeholder="Part name"
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary text-sm focus:outline-none focus:border-accent"
                />
                <input
                  type="number"
                  value={part.totalRows}
                  onChange={(e) =>
                    updatePart(part.id, "totalRows", e.target.value)
                  }
                  placeholder="Total rows"
                  className="w-30 px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary text-sm focus:outline-none focus:border-accent"
                />
                <button
                  onClick={() => removePart(part.id)}
                  className="text-sm text-text-secondary hover:text-red-500 cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* submit */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-red-500 cursor-pointer"
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover text-sm cursor-pointer" onClick = {() => onAdd(formData)}>
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
