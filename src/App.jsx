import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProjectsPage from "./pages/ProjectsPage";
import YarnStashPage from "./pages/YarnStashPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useProjects } from "./hooks/useProjects";
import { sampleYarns } from "./data/sampleYarns";
import { sampleProjects } from "./data/sampleProjects";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [yarns, setYarns] = useState(sampleYarns);
  const { projects, handleAddProject, handleAddSession, handleDeleteProject, handleEditProject, toggleFavorite } = useProjects();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  }, [isDark]);

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}
        >
          <Route index element={<Navigate to="/projects" replace />} />
          <Route path="projects" element={<ProjectsPage projects={projects} handleAddProject={handleAddProject} handleAddSession={handleAddSession} handleDeleteProject={handleDeleteProject} handleEditProject={handleEditProject} toggleFavorite={toggleFavorite} yarns={yarns} />} />
          <Route path="yarn-stash" element={<YarnStashPage yarns={yarns} setYarns={setYarns} />} />
          <Route path="favorites" element={<FavoritesPage projects={projects} handleAddProject={handleAddProject} handleAddSession={handleAddSession} handleDeleteProject={handleDeleteProject} handleEditProject={handleEditProject} toggleFavorite={toggleFavorite} yarns={yarns} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
