import { X } from "lucide-react";
import ProjectDetail from "./ProjectDetail";

function ProjectDetailModal({
  project,
  onClose,
  onAddSession,
  onDelete,
  onEdit,
  onStatusChange,
  yarns,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary rounnded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 pb-6">
          <ProjectDetail
            project={project}
            onAddSession={onAddSession}
            onDelete={() => {
              onDelete();
              onClose();
            }}
            onEdit={onEdit}
            onStatusChange={onStatusChange}
            yarns={yarns}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailModal;
