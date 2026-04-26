import { useState } from "react";
import { sampleProjects } from "../data/sampleProjects";

export function useProjects() {
  const [projects, setProjects] = useState(sampleProjects);

  function toggleFavorite(projectId) {
    setProjects((prev) =>
      prev.map((p) =>
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
      yarns: formData.yarns,
      parts: formData.parts,
      status: "queued",
      isFavorite: false,
      sessions: [],
      timeSpent: 0,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setProjects((prev) => [...prev, newProject]);
  }

  function handleAddSession(projectId, sessionData) {
    setProjects((prev) =>
      prev.map((p) => {
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
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }

  function handleEditProject(projectId, formData) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...formData } : p)),
    );
  }

  return {
    projects,
    handleAddProject,
    handleAddSession,
    handleDeleteProject,
    handleEditProject,
    toggleFavorite,
  };
}
