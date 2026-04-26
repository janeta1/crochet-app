import ProjectCard from "../components/ProjectCard";
import { useState } from "react";
import ProjectDetail from "../components/ProjectDetail";
import SessionModal from "../components/SessionModal";
import ProjectModal from "../components/ProjectModal";
import { HeartOff } from 'lucide-react';

function FavoritesPage({
  projects,
  handleAddSession,
  handleDeleteProject,
  handleEditProject,
  toggleFavorite,
  yarns,
}) {
  const favoriteProjects = projects.filter((p) => p.isFavorite);
  const [selectedProject, setSelectedProject] = useState(null);
  const currentProject = projects.find((p) => p.id === selectedProject?.id);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  function handleProjectClick(project) {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  }

  return (
    <div>
      <h2 className="text-3xl">Favorite Projects</h2>
      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            yarns={yarns}
            isSelected={selectedProject?.id === project.id}
            onClick={() => handleProjectClick(project)}
            onFavoriteToggle={() => toggleFavorite(project.id)}
          />
        ))}
      </div>

      {favoriteProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-15 text-text-secondary">
          <HeartOff size={35} />
          <span className="text-xl mb-1 mt-4">No favorites yet...</span>
          <p className="text-sm">Heart a project to see it here</p>
        </div>
      )}

      {currentProject && (
        <ProjectDetail
          project={currentProject}
          onAddSession={() => {
            setShowSessionModal(true);
          }}
          onDelete={() => {
            handleDeleteProject(currentProject.id);
            setSelectedProject(null);
          }}
          onEdit={() => setShowEditProjectModal(true)}
          yarns={yarns}
        />
      )}

      {showEditProjectModal && (
        <ProjectModal 
          project={currentProject}
          onClose={() => setShowEditProjectModal(false)}
          onAdd={(formData) => {handleEditProject(currentProject.id, formData); setShowEditProjectModal(false);}}
          yarns={yarns}
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
    </div>
  );
}

export default FavoritesPage;
