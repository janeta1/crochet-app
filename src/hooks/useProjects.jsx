import { useState, useEffect } from "react";
import { sampleProjects } from "../data/sampleProjects";
import { getAllProjects, saveProject, deleteProject } from "../db/database";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const stored = await getAllProjects();
      setProjects(stored);
      setLoading(false);
    }
    loadProjects();
  }, []);

  async function toggleFavorite(projectId) {
    const project = projects.find(p => p.id === projectId);
    const updated = { ...project, isFavorite: !project.isFavorite };
    await saveProject(updated);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...project, isFavorite: !project.isFavorite } : p,
      ),
    );
  }

  async function handleAddProject(formData) {
    const newProject = {
      id: Date.now().toString(),
      name: formData.name,
      hookSize: formData.hookSize,
      yarnWeight: formData.yarnWeight,
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
    await saveProject(newProject);
    setProjects((prev) => [...prev, newProject]);
  }

    async function handleAddSession(projectId, sessionData) {
    setProjects((prev) => {
      const updated = prev.map((p) => {
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

        const updatedProject = {
          ...p,
          sessions: [...p.sessions, newSession],
          parts: updatedParts,
          timeSpent: p.timeSpent + (parseInt(sessionData.duration) || 0),
        };

        saveProject(updatedProject); 
        return updatedProject;
      });
      return updated;
    });
  }

  async function handleDeleteProject(projectId) {
    await deleteProject(projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }

  async function handleEditProject(projectId, formData) {
    const project = projects.find(p => p.id === projectId);
    const updated = { ...project, ...formData };
    await saveProject(updated);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? updated : p)),
    );
  }

  return {
    projects,
    loading,
    handleAddProject,
    handleAddSession,
    handleDeleteProject,
    handleEditProject,
    toggleFavorite,
  };
}
