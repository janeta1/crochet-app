import { Heart } from "lucide-react";
import { calculateProgress } from "../utils/projectUtils";

function ProjectCard({ project, isSelected, onClick, onFavoriteToggle }) {
  const progress = calculateProgress(project);

  return (
    <div
      onClick={onClick}
      className={`bg-bg-card rounded-xl overflow-hidden cursor-pointer border ${isSelected ? "border-accent border-2" : "border-border"}`}
    >
      {/* photo or color block */}
      <div className="h-36 w-full">
        {project.photo ? (
          <img
            src={project.photo}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            style={{ backgroundColor: project.color }}
            className="h-full w-full"
          />
        )}
      </div>

      {/* card content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="font-medium text-text-primary">{project.name}</p>
          <button className="text-accent hover hover:text-accent-hover" onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            onFavoriteToggle();
          }}>
            <Heart size={20} fill={project.isFavorite ? 'currentColor' : 'none'}/>
          </button>
        </div>

        <p className="text-sm text-text-secondary mb-3">
          {project.yarnWeight} • Hook {project.hookSize}
        </p>

        {/* progress bar */}
        <div className="flex justify-between items-center">
          <div
            className="h-1 bg-progress-bar rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* status and progress */}
        <div className="flex justify-between items-center">
          <span
            className={`text-xs px-3 py-1 mt-2 rounded-full font-medium ${
              project.status === "in-progress"
                ? "bg-status-inprogress-bg text-status-inprogress-text"
                : project.status === "done"
                  ? "bg-status-done-bg text-status-done-text"
                  : "bg-status-queued-bg text-status-queued-text"
            }`}
          >
            {project.status}
          </span>
          <span className="text-sm text-text-secondary">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
