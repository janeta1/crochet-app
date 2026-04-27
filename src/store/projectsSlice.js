import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProjects,
  saveProject,
  deleteProject as deleteProjectDB,
} from "../db/database";

export const loadProjects = createAsyncThunk(
  "projects/loadProjects",
  async () => {
    const projects = await getAllProjects();
    return projects;
  },
);

export const addProjectAsync = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    const newProject = await saveProject(projectData);
    return projectData;
  },
);

export const editProjectAsync = createAsyncThunk(
  "projects/editProject",
  async ({ id, data }) => {
    const updated = data;
    await saveProject(updated);
    return {id, data};
  },
);

export const toggleFavoriteAsync = createAsyncThunk(
  "projects/toggleFavorite",
  async ({ id, projects }) => {
    const project = projects.find((p) => p.id === id);
    const updated = { ...project, isFavorite: !project.isFavorite };
    await saveProject(updated);
    return updated;
  },
);

export const changeStatusAsync = createAsyncThunk(
  "projects/changeStatus",
  async ({ id, status, projects }) => {
    const project = projects.find((p) => p.id === id);
    const updated = {
      ...project,
      status,
      completedAt: status === "done" ? new Date().toISOString() : null,
    };
    await saveProject(updated);
    return updated;
  },
);

export const deleteProjectAsync = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    await deleteProjectDB(projectId);
    return projectId;
  },
);

export const addSessionAsync = createAsyncThunk(
  "projects/addSession",
  async ({ projectId, data, projects }) => {
    const project = projects.find((p) => p.id === projectId);

    const newSession = {
      id: crypto.randomUUID(),
      date: data.date,
      duration: data.duration,
      note: data.note,
    };

    const updatedParts = project.parts.map((part) => ({
      ...part,
      completedRows:
        part.completedRows + (data.partUpdates[part.id] || 0),
    }));

    const updatedProject = {
      ...project,
      sessions: [...project.sessions, newSession],
      parts: updatedParts,
      timeSpent: project.timeSpent + (parseInt(data.duration) || 0),
    };

    await saveProject(updatedProject);
    return updatedProject;
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(editProjectAsync.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.items.findIndex((p) => p.id === id);
        if (index !== -1)
          state.items[index] = { ...state.items[index], ...data };
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(changeStatusAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(addSessionAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default projectsSlice.reducer;
