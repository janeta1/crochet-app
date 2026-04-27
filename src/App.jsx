import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProjectsPage from "./pages/ProjectsPage";
import YarnStashPage from "./pages/YarnStashPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useProjects } from "./hooks/useProjects";
import { useYarns } from "./hooks/useYarns";
import { sampleYarns } from "./data/sampleYarns";
import { sampleProjects } from "./data/sampleProjects";
import { useDispatch, useSelector } from "react-redux";
import { loadProjects } from "./store/projectsSlice";
import { loadYarns } from "./store/yarnSlice";

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.items);
  const projectsLoading = useSelector((state) => state.projects.loading);
  const yarns = useSelector((state) => state.yarns.items);
  const yarnsLoading = useSelector((state) => state.yarns.loading);

  useEffect(() => {
    dispatch(loadProjects());
    dispatch(loadYarns());
  }, [dispatch]);
  
  // Load theme from localStorage on start
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function toggleTheme() {
    setIsDark(!isDark);
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}
        >
          <Route index element={<Navigate to="/projects" replace />} />
          <Route
            path="projects"
            element={
              <ProjectsPage
                projects={projects}
                loading={projectsLoading}
                yarns={yarns}
              />
            }
          />
          <Route
            path="yarn-stash"
            element={
              <YarnStashPage
              />
            }
          />
          <Route
            path="favorites"
            element={
              <FavoritesPage
                projects={projects}
                loading={projectsLoading}
                yarns={yarns}
              />
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
