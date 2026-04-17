import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { sampleProjects } from "../data/sampleProjects";
import { Heart } from "lucide-react";

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState(sampleProjects);
  // const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const handleProjectClick = (project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null); // Deselect if the same project is clicked
    } else {
      setSelectedProject(project);
    }
  };

  // Derived list
  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.status === activeFilter,
  );
  // .filter((p) => !showFavoritesOnly || p.isFavorite);

  function toggleFavorite(projectId) {
    setProjects(
      projects.map((p) =>
        p.id === projectId ? { ...p, isFavorite: !p.isFavorite } : p,
      ),
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl">My Projects</h2>
        <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover">
          + New Project
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {["all", "in-progress", "done", "queued"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${activeFilter === filter ? "bg-accent text-white" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}
            >
              {filter === "all" ? "All Projects" : filter.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${showFavoritesOnly ? "bg-accent text-white" : "bg-bg-secondary text-text-secondary hover:bg-border"}`}
        >
          <Heart size={16} fill={showFavoritesOnly ? "currentColor" : "none"} />
          Favorites
        </button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isSelected={selectedProject?.id === project.id}
            onClick={() => handleProjectClick(project)}
            onFavoriteToggle={() => toggleFavorite(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
