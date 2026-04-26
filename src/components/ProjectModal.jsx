import { Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

function ProjectModal({ onClose, onAdd, project, yarns }) {
  const [formData, setFormData] = useState({
    name: project?.name || "",
    hookSize: project?.hookSize || "",
    color: project?.color || "#C4A0A0",
    photo: project?.photo || null,
    yarns: project?.yarns || [],
    parts: project?.parts || [],
  });

  function handleInputChange(field, value) {
    setFormData({ ...formData, [field]: value });
  }

  function addPart() {
    setFormData({
      ...formData,
      parts: [
        ...formData.parts,
        { id: Date.now().toString(), name: "", totalRows: 0, completedRows: 0, quantity: 1 },
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
          <h3 className="text-xl">
            {project ? "Edit Project" : "New Project"}
          </h3>
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
              Yarn(s)
            </label>

            {yarns && yarns.length > 0 ? (
              yarns.map((yarn) => (
                <label
                  key={yarn.id}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.yarns.includes(yarn.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange("yarns", [
                          ...formData.yarns,
                          yarn.id,
                        ]);
                      } else {
                        handleInputChange(
                          "yarns",
                          formData.yarns.filter((id) => id !== yarn.id),
                        );
                      }
                    }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: yarn.color }}
                  />
                  <span className="text-sm text-text-primary">{yarn.name}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-text-secondary italic">
                No yarns in stash. Add yarns in the Yarn Stash page to select
                them here.
              </p>
            )}
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
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border hover:border-accent cursor-pointer text-sm text-text-secondary w-full justify-center">
              <Plus size={16} />
              {formData.photo ? "Change photo" : "Upload photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () =>
                    handleInputChange("photo", reader.result);
                  reader.readAsDataURL(file);
                }}
              />
            </label>
            {formData.photo && (
              <div className="relative">
                <img
                  src={formData.photo}
                  alt="Project"
                  className="mt-2 h-32 w-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleInputChange("photo", null)}
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
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
                  placeholder="Qty"
                  min="1"
                  value={part.quantity || 1}
                  onChange={(e) =>
                    updatePart(
                      part.id,
                      "quantity",
                      parseInt(e.target.value) || 1,
                    )
                  }
                  className="w-30 px-3 py-2 rounded-lg border border-border bg-bg-primary text-text-primary text-sm focus:outline-none focus:border-accent"
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
            <button
              className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover text-sm cursor-pointer"
              onClick={() => onAdd(formData)}
            >
              {project ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
