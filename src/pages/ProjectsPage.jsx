import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { sampleProjects } from "../data/sampleProjects";
import { Heart } from "lucide-react";
import ProjectModal from "../components/ProjectModal";
import ProjectDetail from "../components/ProjectDetail";
import SessionModal from "../components/SessionModal";

function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState(sampleProjects);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const currentProject = projects.find((p) => p.id === selectedProject?.id);
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

  function handleAddProject(formData) {
    const newProject = {
      id: Date.now().toString(),
      name: formData.name,
      hookSize: formData.hookSize,
      yarnWeight: formData.yarnWeight,
      color: formData.color,
      photo: formData.photo,
      yarns: [],
      parts: formData.parts,
      status: "queued",
      isFavorite: false,
      sessions: [],
      timeSpent: 0,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setProjects([...projects, newProject]);
    setShowProjectModal(false);
  }

  function handleAddSession(projectId, sessionData) {
    setProjects(
      projects.map((p) => {
        if (p.id !== projectId) return p;

        const newSession = {
          id: Date.now().toString(),
          date: sessionData.date,
          duration: sessionData.duration,
          note: sessionData.note,
        };

        const updatedParts = p.parts.map((part) => ({
          ...part,
          completedRows:
            part.completedRows + (sessionData.partUpdates[part.id] || 0),
        }));

        return {
          ...p,
          sessions: [...p.sessions, newSession],
          parts: updatedParts,
          timeSpent: p.timeSpent + sessionData.duration,
        };
      }),
    );
  }

  function handleDeleteProject(projectId) {
    setProjects(projects.filter((p) => p.id !== projectId));
    setSelectedProject(null);
  }

  function handleEditProject(formData) {
    setProjects(
      projects.map((p) =>
        p.id === currentProject.id ? { ...p, ...formData } : p,
      ),
    );
    setShowEditProjectModal(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl">My Projects</h2>
        <button
          className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-hover"
          onClick={() => setShowProjectModal(true)}
        >
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

      {filteredProjects.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center py-15 text-text-secondary">
          <img
            src="src\assets\sad_yarn.png"
            alt="No projects"
            className="w-30 h-30 mb-3"
          />
          <p className="text-xl mb-2">No projects here...</p>
          <p className="text-base">
            Click "+ New Project" to get started. Ready when you are!
          </p>
        </div>
      )}

      {showProjectModal && (
        <ProjectModal
          onClose={() => setShowProjectModal(false)}
          onAdd={handleAddProject}
        />
      )}

      {showEditProjectModal && (
        <ProjectModal
          project={currentProject}
          onClose={() => setShowEditProjectModal(false)}
          onAdd={handleEditProject}
        />
      )}

      {showSessionModal && (
        <SessionModal
          project={currentProject}
          onClose={() => setShowSessionModal(false)}
          onAdd={(formData) => {
            handleAddSession(currentProject.id, formData);
            setShowSessionModal(false);
          }}
        />
      )}

      {/* for project details */}
      {currentProject && (
        <ProjectDetail
          project={currentProject}
          onAddSession={() => setShowSessionModal(true)}
          onDelete={() => handleDeleteProject(currentProject.id)}
          onEdit={() => setShowEditProjectModal(true)}
        />
      )}
    </div>
  );
}

export default ProjectsPage;
