import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { Heart } from "lucide-react";
import ProjectModal from "../components/ProjectModal";
import ProjectDetailModal from "../components/ProjectDetailModal";
import SessionModal from "../components/SessionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectAsync,
  deleteProjectAsync,
  editProjectAsync,
  toggleFavoriteAsync,
  changeStatusAsync,
  addSessionAsync,
} from "../store/projectsSlice";

function ProjectsPage({ projects, loading, yarns }) {
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
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

  function handleAddProject(formData) {
    const newProject = {
      id: crypto.randomUUID(),
      name: formData.name,
      hookSize: formData.hookSize,
      color: formData.color,
      photo: formData.photo,
      yarns: formData.yarns,
      parts: formData.parts,
      status: "queued",
      isFavorite: false,
      sessions: [],
      timeSpent: 0,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    console.log("saving project:", newProject)
    dispatch(addProjectAsync(newProject));
    setShowProjectModal(false);
  }

  // Derived list
  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.status === activeFilter,
  );

  useEffect(() => {
    if (
      selectedProject &&
      !filteredProjects.find((p) => p.id === selectedProject.id)
    ) {
      setSelectedProject(null);
    }
  }, [activeFilter, projects]);

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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            yarns={yarns}
            isSelected={selectedProject?.id === project.id}
            onClick={() => handleProjectClick(project)}
            onFavoriteToggle={() => dispatch(toggleFavoriteAsync({ id: project.id, projects }))}
          />
        ))}
      </div>

      {!loading && filteredProjects.length === 0 && (
        <div className="flex flex-col gap-2 items-center justify-center py-15 text-text-secondary">
          <img
            src="/crochet-app/sad_yarn.png"
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
          onAdd={(formData) => {
            handleAddProject(formData);
            setShowProjectModal(false);
          }}
          yarns={yarns}
        />
      )}

      {showEditProjectModal && (
        <ProjectModal
          project={currentProject}
          onClose={() => setShowEditProjectModal(false)}
          onAdd={(formData) => {
            dispatch(editProjectAsync({ id: currentProject.id, data: { ...currentProject, ...formData } }));
            setShowEditProjectModal(false);
          }}
          yarns={yarns}
        />
      )}

      {showSessionModal && (
        <SessionModal
          project={currentProject}
          onClose={() => setShowSessionModal(false)}
          onAdd={(formData) => {
            dispatch(addSessionAsync({ projectId: currentProject.id, data: formData, projects }));
            setShowSessionModal(false);
          }}
        />
      )}

      {/* for project details */}
      {currentProject && (
        <ProjectDetailModal
          project={currentProject}
          onClose={() => setSelectedProject(null)}
          onAddSession={() => setShowSessionModal(true)}
          onDelete={() => {
            dispatch(deleteProjectAsync(currentProject.id));
            setSelectedProject(null);
          }}
          onEdit={() => setShowEditProjectModal(true)}
          yarns={yarns}
          onStatusChange={(status) =>
            dispatch(changeStatusAsync({ id: currentProject.id, status, projects }))
          }
        />
      )}
    </div>
  );
}

export default ProjectsPage;
