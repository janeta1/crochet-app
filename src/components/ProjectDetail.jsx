import { calculateProgress } from "../utils/projectUtils";

function ProjectDetail({ project, onAddSession }) {
  const progress = calculateProgress(project);
  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {/* left side - details */}
      <div className="bg-bg-card rounded-xl p-6 border border-border">
        <h3 className="text-lg mb-6">{project.name}</h3>

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
            {Math.floor(project.timeSpent / 60)} hours
          </span>
        </div>

        <div className="flex justify-between border-b border-border py-2">
          {" "}
          <span className="text-text-secondary">Yarn Used</span>
          <span className="text-text-primary font-medium">
            {project.yarnWeight}
          </span>
        </div>

        {project.parts.length > 0 && (
          <div className="border-b border-border py-2">
            <p className="text-text-secondary mb-3">Parts</p>
            {project.parts.map((part) => (
              <div key={part.id} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-text-primary text-sm">{part.name}</span>
                  <span className="text-text-secondary text-sm">
                    {part.completedRows}/{part.totalRows} rows
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between py-2">
          {" "}
          <span className="text-text-secondary">Progress</span>
          <span className="text-text-primary font-medium">{progress}%</span>
        </div>
      </div>

      {/* right side - session logs */}
      <div className="bg-bg-card rounded-xl p-6 border border-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg">Session Log</h3>
          <button
            className="text-sm text-accent hover:text-accent-hover cursor-pointer"
            onClick={onAddSession}
          >
            + Add Session
          </button>
        </div>

        {project.sessions.length === 0 ? (
          <p className="pt-10 flex items-center justify-center text-text-secondary text-sm italic">
            No sessions yet
          </p>
        ) : (
          project.sessions.map((session) => (
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
          ))
        )}
      </div>
    </div>
  );
}
export default ProjectDetail;
