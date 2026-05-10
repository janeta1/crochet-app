import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllYarns,
  saveYarn,
  deleteYarn as deleteYarnDB,
} from "../db/database";
import { api } from "../api/api";

export const loadYarns = createAsyncThunk("yarns/load", async () => {
  const data = await api.getYarns();
  return data.data;
});

export const addYarnAsync = createAsyncThunk("yarns/add", async (newYarn) => {
  const createdYarn = await api.createYarn(newYarn);
  return createdYarn;
});

export const deleteYarnAsync = createAsyncThunk(
  "yarns/delete",
  async (yarnId) => {
    await api.deleteYarn(yarnId);
    return yarnId;
  },
);

export const editYarnAsync = createAsyncThunk(
  "yarns/edit",
  async ({ id, data }) => {
    const updatedYarn = await api.updateYarn(id, data);
    return { id, data: updatedYarn };
  },
);

export const toggleYarnFavoriteAsync = createAsyncThunk(
  "yarns/toggleFavorite",
  async ({ id, yarns }) => {
    const yarn = yarns.find((y) => y.id === id);
    const updated = await api.patchYarn(id, { isFavorite: !yarn.isFavorite });
    return updated;
  },
);

const yarnsSlice = createSlice({
  name: "yarns",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadYarns.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadYarns.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadYarns.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addYarnAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteYarnAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((y) => y.id !== action.payload);
      })
      .addCase(editYarnAsync.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.items.findIndex((y) => y.id === id);
        if (index !== -1)
          state.items[index] = data;
      })
      .addCase(toggleYarnFavoriteAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((y) => y.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default yarnsSlice.reducer;
