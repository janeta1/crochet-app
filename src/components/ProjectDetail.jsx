import { useState } from "react";
import { calculateProgress } from "../utils/projectUtils";
import { Trash2, Pencil, X } from "lucide-react";

function ProjectDetail({
  project,
  onAddSession,
  onDelete,
  onEdit,
  onStatusChange,
  yarns,
}) {
  const progress = calculateProgress(project);
  const [showPhoto, setShowPhoto] = useState(false);
  console.log(progress);
  const linkedYarns = (yarns || []).filter((y) =>
    project.yarns?.includes(y.id),
  );

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
      {/* left side - details */}
      <div className="bg-bg-card rounded-xl p-6 border border-border overflow-y-auto max-h-[75vh]">
        {/* the img */}
        {project?.photo && (
          <img
            src={project.photo}
            alt={project.name}
            className="w-full h-48 object-cover mb-7 cursor-pointer rounded-xl"
            onClick={() => setShowPhoto(true)}
          />
        )}
        {/* the lightbox */}
        {showPhoto && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setShowPhoto(false)}
          >
            <X size={20} className="text-white absolute top-4 right-4 cursor-pointer" />
            <img
              src={project.photo}
              alt={project.name}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg">{project.name}</h3>
          <div className="flex items-center gap-2">
            <select
              value={project.status}
              onChange={(e) => onStatusChange?.(e.target.value)}
              className={`text-sm px-3 py-1 rounded-full border border-none cursor-pointer focus:outline-none font-medium ${project.status === "in-progress" ? "bg-status-inprogress-bg text-status-inprogress-text" : project.status === "done" ? "bg-status-done-bg text-status-done-text" : "bg-status-queued-bg text-status-queued-text"}`}
            >
              <option value="queued">Queued</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button
              className="text-sm text-text-secondary hover:text-text-primary cursor-pointer"
              onClick={onEdit}
            >
              <Pencil size={20} />
            </button>
            <button
              className="text-sm text-red-400 hover:text-red-600 cursor-pointer"
              onClick={onDelete}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-between border-b border-border py-2">
          {" "}
          <span className="text-text-secondary">Hook Size</span>
          <span className="text-text-primary font-medium">
            {project.hookSize}
          </span>
        </div>

        <div className="flex justify-between border-b border-border py-2">
          {" "}
          <span className="text-text-secondary">Time Spent</span>
          <span className="text-text-primary font-medium">
            {Math.floor(project.timeSpent / 60)} hours {project.timeSpent % 60}{" "}
            mins
          </span>
        </div>

        <div className="flex justify-between border-b border-border py-2">
          {" "}
          <span className="text-text-secondary">Yarn Used</span>
          <div className="flex flex-col items-end gap-1">
            {linkedYarns.length > 0 ? (
              linkedYarns.map((yarn) => (
                <div key={yarn.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: yarn.color }}
                  />
                  <span className="text-text-primary font-medium">
                    {yarn.name}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-text-primary font-medium">—</span>
            )}
          </div>
        </div>

        <div className="overflow-y-auto max-h-38">
          {(project.parts || []).length > 0 && (
            <div className="border-b border-border py-2">
              <p className="text-text-secondary mb-3">Parts</p>
              {(project.parts || []).map((part) => (
                <div key={part.id} className="mb-3">
                  <div className="pl-3 flex justify-between mb-1">
                    <span className="text-text-secondary text-sm">
                      {part.name} (x{part.quantity || 1})
                    </span>
                    <span className="text-text-primary text-sm">
                      {part.quantity > 1
                        ? `${part.completedRows}/${part.quantity} pieces`
                        : `${part.completedRows}/${part.totalRows} rows`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between py-2">
          {" "}
          <span className="text-text-secondary">Progress</span>
          <span className="text-text-primary font-medium">{progress}%</span>
        </div>

        {project.status === "done" && project.completedAt && (
          <div className="flex justify-between py-2">
            <span className="text-text-secondary">Completed</span>
            <span className="text-text-primary font-medium">
              {new Date(project.completedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>

      {/* right side - session logs */}
      <div className="bg-bg-card rounded-xl p-6 border border-border overflow-y-auto max-h-[75vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg">Session Log</h3>
          <button
            className="text-sm text-accent hover:text-accent-hover cursor-pointer"
            onClick={onAddSession}
          >
            + Add Session
          </button>
        </div>

        {(project.sessions || []).length === 0 ? (
          <p className="pt-10 flex items-center justify-center text-text-secondary text-sm italic">
            No sessions yet
          </p>
        ) : (
          <div>
            {[...(project.sessions || [])].reverse().map((session) => (
              <div key={session.id} className="flex gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">
                    {new Date(session.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-text-primary text-sm">{session.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default ProjectDetail;
