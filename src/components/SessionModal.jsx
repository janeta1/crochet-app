import { useState } from "react";
import { X } from "lucide-react";

function SessionModal({ onAdd, onClose, project }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    duration: 0,
    note: "",
    partUpdates: {},
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-card rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl">Add Session</h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {project.parts.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-base text-text-secondary mb-1 block">
                  Parts Updates
                </label>
                <p className="text-xs text-text-secondary">
                  *negative rows = frogged
                </p>
              </div>
              {project.parts.map((part) => (
                <div
                  key={part.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span key={part.id} className="text-sm text-text-secondary">
                    {part.name}
                  </span>
                  <input
                    type="number"
                    min={-part.completedRows}
                    max={part.totalRows - part.completedRows}
                    value={formData.partUpdates[part.id] || 0}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        partUpdates: {
                          ...formData.partUpdates,
                          [part.id]: parseInt(e.target.value) || 0,
                        },
                      });
                    }}
                    className="w-20 px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
                  ></input>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="text-base text-text-secondary mb-1 block">
              Notes
            </label>
            <textarea
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="What did you work on? Any progress or challenges?"
              className="w-full px-3 py-2 rounded-lg border border-border bg-bg-primary text-sm focus:outline-none focus:border-accent"
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
              Log Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SessionModal;
