import ProjectCard from "../components/ProjectCard";

function FavoritesPage({ projects, yarns }) {
  const favoriteProjects = projects.filter((p) => p.isFavorite);
  return (
    <div>
        <h2 className="text-3xl">Favorite Projects</h2>
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            yarns={yarns}
            onClick={() => handleProjectClick(project)}
            onFavoriteToggle={() => toggleFavorite(project.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
