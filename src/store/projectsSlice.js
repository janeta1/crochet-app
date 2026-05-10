import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProjects,
  saveProject,
  deleteProject as deleteProjectDB,
} from "../db/database";
import { api } from "../api/api";

export const loadProjects = createAsyncThunk(
  "projects/loadProjects",
  async () => {
    const data = await api.getProjects();
    return data.data;
  },
);

export const addProjectAsync = createAsyncThunk(
  "projects/addProject",
  async (projectData) => {
    const newProject = await api.createProject(projectData);
    return newProject;
  },
);

export const editProjectAsync = createAsyncThunk(
  "projects/editProject",
  async ({ id, data }) => {
    const updated = await api.updateProject(id, data);
    return { id, data: updated };
  },
);

export const toggleFavoriteAsync = createAsyncThunk(
  "projects/toggleFavorite",
  async ({ id, projects }) => {
    const project = projects.find((p) => p.id === id);
    const updated = await api.patchProject(id, { favorite: !project.favorite });
    return updated;
  },
);

export const changeStatusAsync = createAsyncThunk(
  "projects/changeStatus",
  async ({ id, status }) => {
    const updated = await api.patchProject(id, {
      status,
      completedAt: status === "done" ? new Date().toISOString() : null,
    });
    return updated;
  },
);

export const deleteProjectAsync = createAsyncThunk(
  "projects/deleteProject",
  async (projectId) => {
    await api.deleteProject(projectId);
    return projectId;
  },
);

export const addSessionAsync = createAsyncThunk(
  "projects/addSession",
  async ({ projectId, data }) => {
    await api.logSession({
      projectId,
      date: data.date,
      duration: data.duration,
      note: data.note,
      partUpdates: data.partUpdates,
    });

    const updatedProject = await api.getProject(projectId);
    return updatedProject;
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: [],
    loading: false,
    error: null,
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
      .addCase(loadProjects.rejected, (state) => {
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
          state.items[index] = data;
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
