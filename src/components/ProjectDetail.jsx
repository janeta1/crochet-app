import { calculateProgress } from "../utils/projectUtils";

function ProjectDetail({ project }) {
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
            {project.parts.map(part => (
              <div key={part.id} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-text-primary text-sm">{part.name}</span>
                  <span className="text-text-secondary text-sm">{part.completedRows}/{part.totalRows} rows</span>
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
    </div>
  );
}
export default ProjectDetail;
